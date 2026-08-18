# Portfólio — Arthur Pedro

Site profissional em JavaScript puro, CSS e Vite. Não utiliza React nem bibliotecas de interface.

## Cloudflare Pages pelo GitHub

O projeto está preparado para implantação automática no Cloudflare Pages a partir do repositório privado `apop14520-glitch/e-curriculo-arthur-pedro`.

Use estas configurações no painel do Cloudflare:

- branch de produção: `main`;
- preset: `Vite`;
- comando de build: `npm run build`;
- diretório de saída: `dist`;
- diretório raiz: `/`.

Consulte [CLOUDFLARE-PAGES.md](CLOUDFLARE-PAGES.md) para o procedimento completo e as configurações de segurança/cache.

## Duas versões do site

- `admin.html`: versão exclusiva do proprietário. É aberta automaticamente por `INICIAR-E-CURRICULO.cmd` e contém o menu de controle dentro da foto do perfil.
- `index.html`: versão pública, somente para visualização. Não exibe personalização, formulários, exclusão nem permissões administrativas.

Na área administrativa, clique na foto ou no nome no canto superior esquerdo para abrir o menu suspenso. Por ele é possível ajustar o perfil e a fotografia, adicionar formações, registrar marcos na linha do tempo, publicar conteúdo e abrir a apresentação pública.

## Abrir sem usar o CMD

1. Extraia todo o conteúdo do ZIP para uma pasta.
2. Dê dois cliques em **`INICIAR-E-CURRICULO.cmd`**.
3. Na primeira abertura, aguarde enquanto as dependências são preparadas.
4. A área administrativa abrirá automaticamente em `http://127.0.0.1:5388/admin.html`.
5. Para ver exatamente o que um recrutador verá, use **Visualizar site público** no menu da foto; a página aberta será `http://127.0.0.1:5388/index.html`.

Para encerrar corretamente, dê dois cliques em **`PARAR-E-CURRICULO.cmd`**.

Não abra `localhost:5173` nem a porta `5274`, pois esses endereços pertencem às versões antigas.

O Node.js precisa estar instalado no computador. O iniciador trabalha em segundo plano, portanto nenhuma janela do CMD permanece aberta. Para encerrar o servidor, reinicie o computador ou finalize o processo **Node.js JavaScript Runtime** pelo Gerenciador de Tarefas.

## Executar no computador

1. Extraia o ZIP.
2. Abra o terminal dentro da pasta extraída.
3. Execute:

```bash
npm install
npm run dev
```

4. Abra o endereço `Local` mostrado pelo Vite, normalmente `http://localhost:5173`.

## Substituir o template Vite existente

Copie o conteúdo desta pasta para `C:\Users\70361772254\profile-arthur`, aceitando substituir os arquivos. Remova os arquivos antigos `src\main.ts`, `src\counter.ts` e a pasta de assets padrão do Vite para evitar confusão. O ponto de entrada desta versão é `src/main.js`.

## Configurar os links

Abra `src/main.js` e edite o objeto `profileLinks`, no início do arquivo. LinkedIn e GitHub já estão configurados. O endereço individual do Lattes ainda precisa ser informado.

## Adicionar foto e capturas dos projetos

Coloque as imagens abaixo na pasta `public`, mantendo exatamente estes nomes:

- `public/foto-perfil.jpg`: sua foto profissional, preferencialmente vertical.
- `public/projetos/sophia.jpg`: captura horizontal do projeto SOPH.IA.
- `public/projetos/do-zero-ao-bananal.jpg`: captura horizontal do projeto Do Zero ao Bananal.

O site detecta automaticamente quando cada arquivo existe. Enquanto uma imagem não for adicionada, uma moldura identificada ocupa o lugar sem quebrar o layout.

## Personalizar como perfil profissional

Clique no nome **Arthur Pedro Oliveira de Paula**, no canto superior esquerdo. O painel permite:

- alterar nome e cargo;
- carregar uma foto de perfil;
- publicar projetos e designs entregues;
- registrar capacitações, conhecimentos, certificações e experiências;
- adicionar uma imagem a cada publicação;
- excluir publicações anteriores.

As alterações são armazenadas no navegador do computador. Elas permanecem após fechar o site, mas não são automaticamente compartilhadas com outros computadores ou navegadores.

## Carrossel, foto e WhatsApp

- O painel principal alterna automaticamente entre SOPH.IA, Do Zero ao Bananal e NEXFORMA. Passe o mouse sobre o carrossel para pausar ou use as setas e os indicadores.
- No painel **Personalizar**, carregue sua foto e use os controles de zoom, posição horizontal e vertical para ajustar o enquadramento circular.
- A foto ajustada aparece no canto superior esquerdo, no lugar das iniciais AP.
- Para ajustar o enquadramento, arraste a foto diretamente dentro do círculo. Também é possível usar os controles Horizontal, Vertical e Zoom. O zoom mínimo foi aumentado para permitir deslocamento lateral visível.
- Informe o número do WhatsApp com DDD no mesmo painel. O botão flutuante só abre a conversa depois que o número for configurado.
- O print do NEXFORMA também pode ser carregado pelo painel Personalizar.
- Passe o mouse sobre as barras do painel técnico para ver o nome de cada habilidade.

## Showcase cinematográfico

O centro do currículo possui um carrossel grande com SOPH.IA, Do Zero ao Bananal e NEXFORMA. Use as setas para avançar e voltar. Clique na imagem ou em **Ampliar imagem** para abrir o zoom em tela cheia. No zoom, use as setas da tela ou do teclado.

- SOPH.IA: https://iasoph.netlify.app/
- Do Zero ao Bananal: https://criatorioaraguaia.netlify.app/

## Tema e atalhos sociais

- O botão no topo alterna entre modo claro e noturno e memoriza a escolha no navegador.
- O LinkedIn fica em um botão flutuante acima do WhatsApp.
- O WhatsApp pulsa em verde e recebe efeito vibracall ao passar o mouse.
- Os atalhos usam os ícones visuais de LinkedIn e WhatsApp enviados como referência, em botões circulares empilhados com halo e tooltip no hover.
- Ambos foram reduzidos e recebem vibração periódica: azul no LinkedIn e verde no WhatsApp. No hover, a vibração fica mais intensa.

## Artigo científico

- Página da publicação: https://ojs.observatoriolatinoamericano.com/ojs/index.php/olel/article/view/5520
- PDF: https://ojs.observatoriolatinoamericano.com/ojs/index.php/olel/article/view/5520/3531
- A identidade visual dessa seção utiliza a logo oficial enviada da Revista Observatorio de la Economía Latinoamericana.

## Visualização ao vivo

O iniciador abre o servidor de desenvolvimento do Vite. Enquanto ele estiver rodando, alterações salvas nos arquivos do projeto são refletidas automaticamente no navegador, sem precisar recarregar manualmente a página.

## Área administrativa e site público

- **Área administrativa (`admin.html`):** mantém personalização, enquadramento da foto, novas formações, linha do tempo e publicações.
- **Site público (`index.html`):** apresentação somente leitura, sem controles administrativos.
- As formações e os marcos adicionados ficam salvos no navegador do computador do proprietário.

## Certificados

A seção Licenças e certificados contém 30 formações informadas por Arthur, com pesquisa, filtro por ano, instituição, data de emissão e código de credencial quando disponível.

A seção possui estilos próprios para os modos claro e noturno, incluindo fundo, campos de pesquisa, filtros, cards, credenciais, hover e contraste de texto.

## Gerar versão de produção

```bash
npm run build
```

Os arquivos finais serão criados na pasta `dist`.

## Estrutura

- `index.html`: versão pública e ponto de montagem.
- `admin.html`: versão administrativa e ponto de montagem.
- `src/main.js`: conteúdo, interações, menu e animações.
- `src/redesign.js`: separação das versões, formações, linha do tempo e painel do proprietário.
- `src/style.css`: identidade visual e responsividade.
- `AGENTS.md`: orientação para futuras alterações com Codex.

