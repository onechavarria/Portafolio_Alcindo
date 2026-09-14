import './style.css'
import { profile, projects, skills, certificates } from './data/portfolio.js'
import { icon } from './icons.js'
import { certificateCard, certificateDialog, setupCertificates } from './components/certificates.js'

const navItems = [
  ['01', 'Sobre mí', 'sobre-mi'],
  ['02', 'Skills', 'skills'],
  ['03', 'Experiencia', 'experiencia'],
  ['04', 'Proyectos', 'proyectos'],
  ['05', 'Certificados', 'certificados'],
  ['06', 'Contacto', 'contacto'],
]

const sectionTitle = (number, title) => `
  <div class="section-title reveal">
    <span>${number}.</span><h2>${title}</h2><i></i>
  </div>`

const socialLink = (url, name, label) => url
  ? `<a class="social-link" href="${url}" target="_blank" rel="noreferrer" aria-label="${label}">${icon(name)}</a>`
  : ''

const projectVisual = type => {
  const visuals = {
    biblioteca: `<div class="browser-mock browser-library"><div class="browser-top"><i></i><i></i><i></i><span>biblioteca.local</span></div><div class="library-nav"><b>BIBLIOTECA</b><span>Catálogo &nbsp; Préstamos &nbsp; Usuarios</span></div><div class="book-grid">${Array(6).fill('<i><b></b><span></span><span></span></i>').join('')}</div></div>`,
    gamer: `<div class="browser-mock browser-gamer"><div class="browser-top"><i></i><i></i><i></i><span>levelup-gamer.local</span></div><div class="gamer-head">LEVEL-UP <b>GAMER</b></div><div class="console-grid"><i>PC</i><i>PS5</i><i>SWITCH</i><i>XBOX</i></div><div class="gamer-progress"><span></span></div></div>`,
    movilidad: `<div class="browser-mock browser-mobility"><div class="browser-top"><i></i><i></i><i></i><span>movilidad.local</span></div><div class="map-grid"></div><div class="map-route"><span>A</span><i></i><b>🚲</b><i></i><span>B</span></div><div class="carbon"><small>CO₂ EVITADO</small><strong>12.8 kg</strong></div></div>`,
    perfulandia: `<div class="browser-mock browser-api"><div class="browser-top"><i></i><i></i><i></i><span>swagger.local</span></div><div class="swagger-head"><b>OpenAPI</b><span>PERFULANDIA</span></div><div class="endpoint get"><b>GET</b><span>/api/productos</span></div><div class="endpoint post"><b>POST</b><span>/api/ordenes</span></div><div class="endpoint put"><b>PUT</b><span>/api/inventario</span></div><div class="endpoint delete"><b>DELETE</b><span>/api/devoluciones</span></div></div>`,
    books: `<div class="browser-mock browser-generic"><div class="browser-top"><i></i><i></i><i></i><span>bookreview.local</span></div><div class="generic-title">BOOK REVIEW</div><div class="generic-grid"><i>Clean Code</i><i>Refactoring</i><i>Design Patterns</i></div></div>`,
    users: `<div class="browser-mock browser-api"><div class="browser-top"><i></i><i></i><i></i><span>usuarios-api.local</span></div><div class="swagger-head"><b>JWT API</b><span>USUARIOS</span></div><div class="endpoint post"><b>POST</b><span>/auth/login</span></div><div class="endpoint get"><b>GET</b><span>/api/usuarios</span></div><div class="endpoint put"><b>PUT</b><span>/api/perfil</span></div></div>`,
    pets: `<div class="browser-mock browser-generic"><div class="browser-top"><i></i><i></i><i></i><span>adopciones.local</span></div><div class="generic-title">ENCUENTRA UN COMPAÑERO</div><div class="pet-row"><i>🐶</i><i>🐱</i><i>🐰</i></div></div>`,
    mobile: `<div class="browser-mock browser-gamer"><div class="browser-top"><i></i><i></i><i></i><span>levelup.mobile</span></div><div class="gamer-head">LEVEL-UP <b>MOBILE</b></div><div class="console-grid"><i>HOME</i><i>SHOP</i><i>CART</i><i>USER</i></div></div>`,
    football: `<div class="browser-mock browser-generic"><div class="browser-top"><i></i><i></i><i></i><span>zona-futbolera.sql</span></div><div class="generic-title">ZONA FUTBOLERA</div><div class="score-board"><span>LOCAL</span><b>2 : 1</b><span>VISITA</span></div></div>`,
    service: `<div class="browser-mock browser-api"><div class="browser-top"><i></i><i></i><i></i><span>usuario-service.local</span></div><div class="swagger-head"><b>OpenAPI</b><span>USER SERVICE</span></div><div class="endpoint get"><b>GET</b><span>/usuarios</span></div><div class="endpoint post"><b>POST</b><span>/usuarios</span></div><div class="endpoint delete"><b>DELETE</b><span>/usuarios/{id}</span></div></div>`,
    identity: `<div class="browser-mock browser-generic"><div class="browser-top"><i></i><i></i><i></i><span>portal-entra.local</span></div><div class="generic-title">IDENTIDAD SEGURA</div><div class="identity-lock">⌁<b>Microsoft Entra ID</b><span>Acceso autorizado</span></div></div>`,
  }
  return visuals[type]
}

const projectCard = (project, index) => {
  const repoAvailable = Boolean(project.repoUrl)
  const githubButton = repoAvailable
    ? `<a class="repo-button" href="${project.repoUrl}" target="_blank" rel="noreferrer" aria-label="Abrir repositorio de ${project.title}">${icon('github', 'size-6')}<span>Ver repositorio</span></a>`
    : `<button class="repo-button repo-disabled" type="button" data-missing-repo="${project.title}" aria-label="Repositorio de ${project.title} pendiente de configurar">${icon('github', 'size-6')}<span>Agregar repositorio</span></button>`

  return `<article class="project-card reveal ${index % 2 ? 'project-reverse' : ''}">
    <div class="project-preview">${projectVisual(project.type)}</div>
    <div class="project-copy">
      <div class="project-meta"><span>▧ PROJECT_MODULE // ${project.code}</span>${repoAvailable ? icon('external', 'size-4') : ''}</div>
      <h3>${project.title}</h3>
      <p>${project.description}</p>
      <ul>${project.stack.map(item => `<li>${item}</li>`).join('')}</ul>
      ${githubButton}
    </div>
  </article>`
}

document.querySelector('#app').innerHTML = `
  <div class="noise" aria-hidden="true"></div>
  <header class="nav-shell">
    <a class="brand" href="#inicio" aria-label="Ir al inicio"><span>&gt;_</span> DEV</a>
    <button class="menu-button" type="button" aria-expanded="false" aria-controls="main-nav" aria-label="Abrir menú"><i></i><i></i><i></i></button>
    <nav id="main-nav">${navItems.map(([n, label, id]) => `<a href="#${id}" data-section="${id}"><span>${n}.</span>${label}</a>`).join('')}</nav>
  </header>
  <button class="theme-toggle" type="button" aria-label="Activar tema claro" aria-pressed="false">
    <span class="theme-sun">${icon('sun', 'size-4')}</span>
    <span class="theme-moon">${icon('moon', 'size-4')}</span>
  </button>

  <aside class="social-rail" aria-label="Redes sociales">
    ${socialLink(profile.githubUrl, 'github', 'GitHub')}
    ${socialLink(profile.linkedinUrl, 'linkedin', 'LinkedIn')}
    <a class="social-link" href="mailto:${profile.email}" aria-label="Correo electrónico">${icon('mail')}</a>
    <i></i>
  </aside>
  <aside class="email-rail"><a href="mailto:${profile.email}">${profile.email}</a><i></i></aside>

  <main class="home-view">
    <section id="inicio" class="hero section-wrap">
      <div class="hero-inner reveal">
        <div class="hero-badge">${icon('code', 'size-4')}<span>Modern Full-Stack Development</span></div>
        <h1>Desarrollo Full Stack rápido e impecable.</h1>
        <p class="hero-copy">Convierto ideas únicas en productos y experiencias digitales totalmente funcionales y de vanguardia.</p>
        <div class="hero-actions"><a class="primary-button" href="#proyectos">${icon('code', 'size-4')} Ver Proyectos</a></div>
      </div>
    </section>

    <section id="sobre-mi" class="section-wrap content-section">
      ${sectionTitle('01', 'Sobre mí')}
      <div class="about-layout">
        <div class="about-copy reveal">
          <p>Hola, soy <strong>${profile.name}</strong>, estudiante de Ingeniería en Informática y desarrollador enfocado en crear aplicaciones web, APIs y soluciones basadas en microservicios.</p>
          <p>Trabajo principalmente con Java, Spring Boot, JavaScript y tecnologías cloud. Me interesa transformar requisitos reales en software claro, seguro y mantenible.</p>
          <h3>Tecnologías con las que he trabajado</h3>
          <ul class="tech-list"><li>Java / Spring Boot</li><li>JavaScript / TypeScript</li><li>React / Angular</li><li>C# / ASP.NET Core</li><li>PostgreSQL / Oracle</li><li>Docker / GitHub Actions</li><li>Firebase / MongoDB</li><li>AWS / Azure</li></ul>
        </div>
        <div class="terminal reveal">
          <div class="terminal-top"><i></i><i></i><i></i><span>bash — alcindo@portfolio</span></div>
          <div class="terminal-body"><p><b>alcindo@dev:~$</b> whoami</p><p>{</p><p>&nbsp; "name": "${profile.name}",</p><p>&nbsp; "role": "${profile.role}",</p><p>&nbsp; "location": "${profile.location}",</p><p>&nbsp; "status": "Ready to build"</p><p>}</p><p><b>alcindo@dev:~$</b> <span class="terminal-cursor">█</span></p></div>
        </div>
      </div>
    </section>

    <section id="skills" class="section-wrap content-section">
      ${sectionTitle('02', 'Skills')}
      <div class="skills-grid">${skills.map(skill => `<article class="skill-card reveal"><div>${icon(skill.icon, 'size-5')}<small>${skill.level}</small></div><h3>${skill.name}</h3><span class="skill-track"><i class="${skill.color}" style="--progress:${skill.progress}%"></i></span></article>`).join('')}</div>
    </section>

    <section id="experiencia" class="section-wrap content-section">
      ${sectionTitle('03', 'Experiencia')}
      <article class="experience reveal"><div class="experience-head"><h3>Desarrollo de proyectos <span>@ Académicos y personales</span></h3><time>2024 — Actualidad</time></div><ul><li>Desarrollo APIs RESTful y microservicios con Java, Spring Boot, C# y ASP.NET Core.</li><li>Construyo interfaces responsive con React y Angular integradas con servicios backend.</li><li>Diseño bases de datos relacionales y NoSQL con PostgreSQL, Oracle, MySQL, Firebase y MongoDB.</li><li>Aplico Git, integración continua, Docker y prácticas de desarrollo seguro.</li></ul><div class="tags">${['Java','Spring Boot','React','Angular','PostgreSQL','Docker','Git'].map(tag => `<span>${tag}</span>`).join('')}</div></article>
    </section>

    <section id="proyectos" class="section-wrap content-section projects-section">
      ${sectionTitle('04', 'Proyectos')}
      <div class="projects-list">${projects.slice(0, 6).map(projectCard).join('')}</div>
      <div class="projects-more reveal"><a class="primary-button" href="#todos-proyectos">Ver todos los proyectos</a></div>
    </section>

    <section id="certificados" class="section-wrap content-section">
      ${sectionTitle('05', 'Certificados')}
      <div class="cert-grid">${certificates.map(certificateCard).join('')}</div>
    </section>

    <section id="contacto" class="contact section-wrap">
      <div class="contact-inner reveal"><p>06. ¿Qué sigue?</p><h2>Construyamos algo<br><span>que valga la pena.</span></h2><p>Estoy abierto a nuevas oportunidades y colaboraciones. Si tienes una idea o proyecto, conversemos.</p><a class="primary-button" href="mailto:${profile.email}">${icon('mail', 'size-4')} Iniciar contacto</a></div>
      <footer><div>${socialLink(profile.githubUrl, 'github', 'GitHub')}${socialLink(profile.linkedinUrl, 'linkedin', 'LinkedIn')}<a class="social-link" href="mailto:${profile.email}" aria-label="Correo electrónico">${icon('mail')}</a></div><p>Diseñado y construido por ${profile.name} — 2026</p><small><i></i> System Status: Operational</small></footer>
    </section>
  </main>
  <main class="all-projects-view" hidden>
    <section class="all-projects section-wrap">
      <a class="back-link" href="#inicio">← Volver al inicio</a>
      <div class="all-projects-heading"><h1>Todos los <span>Proyectos</span></h1><p>Explora los proyectos que he desarrollado. Cada uno incluye una descripción de su objetivo, tecnologías utilizadas y acceso al repositorio cuando esté disponible.</p></div>
      <div class="projects-list">${projects.map(projectCard).join('')}</div>
      <div class="projects-more"><a class="primary-button" href="#inicio">← Volver al inicio</a></div>
    </section>
  </main>
  <div class="toast" role="status" aria-live="polite"></div>
  ${certificateDialog()}
`

const menuButton = document.querySelector('.menu-button')
const nav = document.querySelector('#main-nav')
const navLinks = [...nav.querySelectorAll('a')]
const themeToggle = document.querySelector('.theme-toggle')
const themeColor = document.querySelector('meta[name="theme-color"]')

function applyTheme(theme) {
  const isLight = theme === 'light'
  document.documentElement.dataset.theme = theme
  themeToggle.setAttribute('aria-pressed', String(isLight))
  themeToggle.setAttribute('aria-label', isLight ? 'Activar tema oscuro' : 'Activar tema claro')
  themeColor.setAttribute('content', isLight ? '#f4f7fb' : '#020617')
}

applyTheme(document.documentElement.dataset.theme || 'dark')
themeToggle.addEventListener('click', () => {
  const nextTheme = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light'
  applyTheme(nextTheme)
  localStorage.setItem('portfolio-theme', nextTheme)
})

function setMenu(open) {
  menuButton.classList.toggle('open', open)
  nav.classList.toggle('open', open)
  menuButton.setAttribute('aria-expanded', String(open))
  menuButton.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú')
}

menuButton.addEventListener('click', () => setMenu(!nav.classList.contains('open')))
navLinks.forEach(link => link.addEventListener('click', () => setMenu(false)))
document.addEventListener('keydown', event => event.key === 'Escape' && setMenu(false))

const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) {
    entry.target.classList.add('visible')
    revealObserver.unobserve(entry.target)
  }
}), { threshold: 0.12 })
document.querySelectorAll('.reveal').forEach(element => revealObserver.observe(element))

const homeView = document.querySelector('.home-view')
const allProjectsView = document.querySelector('.all-projects-view')

function syncView() {
  const showingAllProjects = location.hash === '#todos-proyectos'
  document.body.classList.toggle('projects-page', showingAllProjects)
  homeView.hidden = showingAllProjects
  allProjectsView.hidden = !showingAllProjects
  if (showingAllProjects) {
    allProjectsView.querySelectorAll('.reveal').forEach(element => element.classList.add('visible'))
    window.scrollTo({ top: 0, behavior: 'instant' })
  } else if (location.hash === '#inicio') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

window.addEventListener('hashchange', syncView)
syncView()

const activeObserver = new IntersectionObserver(entries => entries.forEach(entry => {
  if (!entry.isIntersecting) return
  navLinks.forEach(link => link.classList.toggle('active', link.dataset.section === entry.target.id))
}), { rootMargin: '-35% 0px -58% 0px' })
document.querySelectorAll('.home-view section[id]').forEach(section => activeObserver.observe(section))

const toast = document.querySelector('.toast')
let toastTimer
function showToast(message) {
  toast.textContent = message
  toast.classList.add('show')
  clearTimeout(toastTimer)
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3200)
}

document.querySelectorAll('[data-missing-repo]').forEach(button => button.addEventListener('click', () => {
  showToast(`Falta agregar la URL del repositorio: ${button.dataset.missingRepo}`)
}))

setupCertificates(certificates, showToast)
