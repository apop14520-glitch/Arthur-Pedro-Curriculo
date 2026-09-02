# Segurança e implantação

O Worker protege `/admin.html` no servidor e entrega somente o conteúdo estático nas demais rotas.

Antes da primeira implantação, configure dois segredos no projeto `arthur-pedro-curriculo`:

```powershell
pnpm wrangler secret put ADMIN_PASSWORD
pnpm wrangler secret put ADMIN_SESSION_SECRET
```

Use uma senha exclusiva e longa para `ADMIN_PASSWORD`. Para `ADMIN_SESSION_SECRET`, use uma sequência aleatória longa (no mínimo 32 caracteres). Esses valores nunca devem ser incluídos no Git, em arquivos `.env` publicados ou no JavaScript do site.

Para trocar ou recuperar a senha administrativa, substitua `ADMIN_PASSWORD` no Cloudflare. Para encerrar imediatamente todas as sessões existentes, substitua também `ADMIN_SESSION_SECRET`.

Depois de configurar os segredos, publique com:

```powershell
pnpm run build
pnpm wrangler deploy
```

No painel Cloudflare, mantenha **Always Use HTTPS** ativado. O Worker também redireciona requisições HTTP para HTTPS e envia HSTS para acessos seguros.
