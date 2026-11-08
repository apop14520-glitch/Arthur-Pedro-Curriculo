# Dados que faltam

Estas informações não estão no projeto, e o `AGENTS.md` proíbe inventar números, datas, empregadores e e-mails.
Com elas, o site e o CV em inglês ficam completos.

1. **Datas dos cargos** (mês e ano de início e fim): Chefe de TI, Governo de Rondônia e Sapiens (Ministério Público Federal).
2. **Nome completo do órgão "SOPH"**, para o CV em inglês. Hoje o CV traz só a sigla.
3. **E-mail profissional** (e telefone, se quiser) para o CV. Hoje o CV traz só LinkedIn, GitHub e o site.
4. **Tipo da graduação** (tecnólogo ou bacharelado) e carga horária no IFRO. Quem avalia diploma de fora pede isso.
5. **Números reais** do trabalho: quantidade de servidores e máquinas virtuais, usuários atendidos, unidades conectadas, disponibilidade, economia obtida.
6. **Certificação de nuvem** (AWS, Azure ou Google Cloud), assim que existir, para entrar no site e no CV.
7. **Disponibilidade para mudança** e situação de visto, se quiser que apareça no CV.

## Como gerar o CV em inglês de novo

O CV é o `cv/cv-en.html`. Depois de editar, gere o PDF com o Edge:

```bash
msedge --headless=new --disable-gpu --no-pdf-header-footer --print-to-pdf=public/Arthur-Pedro-CV-EN.pdf cv/cv-en.html
```

O site liga o arquivo `public/Arthur-Pedro-CV-EN.pdf` pelo botão "Baixar CV" da página inicial.

## Inglês no site

O botão **EN/PT** do topo troca o idioma da versão pública. Navegadores que não estão em português abrem em inglês.
As traduções ficam em `src/i18n-en.js`: ao mudar um texto em português, atualize a chave correspondente lá.
