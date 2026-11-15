const encoder = new TextEncoder()
const sessionDurationMs = 8 * 60 * 60 * 1000

const base64url = value => btoa(String.fromCharCode(...new Uint8Array(value))).replaceAll('+', '-').replaceAll('/', '_').replaceAll('=', '')
const fromBase64url = value => {
  const normalized = value.replaceAll('-', '+').replaceAll('_', '/') + '='.repeat((4 - value.length % 4) % 4)
  return Uint8Array.from(atob(normalized), character => character.charCodeAt(0))
}
const timingSafeEqual = (left, right) => {
  if (left.length !== right.length) return false
  let difference = 0
  for (let index = 0; index < left.length; index += 1) difference |= left[index] ^ right[index]
  return difference === 0
}
const hmac = async (secret, text) => {
  const key = await crypto.subtle.importKey('raw', encoder.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'])
  return new Uint8Array(await crypto.subtle.sign('HMAC', key, encoder.encode(text)))
}
const signSession = async (secret, payload) => {
  const body = base64url(encoder.encode(JSON.stringify(payload)))
  return `${body}.${base64url(await hmac(secret, body))}`
}
const verifySession = async (value, secret) => {
  if (!value || !secret) return false
  const [body, signature] = value.split('.')
  if (!body || !signature) return false
  const expected = await hmac(secret, body)
  let actual
  try { actual = fromBase64url(signature) } catch { return false }
  if (!timingSafeEqual(expected, actual)) return false
  try { return JSON.parse(new TextDecoder().decode(fromBase64url(body))).expiresAt > Date.now() } catch { return false }
}
const readCookie = (request, name) => request.headers.get('Cookie')?.split(';').map(item => item.trim()).find(item => item.startsWith(`${name}=`))?.slice(name.length + 1)
const securityHeaders = {
  'Content-Security-Policy': "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'self'; form-action 'self'; upgrade-insecure-requests",
  'Cross-Origin-Opener-Policy': 'same-origin',
  'Cross-Origin-Resource-Policy': 'same-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=(), usb=()',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'SAMEORIGIN',
  'X-Permitted-Cross-Domain-Policies': 'none',
}
const secureResponse = (response, additionalHeaders = {}) => {
  const headers = new Headers(response.headers)
  Object.entries(securityHeaders).forEach(([key, value]) => headers.set(key, value))
  Object.entries(additionalHeaders).forEach(([key, value]) => headers.set(key, value))
  return new Response(response.body, { status: response.status, statusText: response.statusText, headers })
}
const loginPage = message => `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Acesso administrativo</title><style>body{margin:0;min-height:100vh;display:grid;place-items:center;background:#07111f;color:#eef8fc;font:16px system-ui,sans-serif}.card{width:min(420px,calc(100% - 48px));padding:32px;border:1px solid #1f6475;border-radius:20px;background:#0c1c2b;box-sizing:border-box}small{color:#59d7ed;letter-spacing:.12em}h1{margin:12px 0}p{color:#b8c9d4;line-height:1.55}label{display:grid;gap:8px;margin:24px 0 14px}input,button{font:inherit;border-radius:9px;padding:12px}input{border:1px solid #4b6776;background:#07111f;color:#fff}button{width:100%;border:0;background:#27c9e5;color:#04131e;font-weight:700;cursor:pointer}a{display:inline-block;margin-top:20px;color:#8ce8f5}.error{color:#ffb4b4}</style></head><body><main class="card"><small>ÁREA PESSOAL</small><h1>Acessar painel</h1><p>Este acesso é protegido no servidor. Use uma senha exclusiva para o painel.</p>${message ? `<p class="error">${message}</p>` : ''}<form method="post" action="/api/admin/login"><label>Senha<input name="password" type="password" autocomplete="current-password" required autofocus></label><button type="submit">Entrar</button></form><a href="/">Voltar ao site público</a></main></body></html>`
const htmlResponse = (html, status = 200) => secureResponse(new Response(html, { status, headers: { 'Content-Type': 'text/html; charset=UTF-8', 'Cache-Control': 'no-store' } }))
const redirect = (url, headers = {}) => secureResponse(new Response(null, { status: 302, headers: { Location: url, 'Cache-Control': 'no-store', ...headers } }))

// Foto de perfil: fica no KV e é servida a todos os visitantes; só o painel (sessão válida) envia ou remove.
const PHOTO_KEY = 'profile-photo'
const MAX_PHOTO_BYTES = 1024 * 1024
const PHOTO_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp'])
const ascii = (bytes, start, end) => String.fromCharCode(...bytes.slice(start, end))
const looksLikeImage = (bytes, type) => {
  if (type === 'image/jpeg') return bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff
  if (type === 'image/png') return bytes[0] === 0x89 && ascii(bytes, 1, 4) === 'PNG'
  if (type === 'image/webp') return ascii(bytes, 0, 4) === 'RIFF' && ascii(bytes, 8, 12) === 'WEBP'
  return false
}
const jsonResponse = (body, status = 200) => secureResponse(new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json; charset=UTF-8', 'Cache-Control': 'no-store' } }))

export default {
  async fetch(request, env) {
    const url = new URL(request.url)
    if (url.protocol === 'http:') {
      url.protocol = 'https:'
      return Response.redirect(url, 301)
    }

    if (url.pathname === '/api/admin/login' && request.method === 'POST') {
      const origin = request.headers.get('Origin')
      if (origin && origin !== url.origin) return secureResponse(new Response('Origem não permitida.', { status: 403 }))
      if (!env.ADMIN_PASSWORD || !env.ADMIN_SESSION_SECRET) return htmlResponse(loginPage('O painel ainda não foi configurado no Cloudflare.'), 503)
      const form = await request.formData()
      const provided = String(form.get('password') || '')
      const expected = encoder.encode(env.ADMIN_PASSWORD)
      if (!timingSafeEqual(encoder.encode(provided), expected)) return htmlResponse(loginPage('Senha incorreta.'), 401)
      const token = await signSession(env.ADMIN_SESSION_SECRET, { expiresAt: Date.now() + sessionDurationMs, nonce: crypto.randomUUID() })
      return redirect('/admin.html', { 'Set-Cookie': `ap_admin_session=${token}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=${sessionDurationMs / 1000}` })
    }

    if (url.pathname === '/api/admin/logout' && request.method === 'POST') {
      const origin = request.headers.get('Origin')
      if (origin && origin !== url.origin) return secureResponse(new Response('Origem não permitida.', { status: 403 }))
      return secureResponse(new Response(null, { status: 204, headers: { 'Set-Cookie': 'ap_admin_session=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0', 'Cache-Control': 'no-store' } }))
    }

    if (url.pathname === '/api/profile-photo' && (request.method === 'GET' || request.method === 'HEAD')) {
      const stored = env.PROFILE_KV ? await env.PROFILE_KV.getWithMetadata(PHOTO_KEY, 'arrayBuffer') : null
      if (!stored?.value) return secureResponse(new Response(null, { status: 404, headers: { 'Cache-Control': 'no-store' } }))
      return secureResponse(new Response(request.method === 'HEAD' ? null : stored.value, { headers: { 'Content-Type': stored.metadata?.contentType || 'image/jpeg', 'Cache-Control': 'public, max-age=300' } }))
    }

    if (url.pathname === '/api/admin/profile-photo' && (request.method === 'PUT' || request.method === 'DELETE')) {
      if (request.headers.get('Origin') !== url.origin) return jsonResponse({ error: 'Origem não permitida.' }, 403)
      if (!(await verifySession(readCookie(request, 'ap_admin_session'), env.ADMIN_SESSION_SECRET))) return jsonResponse({ error: 'Sessão expirada. Entre novamente no painel.' }, 401)
      if (!env.PROFILE_KV) return jsonResponse({ error: 'O armazenamento de fotos ainda não foi configurado no Cloudflare.' }, 503)
      if (request.method === 'DELETE') {
        await env.PROFILE_KV.delete(PHOTO_KEY)
        return jsonResponse({ ok: true })
      }
      const type = (request.headers.get('Content-Type') || '').split(';')[0].trim().toLowerCase()
      if (!PHOTO_TYPES.has(type)) return jsonResponse({ error: 'Use uma imagem JPG, PNG ou WebP.' }, 415)
      if (Number(request.headers.get('Content-Length') || 0) > MAX_PHOTO_BYTES) return jsonResponse({ error: 'A foto passa de 1 MB.' }, 413)
      const bytes = new Uint8Array(await request.arrayBuffer())
      if (!bytes.length || bytes.length > MAX_PHOTO_BYTES) return jsonResponse({ error: 'A foto passa de 1 MB.' }, 413)
      if (!looksLikeImage(bytes, type)) return jsonResponse({ error: 'O arquivo não parece ser uma imagem válida.' }, 415)
      await env.PROFILE_KV.put(PHOTO_KEY, bytes, { metadata: { contentType: type, updatedAt: Date.now() } })
      return jsonResponse({ ok: true })
    }

    if (url.pathname === '/admin-login.html') return htmlResponse(loginPage())
    if (url.pathname === '/admin.html') {
      const authenticated = await verifySession(readCookie(request, 'ap_admin_session'), env.ADMIN_SESSION_SECRET)
      if (!authenticated) return redirect('/admin-login.html')
      // '/index.html' é redirecionado para '/' pelos arquivos estáticos, o que mandava o dono de volta ao site público.
      const indexUrl = new URL('/', url)
      const asset = await env.ASSETS.fetch(new Request(indexUrl, request))
      return secureResponse(asset, { 'Cache-Control': 'no-store' })
    }

    const asset = await env.ASSETS.fetch(request)
    if (asset.status === 404 && request.method === 'GET' && request.headers.get('Accept')?.includes('text/html')) {
      return secureResponse(new Response('Página não encontrada.', { status: 404, headers: { 'Content-Type': 'text/plain; charset=UTF-8' } }))
    }
    return secureResponse(asset)
  },
}
