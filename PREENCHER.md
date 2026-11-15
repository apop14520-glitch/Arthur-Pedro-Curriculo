# Dados que faltam

Estas informações não estão no projeto, e o `AGENTS.md` proíbe inventar números, datas, empregadores e e-mails.
Com elas, o site e o CV em inglês ficam completos.

1. **Descrição dos estágios** no Governo de Rondônia e no Ministério Público Federal: o LinkedIn não traz texto sobre eles, então o site e o CV usam descrições genéricas.
2. **E-mail profissional** (e telefone, se quiser) para o CV. Hoje o CV traz só LinkedIn, GitHub e o site.
5. **Números reais** do trabalho: quantidade de servidores e máquinas virtuais, usuários atendidos, unidades conectadas, disponibilidade, economia obtida.
6. **Certificação de nuvem** (AWS, Azure ou Google Cloud), assim que existir, para entrar no site e no CV.
7. **Disponibilidade para mudança** e situação de visto, se quiser que apareça no CV.
8. **Meio período:** o LinkedIn marca o cargo de Chefe de TI como meio período, e o CV em inglês diz "part-time". Se não for o caso, corrija nos dois.
9. **Pós em Cloud (Descomplica):** o período está como "out. 2025 – nov. 2026", sem nota sobre o pitch. Quando o certificado sair, confirme a data de conclusão e ajuste em `src/main.js`, `src/redesign.js`, `src/i18n-en.js` e `cv/cv-en.html`, e gere o PDF de novo.

## Foto de perfil (visível para todos)

A foto é publicada pelo painel e fica guardada no Cloudflare (KV `PROFILE_KV`), então aparece em qualquer navegador e país, no círculo do cabeçalho e na seção Sobre.

- **Trocar ou incluir:** entre em `/admin.html`, clique no seu nome no topo (Personalizar), escolha a foto em "Foto de perfil", ajuste zoom e posição e clique em "Salvar perfil". A foto é recortada em quadrado (640 px) e enviada ao servidor.
- **Remover:** no mesmo painel, "Remover foto publicada".
- **Limites:** JPG, PNG ou WebP, até 1 MB já recortada. Quem já abriu o site pode ver a foto antiga por até 5 minutos.
- **Só o dono altera:** o envio exige a sessão do painel. A leitura é pública.
- **Configuração única (já feita quando existir o `kv_namespaces` no `wrangler.jsonc`):** criar o namespace KV no Cloudflare e ligar ao Worker com o nome `PROFILE_KV`.

## Como gerar o CV em inglês de novo

O CV é o `cv/cv-en.html`. Depois de editar, gere o PDF com o Edge:

```bash
msedge --headless=new --disable-gpu --no-pdf-header-footer --print-to-pdf=public/Arthur-Pedro-CV-EN.pdf cv/cv-en.html
```

O site liga o arquivo `public/Arthur-Pedro-CV-EN.pdf` pelo botão "Baixar CV" da página inicial.

## Inglês no site

O botão **EN/PT** do topo troca o idioma da versão pública. Navegadores que não estão em português abrem em inglês.
As traduções ficam em `src/i18n-en.js`: ao mudar um texto em português, atualize a chave correspondente lá.
