# Publicação no Cloudflare Pages

Este projeto está preparado para implantação automática pelo repositório privado do GitHub:

`apop14520-glitch/e-curriculo-arthur-pedro`

## Configuração do projeto

No painel do Cloudflare, acesse **Workers & Pages**, crie uma aplicação do tipo **Pages** e escolha **Importar um repositório Git existente**.

Autorize o aplicativo **Cloudflare Workers and Pages** a acessar somente o repositório `e-curriculo-arthur-pedro` e use os seguintes valores:

| Campo | Valor |
| --- | --- |
| Branch de produção | `main` |
| Framework preset | `Vite` |
| Comando de build | `npm run build` |
| Diretório de saída | `dist` |
| Diretório raiz | `/` (raiz do repositório) |

Não é necessário cadastrar variáveis de ambiente. A versão publicada é gerada a partir de `index.html`; a área local de administração não entra no diretório final de produção.

## Atualizações automáticas

Depois que o repositório estiver conectado, cada novo commit enviado para `main` iniciará automaticamente uma compilação e uma publicação. Outras branches podem gerar URLs de pré-visualização sem alterar o site principal.

## Segurança e cache

O arquivo `public/_headers` é copiado pelo Vite para `dist/_headers`. O Cloudflare Pages interpreta esse arquivo durante a publicação e aplica:

- proteção contra interpretação incorreta de tipos de arquivo;
- restrição de incorporação em frames externos;
- política de referência;
- bloqueio de câmera, microfone e geolocalização;
- cache longo para arquivos versionados em `assets`;
- cache semanal para imagens dos projetos.

## Endereço final

Após o primeiro deploy, o Cloudflare disponibilizará um endereço no formato:

`https://e-curriculo-arthur-pedro.pages.dev`

O endereço efetivo depende da disponibilidade do nome no momento da criação. Um domínio personalizado também pode ser conectado posteriormente pelo painel do Cloudflare.

