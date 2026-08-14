const EDUCATION_KEY = 'arthur-education-v1'
const TIMELINE_KEY = 'arthur-timeline-v1'

const safeParse = (key, fallback = []) => {
  try { return JSON.parse(localStorage.getItem(key)) || fallback } catch { return fallback }
}

const escapeHtml = value => String(value || '').replace(/[&<>'"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[char])

const baseEducation = [
  { id: 'cloud', type: 'Pós-graduação', period: 'Especialização', course: 'Projetos de Cloud Computing', institution: 'Descomplica Faculdade Digital', badge: 'Cloud' },
  { id: 'ifro', type: 'Graduação', period: '2022–2024', course: 'Tecnologia da Informação', institution: 'Instituto Federal de Rondônia — IFRO', badge: 'IFRO' },
]

const baseTimeline = [
  { id: 't1', year: '2022', category: 'Formação', title: 'Início da graduação em Tecnologia da Informação', description: 'Base acadêmica no IFRO, conectando tecnologia, desenvolvimento e infraestrutura.' },
  { id: 't2', year: '2023', category: 'Capacitação', title: 'Aprofundamento em infraestrutura e desenvolvimento', description: 'Linux, servidores, redes, bancos de dados, Python e aplicações web.' },
  { id: 't3', year: '2024', category: 'Graduação', title: 'Tecnologia da Informação — IFRO', description: 'Conclusão da graduação com aplicação prática em ambientes e projetos de TI.' },
  { id: 't4', year: '2025', category: 'Especialização', title: 'Projetos de Cloud Computing', description: 'Especialização em arquitetura, planejamento e entrega de projetos em nuvem.' },
  { id: 't5', year: '2026', category: 'Publicação', title: 'Artigo científico publicado', description: 'Produção científica disponibilizada pela Revista Observatorio Latinoamericana.' },
  { id: 't6', year: '2026', category: 'Certificações', title: 'IA, LGPD e Jornada Tech.RO', description: 'Atualização contínua em inteligência artificial, privacidade, inovação e tecnologia.' },
]

const sectionLabels = {
  sobre: ['Sobre', 'Perfil profissional e posicionamento'],
  experiencia: ['Experiência', 'Trajetória profissional'],
  competencias: ['Competências', 'Tecnologias e áreas de atuação'],
  artigo: ['Publicação', 'Produção científica'],
  formacao: ['Formação', 'Graduação e pós-graduação'],
  projetos: ['Projetos', 'Infraestrutura, cloud e transformação digital'],
  certificados: ['Certificados', 'Licenças e capacitações'],
  publicacoes: ['Linha do tempo', 'Marcos da trajetória'],
  contato: ['Contato', 'Conexões profissionais'],
}

const projectTopics = [
  ['⌁', 'Infraestrutura & Redes', 'Fibra óptica, rádio, switches, conectividade e documentação de ambientes.'],
  ['☁', 'Cloud & Virtualização', 'Proxmox, máquinas virtuais, capacidade, disponibilidade e projetos de cloud.'],
  ['◉', 'Monitoramento', 'Zabbix, alertas, indicadores, inventário e observabilidade preventiva.'],
  ['⚙', 'Identidade & Servidores', 'Active Directory, File Server, políticas, permissões e serviços corporativos.'],
  ['◆', 'Segurança & Continuidade', 'Backups, segmentação, controles de acesso e continuidade operacional.'],
  ['▦', 'Sistemas Corporativos', 'GLPI, ERP, integrações, suporte, processos e governança de atendimento.'],
]

export function initializeRedesign({ isOwnerView, editor }) {
  document.body.classList.toggle('owner-view', isOwnerView)
  document.body.classList.toggle('public-view', !isOwnerView)

  document.querySelector('.view-toggle')?.remove()
  document.querySelector('.nav-cta')?.remove()
  document.querySelector('.cinema-heading .section-kicker')?.remove()
  document.querySelector('.contact-actions')?.remove()
  document.querySelector('.hero-proof')?.remove()
  const topNavigation = document.querySelector('.nav')
  if (topNavigation && !topNavigation.querySelector('a[href="#sistemas"]')) {
    const homeLink = document.createElement('a')
    homeLink.href = '#sistemas'
    homeLink.textContent = 'Início'
    topNavigation.prepend(homeLink)
  }
  if (topNavigation && !topNavigation.querySelector('a[href="#certificados"]')) {
    const certificatesLink = document.createElement('a')
    certificatesLink.href = '#certificados'
    certificatesLink.textContent = 'Certificados'
    topNavigation.append(certificatesLink)
  }
  if (topNavigation && !topNavigation.querySelector('a[href="#publicacoes"]')) {
    const journeyLink = document.createElement('a')
    journeyLink.href = '#publicacoes'
    journeyLink.textContent = 'Trajetória'
    topNavigation.append(journeyLink)
  }
  const injectedNavigationLinks = [...(topNavigation?.querySelectorAll('a[href^="#"]') || [])]
  injectedNavigationLinks.forEach(link => link.addEventListener('click', () => {
    document.querySelector('.site-header')?.classList.remove('menu-open')
    document.querySelector('.menu-button')?.setAttribute('aria-expanded', 'false')
  }))
  const injectedSections = injectedNavigationLinks.map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean)
  const injectedNavigationObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return
      injectedNavigationLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`))
    })
  }, { rootMargin: '-25% 0px -62% 0px', threshold: 0 })
  injectedSections.forEach(section => injectedNavigationObserver.observe(section))
  const themeToggle = document.querySelector('.theme-toggle')
  const mainNavigation = document.querySelector('.nav')
  if (themeToggle && mainNavigation) {
    themeToggle.classList.add('nexforma-theme-switch')
    themeToggle.setAttribute('aria-label', 'Alternar entre modo claro e modo escuro')
    themeToggle.setAttribute('title', 'Alternar modo claro/escuro')
    mainNavigation.append(themeToggle)
  }
  document.querySelectorAll('[id] > .section-kicker').forEach(kicker => {
    const labels = sectionLabels[kicker.parentElement.id]
    if (labels) kicker.innerHTML = `<strong class="kicker-title">${labels[0]}</strong><span class="kicker-subtitle">${labels[1]}</span>`
  })

  const skills = [
    ['☁', 'Virtualização e cloud'], ['◉', 'Monitoramento e observabilidade'],
    ['⚙', 'Servidores e identidade'], ['⌁', 'Redes e conectividade'],
  ]
  document.querySelectorAll('.skill-icon').forEach((icon, index) => {
    const item = skills[index]
    if (!item) return
    icon.textContent = item[0]
    icon.title = item[1]
    icon.setAttribute('aria-label', item[1])
  })

  const projects = document.querySelector('.projects-grid')
  if (projects) projects.innerHTML = projectTopics.map(([icon, title, description]) => `
    <article class="topic-project"><span class="topic-icon" aria-hidden="true">${icon}</span><div><h3>${title}</h3><p>${description}</p></div><i>Competência aplicada</i></article>`).join('')

  const feedSection = document.querySelector('.profile-feed')
  if (feedSection) {
    feedSection.hidden = false
    feedSection.innerHTML = `
    <div class="section-kicker"><strong class="kicker-title">Linha do tempo</strong><span class="kicker-subtitle">Marcos da trajetória</span></div>
    <div class="section-heading"><h2>Uma trajetória construída<br><em>em evolução contínua.</em></h2><p>Formação, capacitações, experiências e produção científica organizadas em ordem cronológica.</p></div>
    <div class="timeline-carousel">
      <div class="timeline-controls"><span>ARRASTE OU USE AS SETAS</span><div><button type="button" data-timeline-prev aria-label="Voltar na linha do tempo">‹</button><button type="button" data-timeline-next aria-label="Avançar na linha do tempo">›</button></div></div>
      <div class="journey-timeline" data-timeline tabindex="0" aria-label="Linha do tempo profissional"></div>
      <div class="timeline-progress"><i data-timeline-progress></i></div>
    </div>`
  }

  const footer = document.querySelector('footer')
  if (footer) footer.innerHTML = `
    <div class="footer-main">
      <div class="footer-statement"><span>E-CURRÍCULO</span><strong>Tecnologia confiável para ambientes que precisam crescer.</strong><p>Infraestrutura, cloud computing e gestão de TI com visão estratégica.</p></div>
      <div class="footer-column"><strong>Perfil</strong><a href="#sobre">Sobre</a><a href="#experiencia">Experiência</a><a href="#formacao">Formação</a><a href="#certificados">Certificados</a></div>
      <div class="footer-column"><strong>Especialidades</strong><a href="#competencias">Infraestrutura</a><a href="#competencias">Cloud & Virtualização</a><a href="#competencias">Monitoramento</a><a href="#projetos">Projetos técnicos</a></div>
      <div class="footer-column"><strong>Conteúdo</strong><a href="#sistemas">Sistemas desenvolvidos</a><a href="#artigo">Artigo científico</a><a href="#publicacoes">Linha do tempo</a><a href="#contato">Contato</a></div>
    </div>
    <div class="footer-community"><div><strong>Conecte-se</strong><span>Acompanhe minha trajetória e meus projetos pelos atalhos disponíveis na lateral da página.</span></div><button class="back-top" type="button">Voltar ao topo ↑</button></div>
    <div class="footer-bottom"><p>© 2026 E-Currículo. Todos os direitos reservados.</p><div><a href="#home">Início</a><a href="#contato">Contato profissional</a><span>Porto Velho · Rondônia · Brasil</span></div></div>`
  footer?.querySelector('.back-top')?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }))

  let extraEducation = safeParse(EDUCATION_KEY)
  let extraTimeline = safeParse(TIMELINE_KEY)
  const renderEducation = () => {
    const target = document.querySelector('.education-list')
    if (!target) return
    target.innerHTML = [...baseEducation, ...extraEducation].map(item => `<article data-education-id="${item.id}"><span>${escapeHtml(item.type)}${item.period ? ` · ${escapeHtml(item.period)}` : ''}</span><div><h3>${escapeHtml(item.course)}</h3><p>${escapeHtml(item.institution)}</p></div><b>${escapeHtml(item.badge || 'TI')}</b>${isOwnerView && !String(item.id).startsWith('cloud') && !String(item.id).startsWith('ifro') ? `<button class="entry-remove" data-remove-education="${item.id}" type="button">Excluir</button>` : ''}</article>`).join('')
  }
  const renderTimeline = () => {
    const target = document.querySelector('[data-timeline]')
    if (!target) return
    const items = [...baseTimeline, ...extraTimeline].sort((a, b) => String(a.year).localeCompare(String(b.year)))
    target.innerHTML = items.map(item => `<article data-timeline-id="${item.id}"><time>${escapeHtml(item.year)}</time><div><span>${escapeHtml(item.category)}</span><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.description)}</p></div>${isOwnerView && String(item.id).startsWith('custom-') ? `<button class="entry-remove" data-remove-timeline="${item.id}" type="button">Excluir</button>` : ''}</article>`).join('')
  }
  renderEducation(); renderTimeline()

  const timelineTrack = document.querySelector('[data-timeline]')
  const updateTimelineState = () => {
    if (!timelineTrack) return
    const cards = [...timelineTrack.querySelectorAll('article')]
    const maximum = timelineTrack.scrollWidth - timelineTrack.clientWidth
    const progress = maximum > 0 ? timelineTrack.scrollLeft / maximum : 0
    const paddingLeft = Number.parseFloat(getComputedStyle(timelineTrack).paddingLeft) || 0
    const visibleStart = timelineTrack.scrollLeft + paddingLeft
    let activeIndex = 0
    let closestDistance = Infinity
    cards.forEach((card, index) => {
      const distance = Math.abs(card.offsetLeft - visibleStart)
      if (distance < closestDistance) { closestDistance = distance; activeIndex = index }
    })
    if (maximum - timelineTrack.scrollLeft < 3) activeIndex = cards.length - 1
    cards.forEach((card, index) => card.classList.toggle('timeline-active', index === activeIndex))
    document.querySelector('[data-timeline-progress]')?.style.setProperty('--timeline-progress', `${Math.max(8, progress * 100)}%`)
  }
  const moveTimeline = direction => {
    if (!timelineTrack) return
    const card = timelineTrack.querySelector('article')
    timelineTrack.scrollBy({ left: direction * ((card?.offsetWidth || 320) + 24), behavior: 'smooth' })
  }
  document.querySelector('[data-timeline-prev]')?.addEventListener('click', () => moveTimeline(-1))
  document.querySelector('[data-timeline-next]')?.addEventListener('click', () => moveTimeline(1))
  timelineTrack?.addEventListener('wheel', event => {
    if (Math.abs(event.deltaY) <= Math.abs(event.deltaX) || timelineTrack.scrollWidth <= timelineTrack.clientWidth) return
    event.preventDefault()
    timelineTrack.scrollBy({ left: event.deltaY * 1.2, behavior: 'smooth' })
  }, { passive: false })
  timelineTrack?.addEventListener('scroll', updateTimelineState, { passive: true })
  requestAnimationFrame(updateTimelineState)

  if (!isOwnerView) {
    document.querySelector('.profile-editor-trigger')?.setAttribute('disabled', '')
    document.querySelector('.brand i')?.remove()
    return
  }

  const ownerMenu = document.createElement('aside')
  ownerMenu.className = 'owner-menu'
  ownerMenu.setAttribute('aria-hidden', 'true')
  ownerMenu.innerHTML = `<div class="owner-menu-head"><span>PAINEL EXCLUSIVO <em>Somente você</em></span><strong>Central de personalização</strong><small>Gerencie seu perfil profissional em um só lugar.</small></div>
    <div class="owner-menu-actions">
      <button type="button" data-owner-action="profile"><i>◉</i><span><b>Perfil e fotografia</b><small>Identidade, cargo e enquadramento</small></span></button>
      <button type="button" data-owner-action="education"><i>▤</i><span><b>Formações</b><small>Graduação e pós-graduação</small></span></button>
      <button type="button" data-owner-action="timeline"><i>⌁</i><span><b>Linha do tempo</b><small>Marcos da trajetória profissional</small></span></button>
      <button type="button" data-owner-action="publish"><i>＋</i><span><b>Publicações</b><small>Projetos, cursos e entregas</small></span></button>
    </div>
    <button class="owner-preview" type="button" data-owner-action="preview"><i>↗</i><span><b>Visualizar site público</b><small>Abrir apresentação sem permissões</small></span></button>`
  document.querySelector('.site-header').append(ownerMenu)

  const editorBody = editor.querySelector('.editor-body')
  editorBody.insertAdjacentHTML('beforeend', `
    <section class="editor-section owner-form" data-owner-panel="education"><h3>Nova formação</h3><label>Tipo<select name="educationType"><option>Graduação</option><option>Pós-graduação</option><option>Mestrado</option><option>Doutorado</option></select></label><label>Curso<input name="educationCourse" placeholder="Nome do curso" /></label><div class="editor-fields"><label>Instituição<input name="educationInstitution" placeholder="Instituição" /></label><label>Período<input name="educationPeriod" placeholder="Ex.: 2024–2026" /></label></div><label>Identificador<input name="educationBadge" maxlength="10" placeholder="Ex.: IFRO" /></label><button type="button" data-save-education>Adicionar formação</button></section>
    <section class="editor-section owner-form" data-owner-panel="timeline"><h3>Novo marco da trajetória</h3><div class="editor-fields"><label>Ano<input name="timelineYear" inputmode="numeric" placeholder="2026" /></label><label>Categoria<input name="timelineCategory" placeholder="Formação, publicação..." /></label></div><label>Título<input name="timelineTitle" placeholder="Título do marco" /></label><label>Descrição<textarea name="timelineDescription" rows="3" placeholder="Breve contexto profissional"></textarea></label><button type="button" data-save-timeline>Adicionar à linha do tempo</button></section>`)

  const openPanel = panel => {
    editor.showModal()
    editor.querySelectorAll('[data-owner-panel]').forEach(item => item.classList.toggle('active-owner-panel', item.dataset.ownerPanel === panel))
    editor.querySelector(`[data-owner-panel="${panel}"]`)?.scrollIntoView({ block: 'center' })
  }
  const toggleMenu = force => {
    const open = typeof force === 'boolean' ? force : !ownerMenu.classList.contains('open')
    ownerMenu.classList.toggle('open', open)
    ownerMenu.setAttribute('aria-hidden', String(!open))
  }
  document.addEventListener('owner-menu-toggle', () => toggleMenu())
  document.addEventListener('click', event => { if (!ownerMenu.contains(event.target) && !event.target.closest('.profile-editor-trigger')) toggleMenu(false) })
  ownerMenu.addEventListener('click', event => {
    const action = event.target.closest('[data-owner-action]')?.dataset.ownerAction
    if (!action) return
    toggleMenu(false)
    if (action === 'preview') return window.open(new URL('index.html', window.location.href), '_blank', 'noopener')
    if (action === 'profile') return editor.showModal()
    if (action === 'publish') return editor.showModal()
    openPanel(action)
  })

  editor.querySelector('[data-save-education]').addEventListener('click', () => {
    const form = editor.querySelector('form')
    const course = form.elements.educationCourse.value.trim(), institution = form.elements.educationInstitution.value.trim()
    if (!course || !institution) return form.elements[!course ? 'educationCourse' : 'educationInstitution'].focus()
    extraEducation.push({ id: `custom-${Date.now()}`, type: form.elements.educationType.value, period: form.elements.educationPeriod.value.trim(), course, institution, badge: form.elements.educationBadge.value.trim() || 'TI' })
    localStorage.setItem(EDUCATION_KEY, JSON.stringify(extraEducation)); renderEducation()
    ;['educationCourse', 'educationInstitution', 'educationPeriod', 'educationBadge'].forEach(name => { form.elements[name].value = '' })
    editor.close(); document.querySelector('#formacao').scrollIntoView({ behavior: 'smooth' })
  })
  editor.querySelector('[data-save-timeline]').addEventListener('click', () => {
    const form = editor.querySelector('form')
    const title = form.elements.timelineTitle.value.trim(), description = form.elements.timelineDescription.value.trim()
    if (!title || !description) return form.elements[!title ? 'timelineTitle' : 'timelineDescription'].focus()
    extraTimeline.push({ id: `custom-${Date.now()}`, year: form.elements.timelineYear.value.trim() || new Date().getFullYear(), category: form.elements.timelineCategory.value.trim() || 'Trajetória', title, description })
    localStorage.setItem(TIMELINE_KEY, JSON.stringify(extraTimeline)); renderTimeline()
    ;['timelineYear', 'timelineCategory', 'timelineTitle', 'timelineDescription'].forEach(name => { form.elements[name].value = '' })
    editor.close(); document.querySelector('#publicacoes').scrollIntoView({ behavior: 'smooth' })
  })
  document.addEventListener('click', event => {
    const educationId = event.target.dataset.removeEducation
    const timelineId = event.target.dataset.removeTimeline
    if (educationId) { extraEducation = extraEducation.filter(item => item.id !== educationId); localStorage.setItem(EDUCATION_KEY, JSON.stringify(extraEducation)); renderEducation() }
    if (timelineId) { extraTimeline = extraTimeline.filter(item => item.id !== timelineId); localStorage.setItem(TIMELINE_KEY, JSON.stringify(extraTimeline)); renderTimeline() }
  })
}
