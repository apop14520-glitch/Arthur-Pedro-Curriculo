import { en, enAttrs } from './i18n-en.js'

// Seletor PT/EN da versão pública. O texto original em português é guardado na própria página,
// então voltar ao português restaura exatamente o conteúdo de antes (inclusive o que o dono edita).

const STORAGE_KEY = 'cv-lang'
const SKIP = /^(SCRIPT|STYLE|SVG|NOSCRIPT|TEXTAREA|CODE)$/
const INLINE = /^(STRONG|EM|SPAN|B|I|A|BR|SMALL|SUP|SUB)$/
const ATTRS = ['aria-label', 'alt', 'title', 'placeholder']
const MONTHS = { jan: 'Jan', fev: 'Feb', mar: 'Mar', abr: 'Apr', mai: 'May', jun: 'Jun', jul: 'Jul', ago: 'Aug', set: 'Sep', out: 'Oct', nov: 'Nov', dez: 'Dec' }
const META_EN = {
  title: 'Arthur Pedro | Online Résumé',
  description: 'Portfolio of Arthur Pedro: IT leadership, infrastructure, cloud computing and governance.',
}

const textOriginals = new Map()
const original = {
  title: document.title,
  description: document.querySelector('meta[name="description"]')?.getAttribute('content') ?? '',
}
let current = 'pt'
let busy = false
let observer = null
let button = null

const normalize = value => value.trim().replace(/\s+/g, ' ')

function translate(key) {
  if (Object.prototype.hasOwnProperty.call(en, key)) return en[key]
  let match = key.match(/^Emitido em (\w{3}) (\d{4})$/)
  if (match && MONTHS[match[1]]) return `Issued ${MONTHS[match[1]]} ${match[2]}`
  match = key.match(/^Ver todos os (\d+) certificados$/)
  if (match) return `View all ${match[1]} certificates`
  return null
}

function hasOwnText(element) {
  return Array.from(element.childNodes).some(node => node.nodeType === 3 && node.textContent.trim())
}

function isMixedInline(element) {
  const children = Array.from(element.children)
  return children.length > 0 && children.every(child => INLINE.test(child.tagName)) && hasOwnText(element)
}

function applyEnglish(root) {
  busy = true
  try {
    // 1) Trechos com marcação inline (negrito, quebra de linha), traduzidos pelo HTML interno.
    root.querySelectorAll('*').forEach(element => {
      if (!element.isConnected || SKIP.test(element.tagName) || element.closest('svg')) return
      if (element.hasAttribute('data-i18n-pt') || element.parentElement?.closest('[data-i18n-pt]')) return
      if (!isMixedInline(element)) return
      const key = normalize(element.innerHTML)
      const out = translate(key)
      if (out !== null && out !== key) {
        element.setAttribute('data-i18n-pt', element.innerHTML)
        element.innerHTML = out
      }
    })

    // 2) Textos simples, nó a nó (cobre botões e links que também têm ícone).
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT)
    let node
    while ((node = walker.nextNode())) {
      const parent = node.parentElement
      if (!parent || SKIP.test(parent.tagName) || parent.closest('svg') || parent.closest('[data-i18n-pt]')) continue
      if (textOriginals.has(node)) continue
      const raw = node.nodeValue
      const key = normalize(raw)
      if (!key) continue
      // O dicionário guarda "&" como "&amp;" (HTML); em nó de texto o caractere é "&" puro.
      const found = translate(key) ?? translate(key.replace(/&/g, '&amp;'))
      const out = found === null ? null : found.replace(/&amp;/g, '&')
      if (out !== null && out !== key && !out.includes('<')) {
        textOriginals.set(node, raw)
        node.nodeValue = raw.replace(raw.trim(), () => out)
      }
    }

    // 3) Atributos de acessibilidade, dicas e campos de busca.
    root.querySelectorAll(ATTRS.map(attr => `[${attr}]`).join(',')).forEach(element => {
      ATTRS.forEach(attr => {
        const value = element.getAttribute(attr)
        if (!value || element.hasAttribute(`data-i18n-${attr}`)) return
        const out = enAttrs[value] ?? en[value]
        if (out && out !== value) {
          element.setAttribute(`data-i18n-${attr}`, value)
          element.setAttribute(attr, out)
        }
      })
    })
  } finally {
    busy = false
  }
}

function applyPortuguese() {
  busy = true
  try {
    document.querySelectorAll('[data-i18n-pt]').forEach(element => {
      element.innerHTML = element.getAttribute('data-i18n-pt')
      element.removeAttribute('data-i18n-pt')
    })
    textOriginals.forEach((raw, node) => {
      if (node.isConnected) node.nodeValue = raw
    })
    textOriginals.clear()
    ATTRS.forEach(attr => {
      document.querySelectorAll(`[data-i18n-${attr}]`).forEach(element => {
        element.setAttribute(attr, element.getAttribute(`data-i18n-${attr}`))
        element.removeAttribute(`data-i18n-${attr}`)
      })
    })
  } finally {
    busy = false
  }
}

function watchChanges() {
  if (observer) return
  let timer = 0
  observer = new MutationObserver(() => {
    if (busy || current !== 'en') return
    clearTimeout(timer)
    timer = setTimeout(() => applyEnglish(document.body), 60)
  })
  observer.observe(document.body, { childList: true, subtree: true, characterData: true })
}

function updatePageMeta(lang) {
  document.documentElement.lang = lang === 'en' ? 'en' : 'pt-BR'
  document.title = lang === 'en' ? META_EN.title : original.title
  document.querySelector('meta[name="description"]')?.setAttribute('content', lang === 'en' ? META_EN.description : original.description)
}

function setLanguage(lang, persist = true) {
  current = lang
  if (lang === 'en') {
    applyEnglish(document.body)
    watchChanges()
  } else {
    applyPortuguese()
  }
  updatePageMeta(lang)
  if (button) {
    button.textContent = lang === 'en' ? 'PT' : 'EN'
    button.setAttribute('aria-label', lang === 'en' ? 'Mudar para português' : 'Switch to English')
    button.setAttribute('lang', lang === 'en' ? 'pt-BR' : 'en')
  }
  if (persist) {
    try { localStorage.setItem(STORAGE_KEY, lang) } catch { /* navegação privada: segue sem lembrar */ }
  }
}

function createToggle() {
  const element = document.createElement('button')
  element.type = 'button'
  element.className = 'lang-toggle'
  element.addEventListener('click', () => setLanguage(current === 'en' ? 'pt' : 'en'))
  const themeToggle = document.querySelector('.theme-toggle')
  if (themeToggle) themeToggle.before(element)
  else document.querySelector('.site-header')?.append(element)
  return element
}

function initialLanguage() {
  const fromUrl = new URLSearchParams(window.location.search).get('lang')
  if (fromUrl === 'en' || fromUrl === 'pt') return fromUrl
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'en' || saved === 'pt') return saved
  } catch { /* sem armazenamento */ }
  // Quem abre o site com o navegador em outro idioma que não o português vê a versão em inglês.
  return (navigator.language || 'pt').toLowerCase().startsWith('pt') ? 'pt' : 'en'
}

export function initI18n() {
  button = createToggle()
  setLanguage(initialLanguage(), false)
}
