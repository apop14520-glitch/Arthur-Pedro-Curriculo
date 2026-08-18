import './style.css'
import './additions.css'
import './editor.css'
import './carousel.css'
import './certificates.css'
import './cinema.css'
import './crop-fix.css'
import './theme-social.css'
import './live-fixes.css'
import './article-logo.css'
import './certificates-theme.css'
import './social-icons.css'
import './whatsapp-icon-fix.css'
import './social-vibration.css'
import './recruiter-view.css'
import './redesign.css'
import './social-network-upgrade.css'
import './footer-professional.css'
import './carousel-contrast.css'

// Substitua os dois links marcados abaixo pelos perfis individuais quando disponíveis.
const profileLinks = {
  linkedin: 'https://www.linkedin.com/in/arthur-p-7098a2150/',
  github: 'https://github.com/apop14520-glitch',
  lattes: 'https://lattes.cnpq.br/', // TODO: informar o currículo de Arthur
}

const icons = {
  arrow: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  external: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 5h5v5M10 14 19 5M19 13v6H5V5h6"/></svg>',
  chevron: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>',
  mail: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16v12H4zM4 7l8 6 8-6"/></svg>',
  copy: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="8" y="8" width="11" height="11" rx="2"/><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"/></svg>',
}

const isOwnerView = window.location.pathname.toLowerCase().endsWith('/admin.html')
const isRecruiterView = !isOwnerView

document.querySelector('#app').innerHTML = `
  <header class="site-header" id="topo">
    <button class="brand profile-editor-trigger" type="button" aria-label="Abrir personalização do perfil"><span class="brand-avatar"><img alt="Foto de perfil" data-header-photo /><b>AP</b></span><strong data-profile-name>Arthur Pedro Oliveira de Paula</strong><i>Personalizar</i></button>
    <button class="view-toggle" type="button" aria-label="Abrir visão do recrutador"><span>◉</span><b>Visão do recrutador</b></button><button class="theme-toggle" type="button" aria-label="Ativar modo claro" title="Alternar tema"><span>☀</span><b>Modo claro</b></button><button class="menu-button" type="button" aria-label="Abrir menu" aria-expanded="false"><span></span><span></span></button>
    <nav class="nav" aria-label="Navegação principal">
      <a href="#sobre">Sobre</a><a href="#experiencia">Experiência</a><a href="#competencias">Competências</a><a href="#formacao">Formação</a><a href="#projetos">Projetos</a>
      <a class="nav-cta" href="#contato">Vamos conversar ${icons.arrow}</a>
    </nav>
  </header>

  <main id="conteudo">
    <section class="hero section" id="home">
      <div class="hero-glow"></div>
      <div class="hero-copy reveal">
        <div class="eyebrow"><span></span> Infraestrutura · Cloud · Governança</div>
        <h1>Tecnologia que sustenta<br><em>o negócio.</em></h1>
        <p class="hero-lead">Sou <strong data-profile-name>Arthur Pedro Oliveira de Paula</strong>, <span data-profile-role>Chefe de TI</span>. Transformo ambientes complexos em infraestrutura confiável, segura e preparada para crescer.</p>
        <div class="hero-actions">
          <a class="button button-primary" href="#experiencia">Conheça minha trajetória ${icons.arrow}</a>
        </div>
      </div>
      <div class="hero-panel reveal" aria-label="Resumo profissional">
        <div class="system-carousel" aria-label="Projetos em destaque"><div class="carousel-track"><figure class="carousel-slide active"><img src="/projetos/sophia.png" alt="Sistema SOPH.IA" /><figcaption><b>SOPH.IA</b><span>Assistente institucional inteligente</span></figcaption></figure><figure class="carousel-slide"><img src="/projetos/do-zero-ao-bananal.png" alt="Sistema Do Zero ao Bananal" /><figcaption><b>Do Zero ao Bananal</b><span>Manual digital interativo</span></figcaption></figure><figure class="carousel-slide"><img src="/projetos/nexforma.png" alt="Sistema NEXFORMA" data-nexforma-image /><div class="nexforma-fallback"><b>NEXFORMA</b><span>Adicione o print em Personalizar</span></div><figcaption><b>NEXFORMA</b><span>Plataforma de formação</span></figcaption></figure></div><button class="carousel-prev" type="button" aria-label="Imagem anterior">‹</button><button class="carousel-next" type="button" aria-label="Próxima imagem">›</button><div class="carousel-dots" role="tablist"><button class="active" aria-label="Ver SOPH.IA"></button><button aria-label="Ver Do Zero ao Bananal"></button><button aria-label="Ver NEXFORMA"></button></div></div>
        <div class="panel-top"><span class="status-dot"></span> Sistemas operacionais</div>
        <div class="metric"><strong>TI</strong><span>Liderança técnica<br>e visão estratégica</span></div>
        <div class="signal" aria-label="Habilidades técnicas"><i data-skill="Infraestrutura" data-level="90%"></i><i data-skill="Cloud Computing" data-level="82%"></i><i data-skill="Proxmox" data-level="94%"></i><i data-skill="Zabbix" data-level="86%"></i><i data-skill="GLPI" data-level="91%"></i><i data-skill="Active Directory" data-level="88%"></i><i data-skill="File Server" data-level="95%"></i><i data-skill="Redes" data-level="92%"></i><i data-skill="ERP" data-level="89%"></i><i data-skill="CFTV" data-level="84%"></i><i data-skill="Fibra óptica" data-level="87%"></i><i data-skill="Switches" data-level="93%"></i></div>
        <div class="panel-grid"><div><small>FOCO</small><b>Disponibilidade</b></div><div><small>ATUAÇÃO</small><b>Infra & Cloud</b></div></div>
        <div class="stack-line"><span>PROXMOX</span><span>ZABBIX</span><span>GLPI</span><span>AD</span></div>
      </div>
      <div class="hero-proof reveal"><span>Gestão e sustentação de</span><div><b>Servidores</b><b>Redes</b><b>ERP</b><b>Conectividade</b><b>Segurança</b></div></div>
    </section>

    <section class="cinema-section" id="sistemas"><div class="cinema-heading"><div class="section-kicker"><span>SHOWCASE</span> Sistemas desenvolvidos</div><h2>Projetos em <em>grande tela.</em></h2><p>Navegue pelas experiências e amplie cada interface.</p></div><div class="cinema-carousel"><button class="cinema-arrow cinema-back" type="button" aria-label="Projeto anterior">‹</button><div class="cinema-stage"><figure class="cinema-slide active" data-title="SOPH.IA" data-image="/projetos/sophia.png"><button class="cinema-image" type="button" aria-label="Ampliar SOPH.IA"><img src="/projetos/sophia.png" alt="Tela do sistema SOPH.IA" /></button><figcaption><span>01 · Inteligência artificial</span><h3>SOPH.IA</h3><p>Assistente institucional para documentos, minutas e fluxos administrativos.</p><div><button type="button" class="cinema-zoom">Ampliar imagem</button></div></figcaption></figure><figure class="cinema-slide" data-title="Do Zero ao Bananal" data-image="/projetos/do-zero-ao-bananal.png"><button class="cinema-image" type="button" aria-label="Ampliar Do Zero ao Bananal"><img src="/projetos/do-zero-ao-bananal.png" alt="Tela do projeto Do Zero ao Bananal" /></button><figcaption><span>02 · Experiência digital</span><h3>Do Zero ao Bananal</h3><p>Manual interativo para implantação, manejo e acompanhamento do cultivo.</p><div><button type="button" class="cinema-zoom">Ampliar imagem</button></div></figcaption></figure><figure class="cinema-slide" data-title="NEXFORMA" data-image="/projetos/nexforma.png"><button class="cinema-image" type="button" aria-label="Ampliar NEXFORMA"><img src="/projetos/nexforma.png" alt="Painel do sistema NEXFORMA" /></button><figcaption><span>03 · Gestão e formação</span><h3>NEXFORMA</h3><p>Plataforma de gestão, precificação e apoio à produção com impressão 3D.</p><div><button type="button" class="cinema-zoom">Ampliar imagem</button></div></figcaption></figure><figure class="cinema-slide" data-title="Gram Energia" data-image="/projetos/gram-energia.png"><button class="cinema-image" type="button" aria-label="Ampliar Gram Energia"><img src="/projetos/gram-energia.png" alt="Página da consultoria Gram Energia" /></button><figcaption><span>04 · Energia e experiência digital</span><h3>Gram Energia</h3><p>Interface institucional para apresentação de soluções de energia limpa e economia por assinatura.</p><div><button type="button" class="cinema-zoom">Ampliar imagem</button></div></figcaption></figure></div><button class="cinema-arrow cinema-forward" type="button" aria-label="Próximo projeto">›</button><div class="cinema-progress"><i></i><span>01 / 04</span></div></div></section>

    <section class="section about" id="sobre">
      <div class="section-kicker reveal"><span>01</span> Sobre</div>
      <div class="about-grid">
        <h2 class="reveal">Da operação à liderança,<br>com a técnica sempre <em>por perto.</em></h2>
        <div class="about-copy reveal">
          <p class="large">Atuo na área de Tecnologia da Informação com foco em infraestrutura, redes, virtualização, sistemas corporativos e transformação digital.</p>
          <p>Minha trajetória nasceu no suporte e evoluiu para a liderança de ambientes críticos. Essa base prática orienta decisões que equilibram pessoas, processos e tecnologia — sempre com atenção à disponibilidade, segurança e continuidade dos serviços.</p>
          <p>Hoje, participo do planejamento, implantação, administração e modernização da infraestrutura tecnológica, conectando necessidades do negócio a soluções sustentáveis.</p>
          <a class="text-link" href="${profileLinks.linkedin}" target="_blank" rel="noreferrer">Ver perfil completo ${icons.arrow}</a>
        </div>
      </div>
      <div class="values reveal"><article><span>01</span><h3>Confiabilidade</h3><p>Ambientes estáveis e monitorados para manter a operação disponível.</p></article><article><span>02</span><h3>Visão sistêmica</h3><p>Decisões técnicas alinhadas às pessoas, aos processos e ao negócio.</p></article><article><span>03</span><h3>Evolução contínua</h3><p>Infraestrutura preparada para modernizar, automatizar e escalar.</p></article></div>
    </section>

    <section class="section experience" id="experiencia">
      <div class="section-kicker reveal"><span>02</span> Experiência</div>
      <div class="section-heading reveal"><h2>Uma trajetória construída<br><em>de dentro da operação.</em></h2><p>Experiência progressiva em suporte, administração de ambientes, infraestrutura e liderança de TI.</p></div>
      <div class="timeline">
        <article class="timeline-item featured reveal"><div class="time-mark"><i></i><span>Atual</span></div><div class="time-content"><div class="role"><h3>Chefe de TI</h3><span>Liderança & Infraestrutura</span></div><p>Planejamento, implantação e modernização do ambiente tecnológico, com atuação em sistemas ERP, redes, servidores, CFTV, rádio, fibra óptica, switches e continuidade dos serviços.</p><div class="tags"><span>Gestão de TI</span><span>ERP</span><span>Infraestrutura</span><span>Redes</span><span>CFTV</span></div></div></article>
        <article class="timeline-item reveal"><div class="time-mark"><i></i><span>Experiência pública</span></div><div class="time-content"><div class="role"><h3>Tecnologia da Informação</h3><span>Governo de Rondônia</span></div><p>Atuação com suporte e sustentação tecnológica em ambiente público, apoiando usuários, serviços e rotinas de tecnologia.</p><div class="tags"><span>Suporte</span><span>Serviços de TI</span><span>Setor público</span></div></div></article>
        <article class="timeline-item reveal"><div class="time-mark"><i></i><span>Base técnica</span></div><div class="time-content"><div class="role"><h3>Suporte & Administração</h3><span>Sapiens · Ministério Público Federal</span></div><p>Suporte técnico, administração de dispositivos e perfis, Google Admin Console e atendimento a usuários — a base prática para uma visão completa da operação.</p><div class="tags"><span>Google Admin</span><span>Chromebooks</span><span>Help Desk</span></div></div></article>
      </div>
    </section>

    <section class="section skills" id="competencias">
      <div class="section-kicker reveal"><span>03</span> Competências</div>
      <div class="section-heading reveal"><h2>Stack técnico para ambientes<br><em>que não podem parar.</em></h2><p>Ferramentas e domínios aplicados à gestão, sustentação e evolução da infraestrutura.</p></div>
      <div class="skills-grid reveal">
        <article><div class="skill-icon">VM</div><h3>Virtualização & Cloud</h3><p>Ambientes flexíveis, eficientes e preparados para continuidade.</p><ul><li>Proxmox VE</li><li>Cloud Computing</li><li>Máquinas virtuais</li><li>Backup & recuperação</li></ul></article>
        <article><div class="skill-icon">OBS</div><h3>Monitoramento & Serviços</h3><p>Visibilidade operacional e atendimento estruturado de ponta a ponta.</p><ul><li>Zabbix</li><li>GLPI</li><li>Disponibilidade</li><li>Gestão de incidentes</li></ul></article>
        <article><div class="skill-icon">SYS</div><h3>Sistemas & Identidade</h3><p>Administração segura de usuários, arquivos e serviços corporativos.</p><ul><li>Active Directory</li><li>File Server</li><li>Windows / Linux</li><li>Sistemas ERP</li></ul></article>
        <article><div class="skill-icon">NET</div><h3>Redes & Conectividade</h3><p>Infraestrutura física e lógica para conectar toda a operação.</p><ul><li>Switches & redes</li><li>Fibra óptica</li><li>Rádio enlace</li><li>CFTV</li></ul></article>
      </div>
    </section>

    <section class="section scientific-article" id="artigo"><div class="section-kicker reveal"><span>PUBLICAÇÃO</span> Produção científica</div><div class="article-feature reveal"><div class="article-mark"><span>O</span><small>Revista<br>Observatorio</small></div><div class="article-copy"><span>Artigo científico publicado</span><h2>Pesquisa publicada na Revista Observatorio Latinoamericana</h2><p>Produção científica de Arthur Pedro Oliveira de Paula disponível para consulta na plataforma editorial da revista.</p><div><a class="button button-primary" href="https://ojs.observatoriolatinoamericano.com/ojs/index.php/olel/article/view/5520" target="_blank" rel="noreferrer">Visualizar publicação ↗</a><a class="button button-ghost" href="https://ojs.observatoriolatinoamericano.com/ojs/index.php/olel/article/view/5520/3531" target="_blank" rel="noreferrer">Abrir PDF ↗</a></div></div><div class="article-meta"><span>TIPO</span><b>Artigo científico</b><span>DISPONIBILIDADE</span><b>Publicação + PDF</b></div></div></section>

    <section class="section education" id="formacao">
      <div class="section-kicker reveal"><span>04</span> Formação</div>
      <div class="education-grid">
        <div class="education-intro reveal"><h2>Conhecimento aplicado<br><em>à realidade.</em></h2><p>Formação tecnológica combinada à especialização em projetos de nuvem e à experiência prática em ambientes de TI.</p></div>
        <div class="education-list">
          <article class="reveal"><span class="degree">Pós-graduação</span><div><h3>Projetos de Cloud Computing</h3><p>Descomplica</p></div><b>Cloud</b></article>
          <article class="reveal"><span class="degree">Graduação · 2022—2024</span><div><h3>Tecnologia da Informação</h3><p>Instituto Federal de Rondônia — IFRO</p></div><b>IFRO</b></article>
          <article class="reveal"><span class="degree">Desenvolvimento contínuo</span><div><h3>Formação complementar</h3><p>MySQL · Suporte em TI · Python · Servidores Linux</p></div><b>+</b></article>
        </div>
      </div>
    </section>

    <section class="section projects" id="projetos">
      <div class="section-kicker reveal"><span>05</span> Projetos</div>
      <div class="section-heading reveal"><h2>Frentes de atuação<br><em>com impacto real.</em></h2><p>Áreas que representam a prática profissional e podem receber estudos de caso, métricas e detalhes no futuro.</p></div>
      <div class="projects-grid">
        <article class="project-card project-feature reveal"><div class="project-screenshot"><img src="/projetos/sophia.png" alt="Captura de tela do projeto SOPH.IA" /></div><div class="project-body"><span>Projeto web</span><h3>SOPH.IA</h3><p>Assistente institucional para elaboração, revisão e organização de documentos administrativos.</p><div class="tags"><span>IA</span><span>Interface</span><span>Produtividade</span></div></div></article>
        <article class="project-card project-feature reveal"><div class="project-screenshot"><img src="/projetos/do-zero-ao-bananal.png" alt="Captura de tela do projeto Do Zero ao Bananal" /></div><div class="project-body"><span>Projeto web</span><h3>Do Zero ao Bananal</h3><p>Manual digital de implantação, manejo inicial e acompanhamento do cultivo de banana.</p><div class="tags"><span>Website</span><span>Conteúdo</span><span>Experiência</span></div></div></article>
        <article class="project-card project-wide reveal"><div class="project-visual network"><span class="node n1"></span><span class="node n2"></span><span class="node n3"></span><span class="node n4"></span><i></i><b>INFRA / 01</b></div><div class="project-body"><span>Modernização</span><h3>Infraestrutura & conectividade</h3><p>Evolução de redes, fibra óptica, switches, enlaces e serviços essenciais para uma operação mais confiável.</p><div class="tags"><span>Redes</span><span>Fibra</span><span>Switching</span></div></div></article>
        <article class="project-card reveal"><div class="project-visual bars"><i></i><i></i><i></i><i></i><i></i><b>OBS / 02</b></div><div class="project-body"><span>Observabilidade</span><h3>Monitoramento de serviços</h3><p>Visibilidade de ativos e serviços para antecipar falhas e apoiar decisões operacionais.</p><div class="tags"><span>Zabbix</span><span>GLPI</span></div></div></article>
        <article class="project-card reveal"><div class="project-visual cubes"><i></i><i></i><i></i><b>CLOUD / 03</b></div><div class="project-body"><span>Virtualização</span><h3>Consolidação de ambientes</h3><p>Organização de recursos computacionais com foco em eficiência, disponibilidade e recuperação.</p><div class="tags"><span>Proxmox</span><span>Backup</span></div></div></article>
      </div>
      <p class="project-note reveal">Projetos apresentados como áreas de atuação. Inclua métricas e resultados públicos conforme sua disponibilidade.</p>
    </section>

    <section class="section certificates" id="certificados"><div class="section-kicker reveal"><span>06</span> Licenças e certificados</div><div class="section-heading reveal"><h2>Aprendizado contínuo,<br><em>comprovado na prática.</em></h2><p>Formações em inteligência artificial, infraestrutura, dados, privacidade, desenvolvimento e inovação.</p></div><div class="certificate-tools reveal"><input type="search" data-cert-search placeholder="Pesquisar certificado ou instituição" aria-label="Pesquisar certificados" /><select data-cert-year aria-label="Filtrar certificados por ano"><option value="">Todos os anos</option><option>2026</option><option>2025</option><option>2024</option><option>2023</option><option>2022</option></select></div><div class="certificate-grid" data-cert-grid></div><button class="certificate-more" type="button" data-cert-more>Ver todos os certificados</button></section>

    <section class="section profile-feed" id="publicacoes"><div class="section-kicker reveal"><span>07</span> Perfil personalizável</div><div class="section-heading reveal"><h2>Minha evolução,<br><em>sempre atualizada.</em></h2><p>Projetos, entregas, capacitações e conhecimentos adicionados diretamente por mim.</p></div><div class="feed-empty" data-feed-empty><strong>Seu espaço profissional está pronto.</strong><span>Clique em “Personalizar” no canto superior esquerdo para fazer a primeira publicação.</span></div><div class="feed-grid" data-feed-grid></div></section>

    <section class="section contact" id="contato">
      <div class="contact-card reveal">
        <div><div class="eyebrow"><span></span> Contato</div><h2>Vamos construir uma TI<br><em>mais confiável?</em></h2><p>Estou aberto a conexões profissionais, troca de experiências e oportunidades em infraestrutura, cloud e gestão de tecnologia.</p></div>
        <div class="contact-actions">
          <a href="${profileLinks.linkedin}" target="_blank" rel="noreferrer"><span>LinkedIn<small>Conecte-se comigo</small></span>${icons.external}</a>
          <a href="${profileLinks.github}" target="_blank" rel="noreferrer"><span>GitHub<small>Perfil a configurar</small></span>${icons.external}</a>
          <a href="${profileLinks.lattes}" target="_blank" rel="noreferrer"><span>Currículo Lattes<small>Link a configurar</small></span>${icons.external}</a>
        </div>
      </div>
    </section>
  </main>

  <footer><a class="brand" href="#home"><span>AP</span><strong data-profile-name>Arthur Pedro Oliveira de Paula</strong></a><p>© 2026 Arthur Pedro Oliveira de Paula. Todos os direitos reservados.<small>Infraestrutura · Cloud Computing · Gestão de TI</small></p><button class="back-top" type="button">Voltar ao topo ↑</button></footer>

  <dialog class="editor-dialog" aria-labelledby="editor-title"><form class="editor-shell" method="dialog"><div class="editor-head"><div><span>Perfil profissional</span><h2 id="editor-title">Personalizar conteúdo</h2></div><button class="editor-close" value="cancel" aria-label="Fechar">×</button></div><div class="editor-body"><section class="editor-section"><h3>Identidade profissional</h3><div class="editor-fields"><label>Nome completo<input name="profileName" value="Arthur Pedro Oliveira de Paula" required /></label><label>Cargo ou título<input name="profileRole" value="Chefe de TI" required /></label></div><label class="upload-field">Foto de perfil<input name="profilePhoto" type="file" accept="image/*" /><span>Escolher uma foto do computador</span></label><div class="photo-adjuster"><div class="crop-preview"><span>AP</span></div><label>Zoom<input name="photoZoom" type="range" min="100" max="240" value="100" /></label><label>Horizontal<input name="photoX" type="range" min="0" max="100" value="50" /></label><label>Vertical<input name="photoY" type="range" min="0" max="100" value="50" /></label></div><label>WhatsApp com DDD<input name="profileWhatsapp" inputmode="numeric" placeholder="Ex.: 69999999999" /></label><label class="upload-field">Print do NEXFORMA<input name="nexformaImage" type="file" accept="image/*" /><span>Carregar imagem do sistema</span></label><button class="editor-save-profile" type="button">Salvar perfil</button></section><section class="editor-section"><h3>Adicionar ao portfólio</h3><div class="editor-fields"><label>Categoria<select name="entryCategory"><option>Projeto</option><option>Design entregue</option><option>Capacitação</option><option>Conhecimento</option><option>Certificação</option><option>Experiência</option></select></label><label>Título<input name="entryTitle" placeholder="Ex.: Curso de Segurança em Nuvem" /></label></div><label>Descrição<textarea name="entryDescription" rows="4" placeholder="Conte o que foi feito ou aprendido..."></textarea></label><label class="upload-field">Foto, print ou certificado<input name="entryImage" type="file" accept="image/*" /><span>Carregar imagem</span></label><button class="editor-publish" type="button">Publicar no perfil</button></section></div><p class="editor-note">As personalizações ficam salvas somente neste navegador e computador.</p></form></dialog>
  <div class="social-floats"><a class="github-float" href="${profileLinks.github}" target="_blank" rel="noreferrer" aria-label="Abrir GitHub"><span><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" stroke="none" d="M12 .7a11.5 11.5 0 0 0-3.64 22.4c.58.1.79-.25.79-.56v-2.23c-3.22.7-3.9-1.37-3.9-1.37-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.04 1.77 2.72 1.26 3.38.96.1-.75.4-1.26.74-1.55-2.57-.29-5.27-1.29-5.27-5.69 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.16 1.18a10.9 10.9 0 0 1 5.75 0c2.2-1.49 3.16-1.18 3.16-1.18.63 1.59.23 2.76.11 3.05.74.8 1.19 1.83 1.19 3.09 0 4.42-2.71 5.39-5.29 5.68.42.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .7Z"/></svg></span><b>GitHub</b></a><a class="linkedin-float" href="${profileLinks.linkedin}" target="_blank" rel="noreferrer" aria-label="Abrir LinkedIn"><span><img src="/linkedin-icon-reference.png" alt="" /></span><b>LinkedIn</b></a><button class="whatsapp-float" type="button" aria-label="Conversar pelo WhatsApp"><span><img src="/whatsapp-icon-reference.png" alt="" /></span><b>WhatsApp</b></button></div>
  <dialog class="cinema-lightbox"><button class="lightbox-close" type="button" aria-label="Fechar imagem">×</button><button class="lightbox-prev" type="button" aria-label="Imagem anterior">‹</button><img alt="Projeto ampliado" /><button class="lightbox-next" type="button" aria-label="Próxima imagem">›</button><div><h3></h3></div></dialog>
`

document.body.classList.toggle('recruiter-view', isRecruiterView)
document.querySelector('.view-toggle').addEventListener('click', () => {
  const url = new URL('index.html', window.location.href)
  url.search = ''
  window.open(url, '_blank', 'noopener')
})
if (isRecruiterView) document.title = 'Arthur Pedro | E-Currículo Profissional'
else document.title = 'Painel | E-Currículo Arthur Pedro'

document.querySelectorAll('[data-optional-image]').forEach(image => {
  const showFallback = () => image.closest('.profile-frame, .project-screenshot')?.classList.add('image-missing')
  image.addEventListener('error', showFallback)
  if (image.complete && image.naturalWidth === 0) showFallback()
})

const themeButton = document.querySelector('.theme-toggle')
const applyTheme = theme => {
  document.documentElement.dataset.theme = theme
  themeButton.querySelector('span').textContent = theme === 'light' ? '☾' : '☀'
  themeButton.querySelector('b').textContent = theme === 'light' ? 'Modo noturno' : 'Modo claro'
  themeButton.setAttribute('aria-label', theme === 'light' ? 'Ativar modo noturno' : 'Ativar modo claro')
  localStorage.setItem('arthur-theme', theme)
}
themeButton.addEventListener('click', () => applyTheme(document.documentElement.dataset.theme === 'light' ? 'dark' : 'light'))
applyTheme(localStorage.getItem('arthur-theme') || 'dark')

document.querySelector('.back-top').addEventListener('click', () => {
  const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
  window.scrollTo({ top: 0, behavior })
})

const editor = document.querySelector('.editor-dialog')
const editorForm = editor.querySelector('form')
const PROFILE_KEY = 'arthur-professional-profile-v2'
const FEED_KEY = 'arthur-professional-feed-v1'
const defaultProfile = { name: 'Arthur Pedro Oliveira de Paula', role: 'Chefe de TI', photo: '', photoZoom: 100, photoX: 50, photoY: 50, whatsapp: '', nexforma: '' }
const readSaved = (key, fallback) => { try { return JSON.parse(localStorage.getItem(key)) ?? fallback } catch { return fallback } }
let savedProfile = readSaved(PROFILE_KEY, defaultProfile)
let savedEntries = readSaved(FEED_KEY, [])

const imageToDataUrl = file => new Promise((resolve, reject) => {
  if (!file) return resolve('')
  const reader = new FileReader()
  reader.onerror = reject
  reader.onload = () => {
    const image = new Image()
    image.onerror = reject
    image.onload = () => {
      const scale = Math.min(1, 1600 / image.width)
      const canvas = document.createElement('canvas')
      canvas.width = Math.round(image.width * scale)
      canvas.height = Math.round(image.height * scale)
      canvas.getContext('2d').drawImage(image, 0, 0, canvas.width, canvas.height)
      resolve(canvas.toDataURL('image/jpeg', .82))
    }
    image.src = reader.result
  }
  reader.readAsDataURL(file)
})

const applyProfile = () => {
  document.querySelectorAll('[data-profile-name]').forEach(el => { el.textContent = savedProfile.name })
  document.querySelectorAll('[data-profile-role]').forEach(el => { el.textContent = savedProfile.role })
  editorForm.elements.profileName.value = savedProfile.name
  editorForm.elements.profileRole.value = savedProfile.role
  const headerPhoto = document.querySelector('[data-header-photo]')
  const avatar = headerPhoto.closest('.brand-avatar')
  if (savedProfile.photo) { headerPhoto.src = savedProfile.photo; avatar.classList.add('has-photo') } else { avatar.classList.remove('has-photo') }
  const zoom = Math.max(1.1, (savedProfile.photoZoom ?? 110) / 100)
  const offsetX = (50 - (savedProfile.photoX ?? 50)) * (zoom - 1) / zoom
  const offsetY = (50 - (savedProfile.photoY ?? 50)) * (zoom - 1) / zoom
  headerPhoto.style.objectPosition = 'center'
  headerPhoto.style.transform = `scale(${zoom}) translate(${offsetX}%, ${offsetY}%)`
  editorForm.elements.photoZoom.value = savedProfile.photoZoom ?? 100
  editorForm.elements.photoX.value = savedProfile.photoX ?? 50
  editorForm.elements.photoY.value = savedProfile.photoY ?? 50
  editorForm.elements.profileWhatsapp.value = savedProfile.whatsapp ?? ''
  const nexforma = document.querySelector('[data-nexforma-image]')
  if (savedProfile.nexforma) { nexforma.src = savedProfile.nexforma; nexforma.closest('.carousel-slide').classList.add('has-nexforma') }
  updateCropPreview()
}

const escapeHtml = value => String(value).replace(/[&<>'"]/g, char => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', "'":'&#39;', '"':'&quot;' })[char])
const renderFeed = () => {
  const grid = document.querySelector('[data-feed-grid]')
  document.querySelector('[data-feed-empty]').hidden = savedEntries.length > 0
  grid.innerHTML = savedEntries.map(entry => `<article class="feed-card"><div class="feed-card-head"><span>${escapeHtml(entry.category)}</span><button type="button" data-delete-entry="${entry.id}" aria-label="Excluir ${escapeHtml(entry.title)}">Excluir</button></div>${entry.image ? `<img src="${entry.image}" alt="Imagem de ${escapeHtml(entry.title)}" />` : ''}<div class="feed-card-body"><h3>${escapeHtml(entry.title)}</h3><p>${escapeHtml(entry.description)}</p><small>Adicionado ao perfil</small></div></article>`).join('')
  if (isRecruiterView) return
  grid.querySelectorAll('[data-delete-entry]').forEach(button => button.addEventListener('click', () => {
    savedEntries = savedEntries.filter(entry => entry.id !== button.dataset.deleteEntry)
    localStorage.setItem(FEED_KEY, JSON.stringify(savedEntries)); renderFeed()
  }))
}

let pendingProfilePhoto = ''
const updateCropPreview = () => {
  const preview = editor.querySelector('.crop-preview')
  const source = pendingProfilePhoto || savedProfile.photo
  preview.classList.toggle('has-image', Boolean(source))
  preview.style.backgroundImage = source ? `url(${source})` : ''
  preview.style.backgroundSize = `${Math.max(110, Number(editorForm.elements.photoZoom.value))}%`
  preview.style.backgroundPosition = `${editorForm.elements.photoX.value}% ${editorForm.elements.photoY.value}%`
}
editorForm.elements.photoZoom.min = '110'
if (Number(editorForm.elements.photoZoom.value) < 110) editorForm.elements.photoZoom.value = '110'
const adjusterHint = document.createElement('small')
adjusterHint.className = 'crop-hint'
adjusterHint.textContent = 'Arraste a foto dentro do círculo ou use os controles.'
editor.querySelector('.photo-adjuster').append(adjusterHint)
editorForm.elements.profilePhoto.addEventListener('change', async () => { pendingProfilePhoto = await imageToDataUrl(editorForm.elements.profilePhoto.files[0]); updateCropPreview() })
;['photoZoom','photoX','photoY'].forEach(name => editorForm.elements[name].addEventListener('input', updateCropPreview))

const cropPreview = editor.querySelector('.crop-preview')
let cropDrag = null
cropPreview.addEventListener('pointerdown', event => {
  if (!(pendingProfilePhoto || savedProfile.photo)) return
  cropDrag = { x: event.clientX, y: event.clientY, horizontal: Number(editorForm.elements.photoX.value), vertical: Number(editorForm.elements.photoY.value) }
  cropPreview.setPointerCapture(event.pointerId)
  cropPreview.classList.add('dragging')
})
cropPreview.addEventListener('pointermove', event => {
  if (!cropDrag) return
  const horizontal = Math.max(0, Math.min(100, cropDrag.horizontal - ((event.clientX - cropDrag.x) / cropPreview.clientWidth) * 100))
  const vertical = Math.max(0, Math.min(100, cropDrag.vertical - ((event.clientY - cropDrag.y) / cropPreview.clientHeight) * 100))
  editorForm.elements.photoX.value = String(Math.round(horizontal))
  editorForm.elements.photoY.value = String(Math.round(vertical))
  updateCropPreview()
})
const finishCropDrag = () => { cropDrag = null; cropPreview.classList.remove('dragging') }
cropPreview.addEventListener('pointerup', finishCropDrag)
cropPreview.addEventListener('pointercancel', finishCropDrag)

const slides = [...document.querySelectorAll('.carousel-slide')]
const dots = [...document.querySelectorAll('.carousel-dots button')]
let activeSlide = 0
const showSlide = index => {
  activeSlide = (index + slides.length) % slides.length
  slides.forEach((slide, i) => slide.classList.toggle('active', i === activeSlide))
  dots.forEach((dot, i) => dot.classList.toggle('active', i === activeSlide))
}
document.querySelector('.carousel-prev').addEventListener('click', () => showSlide(activeSlide - 1))
document.querySelector('.carousel-next').addEventListener('click', () => showSlide(activeSlide + 1))
dots.forEach((dot, i) => dot.addEventListener('click', () => showSlide(i)))
let carouselTimer = setInterval(() => showSlide(activeSlide + 1), 4500)
const carousel = document.querySelector('.system-carousel')
carousel.addEventListener('mouseenter', () => clearInterval(carouselTimer))
carousel.addEventListener('mouseleave', () => { carouselTimer = setInterval(() => showSlide(activeSlide + 1), 4500) })

document.querySelector('[data-nexforma-image]').addEventListener('error', event => event.target.closest('.carousel-slide').classList.remove('has-nexforma'))

const cinemaSlides = [...document.querySelectorAll('.cinema-slide')]
const cinemaLightbox = document.querySelector('.cinema-lightbox')
let cinemaIndex = 0
const showCinemaSlide = index => {
  cinemaIndex = (index + cinemaSlides.length) % cinemaSlides.length
  cinemaSlides.forEach((slide, position) => {
    slide.classList.toggle('active', position === cinemaIndex)
    slide.classList.toggle('before', position === (cinemaIndex - 1 + cinemaSlides.length) % cinemaSlides.length)
    slide.classList.toggle('after', position === (cinemaIndex + 1) % cinemaSlides.length)
  })
  document.querySelector('.cinema-progress span').textContent = `${String(cinemaIndex + 1).padStart(2, '0')} / ${String(cinemaSlides.length).padStart(2, '0')}`
  document.querySelector('.cinema-progress i').style.width = `${((cinemaIndex + 1) / cinemaSlides.length) * 100}%`
}
const openCinemaLightbox = index => {
  showCinemaSlide(index)
  const slide = cinemaSlides[cinemaIndex]
  cinemaLightbox.querySelector('img').src = slide.dataset.image
  cinemaLightbox.querySelector('img').alt = `${slide.dataset.title} ampliado`
  cinemaLightbox.querySelector('h3').textContent = slide.dataset.title
  if (!cinemaLightbox.open) cinemaLightbox.showModal()
}
document.querySelector('.cinema-back').addEventListener('click', () => showCinemaSlide(cinemaIndex - 1))
document.querySelector('.cinema-forward').addEventListener('click', () => showCinemaSlide(cinemaIndex + 1))
cinemaSlides.forEach((slide, index) => slide.querySelectorAll('.cinema-image,.cinema-zoom').forEach(button => button.addEventListener('click', () => openCinemaLightbox(index))))
cinemaLightbox.querySelector('.lightbox-close').addEventListener('click', () => cinemaLightbox.close())
cinemaLightbox.querySelector('.lightbox-prev').addEventListener('click', () => openCinemaLightbox(cinemaIndex - 1))
cinemaLightbox.querySelector('.lightbox-next').addEventListener('click', () => openCinemaLightbox(cinemaIndex + 1))
cinemaLightbox.addEventListener('click', event => { if (event.target === cinemaLightbox) cinemaLightbox.close() })
document.addEventListener('keydown', event => {
  if (!cinemaLightbox.open) return
  if (event.key === 'ArrowLeft') openCinemaLightbox(cinemaIndex - 1)
  if (event.key === 'ArrowRight') openCinemaLightbox(cinemaIndex + 1)
})
let cinemaTimer = setInterval(() => showCinemaSlide(cinemaIndex + 1), 6000)
document.querySelector('.cinema-carousel').addEventListener('mouseenter', () => clearInterval(cinemaTimer))
document.querySelector('.cinema-carousel').addEventListener('mouseleave', () => { cinemaTimer = setInterval(() => showCinemaSlide(cinemaIndex + 1), 6000) })
showCinemaSlide(0)

document.querySelector('.whatsapp-float').addEventListener('click', () => {
  if (!savedProfile.whatsapp) { editor.showModal(); editorForm.elements.profileWhatsapp.focus(); return }
  window.open(`https://wa.me/55${savedProfile.whatsapp}?text=${encodeURIComponent('Olá, Arthur! Vi seu portfólio profissional e gostaria de conversar.')}`, '_blank', 'noopener')
})

const certificates = [
  ['Certificado de Participação — Jornada Tech.RO','Even3','mar 2026','48659679.2001935.6.5.0587537266179858'],
  ['O ecossistema da LGPD','Descomplica Faculdade Digital','jan 2026','fe011ba1-e1f3-40ca-8307-5415daa22882'],
  ['A Inteligência Artificial como Habilidade no Mercado de Trabalho','Descomplica Faculdade Digital','jan 2026','48c96af5-a5bb-4641-8898-de365153a316'],
  ['Computação e Inteligência Artificial','Descomplica Faculdade Digital','nov 2025','3b6b6e07-243d-4460-818a-cbe83e804488'],
  ['Fundamentos de IA do Google','Google','jul 2025','LYCAT2PRK3UU'],
  ['Suporte em TI','Google','jul 2025','Z0ATWD3NKK29'],
  ['Palestra: Cibersegurança','IFRO','mar 2024',''],
  ['Integração entre Banco de Dados Espaciais e Sistemas Web','IFRO','nov 2023','45514383.2001935.6.5.8850131299541868'],
  ['Circuito Científico 2023','Even3','nov 2023','45571552.2001935.6.5.8875882299541868'],
  ['X Semana de Educação para a Vida','IFRO','out 2023','45670431.2001935.6.5.8679015299541868'],
  ['IA na Produção dos Alunos e Transformação Sustentável','IFRO','out 2023','45554530.2001935.799149.5.888081929954187445048'],
  ['O Lattes e sua Relevância na Comunidade Acadêmica','IFRO','out 2023','45554530.2001935.720176.5.888081929954187295768'],
  ['Seminário de Projetos e Ações de Inovação','IFRO','out 2023','45554530.2001935.799141.5.888081929954187445058'],
  ['Lei de Acesso à Informação e LGPD','IFRO','out 2023','45554530.2001935.720143.5.888081929954187295018'],
  ['Os efeitos da IA na área da programação','IFRO','out 2023','45554530.2001935.746647.5.888081929954187066078'],
  ['1º Seminário de Privacidade e Proteção de Dados Pessoais','SETIC — Governo de Rondônia','out 2023','45638098.2001935.6.5.8613943299541868'],
  ['MySQL','Curso em Vídeo','set 2023','66C9E-6573-7'],
  ['Camada 8: o segredo da tecnologia e inovação','IFRO','jul 2023','4335443.2001935.437995.5.55700524461570591177'],
  ['Product Owner no Scrum','IFRO','jun 2023','4325967.2001935.472252.5.52713924461570922727'],
  ['Softwares Livres e Servidores Linux','IFRO','jun 2023','4325967.2001935.472258.5.52713924461570922787'],
  ['Desenvolvimento Web em Setor Público','IFRO','jun 2023','4325967.2001935.472263.5.52713924461570922357'],
  ['Infraestrutura de Cloud Computing','IFRO','jun 2023','4325967.2001935.472264.5.52713924461570922307'],
  ['Inteligência Artificial Aplicada ao Direito','IFRO','abr 2023','4361005.2001935.6.5.536447244615737'],
  ['PostgreSQL Fundamentals: Architecture','Amazon Web Services — AWS','jan 2023',''],
  ['Administrando Banco de Dados','Fundação Bradesco','jan 2023','2D9BF5EC-58B5-4F3A-B0DD-B03DE8E3D625'],
  ['Implementando Banco de Dados','Fundação Bradesco','jan 2023','D478BDD3-B46A-47C7-B1F9-9169A4BE7144'],
  ['Modelagem de Dados','Fundação Bradesco','jan 2023','56E7BBB4-7C9A-4049-8307-4FF09B865461'],
  ['Fundamentos de Lógica de Programação','Fundação Bradesco','jan 2023','401F6B2C-06A2-4F59-9A48-45FA88F75E82'],
  ['Introdução ao Python','IFRO','nov 2022','4739415.2001935.935446.5.56412783324674671197'],
  ['19ª Semana Nacional de Ciência e Tecnologia','IFRO','out 2022','4714820.2001935.6.5.521083833246797']
].map(([title, issuer, date, credential]) => ({ title, issuer, date, year: date.slice(-4), credential }))
let showAllCertificates = false
const renderCertificates = () => {
  const query = document.querySelector('[data-cert-search]').value.toLocaleLowerCase('pt-BR')
  const year = document.querySelector('[data-cert-year]').value
  const matched = certificates.filter(cert => (!year || cert.year === year) && (!query || `${cert.title} ${cert.issuer}`.toLocaleLowerCase('pt-BR').includes(query)))
  const visible = showAllCertificates || query || year ? matched : matched.slice(0, 9)
  document.querySelector('[data-cert-grid]').innerHTML = visible.map(cert => `<article class="certificate-card"><div class="certificate-year">${cert.year}</div><div><span>${escapeHtml(cert.issuer)}</span><h3>${escapeHtml(cert.title)}</h3><p>Emitido em ${escapeHtml(cert.date)}</p>${cert.credential ? `<details><summary>Ver credencial</summary><code>${escapeHtml(cert.credential)}</code></details>` : ''}</div></article>`).join('') || '<p class="certificate-none">Nenhum certificado encontrado.</p>'
  const more = document.querySelector('[data-cert-more]')
  more.hidden = Boolean(query || year) || matched.length <= 9
  more.textContent = showAllCertificates ? 'Mostrar destaques' : `Ver todos os ${certificates.length} certificados`
}
document.querySelector('[data-cert-search]').addEventListener('input', renderCertificates)
document.querySelector('[data-cert-year]').addEventListener('change', renderCertificates)
document.querySelector('[data-cert-more]').addEventListener('click', () => { showAllCertificates = !showAllCertificates; renderCertificates() })
renderCertificates()

document.querySelector('.profile-editor-trigger').addEventListener('click', event => {
  if (!isRecruiterView && event.target.closest('.brand-avatar')) document.dispatchEvent(new CustomEvent('owner-menu-toggle'))
})
editor.addEventListener('click', event => { if (event.target === editor) editor.close() })
editor.querySelector('.editor-save-profile').addEventListener('click', async () => {
  const name = editorForm.elements.profileName.value.trim(), role = editorForm.elements.profileRole.value.trim()
  if (!name || !role) return editorForm.reportValidity()
  const file = editorForm.elements.profilePhoto.files[0]
  const nexformaFile = editorForm.elements.nexformaImage.files[0]
  savedProfile = { name, role, photo: file ? await imageToDataUrl(file) : savedProfile.photo, photoZoom: Number(editorForm.elements.photoZoom.value), photoX: Number(editorForm.elements.photoX.value), photoY: Number(editorForm.elements.photoY.value), whatsapp: editorForm.elements.profileWhatsapp.value.replace(/\D/g, ''), nexforma: nexformaFile ? await imageToDataUrl(nexformaFile) : savedProfile.nexforma }
  localStorage.setItem(PROFILE_KEY, JSON.stringify(savedProfile)); pendingProfilePhoto = ''; applyProfile(); editor.close()
})
editor.querySelector('.editor-publish').addEventListener('click', async () => {
  const title = editorForm.elements.entryTitle.value.trim(), description = editorForm.elements.entryDescription.value.trim()
  if (!title || !description) return editorForm.elements[!title ? 'entryTitle' : 'entryDescription'].focus()
  const image = await imageToDataUrl(editorForm.elements.entryImage.files[0])
  savedEntries.unshift({ id: `${Date.now()}`, category: editorForm.elements.entryCategory.value, title, description, image })
  try { localStorage.setItem(FEED_KEY, JSON.stringify(savedEntries)) } catch { alert('A imagem é muito grande. Escolha uma imagem menor.'); savedEntries.shift(); return }
  editorForm.elements.entryTitle.value = ''; editorForm.elements.entryDescription.value = ''; editorForm.elements.entryImage.value = ''
  renderFeed(); editor.close(); document.querySelector('#publicacoes').scrollIntoView({ behavior: 'smooth' })
})
applyProfile(); renderFeed()
if (isRecruiterView) {
  editor.querySelectorAll('input,select,textarea,button').forEach(control => { control.disabled = true })
  const feedSection = document.querySelector('.profile-feed')
  if (!savedEntries.length) feedSection.hidden = true
  else {
    feedSection.querySelector('.section-kicker').innerHTML = '<span>07</span> Destaques recentes'
    feedSection.querySelector('.section-heading p').textContent = 'Projetos, entregas, capacitações e conhecimentos que complementam minha trajetória profissional.'
  }
}

import('./redesign.js').then(({ initializeRedesign }) => initializeRedesign({ isOwnerView, editor }))

const header = document.querySelector('.site-header')
const menuButton = document.querySelector('.menu-button')
const nav = document.querySelector('.nav')
menuButton.addEventListener('click', () => {
  const open = header.classList.toggle('menu-open')
  menuButton.setAttribute('aria-expanded', String(open))
  menuButton.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu')
})
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  header.classList.remove('menu-open')
  menuButton.setAttribute('aria-expanded', 'false')
}))

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible')
      revealObserver.unobserve(entry.target)
    }
  })
}, { threshold: 0.12 })
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el))

const sections = [...document.querySelectorAll('main section[id]')]
const navLinks = [...document.querySelectorAll('.nav a[href^="#"]')]
const activateNavigation = () => {
  header.classList.toggle('scrolled', window.scrollY > 24)
  const current = sections.reduce((active, section) => window.scrollY >= section.offsetTop - 180 ? section.id : active, 'home')
  navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${current}`))
}
window.addEventListener('scroll', activateNavigation, { passive: true })
activateNavigation()

