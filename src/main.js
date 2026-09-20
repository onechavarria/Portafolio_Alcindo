import './style.css'
import { profile, projects, skills, certificates } from './data/portfolio.js'
import { icon } from './icons.js'
import { certificateCard, certificateDialog, setupCertificates } from './components/certificates.js'

const navItems = [
  ['01', 'Sobre mí', 'About me', 'sobre-mi'],
  ['02', 'Skills', 'Skills', 'skills'],
  ['03', 'Experiencia', 'Experience', 'experiencia'],
  ['04', 'Proyectos', 'Projects', 'proyectos'],
  ['05', 'Certificados', 'Certificates', 'certificados'],
  ['06', 'Contacto', 'Contact', 'contacto'],
]

const contactUrl = language => {
  const subject = language === 'en' ? 'Contact from your portfolio' : 'Contacto desde tu portafolio'
  const body = language === 'en'
    ? 'Hello Alcindo, I visited your portfolio and would like to contact you.'
    : 'Hola Alcindo, visité tu portafolio y me gustaría ponerme en contacto contigo.'
  return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(profile.email)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

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
  const deploymentAvailable = Boolean(project.deploymentUrl)
  const deploymentButton = deploymentAvailable
    ? `<a class="deployment-button" href="${project.deploymentUrl}" target="_blank" rel="noreferrer" aria-label="Abrir despliegue de ${project.title}"><span>RUN_DEPLOYMENT</span></a>`
    : `<button class="deployment-button deployment-disabled" type="button" data-missing-deployment="${project.title}" aria-label="Despliegue de ${project.title} pendiente de configurar"><span>RUN_DEPLOYMENT</span></button>`
  const githubButton = repoAvailable
    ? `<a class="repo-button" href="${project.repoUrl}" target="_blank" rel="noreferrer" aria-label="Abrir repositorio de ${project.title}">${icon('github', 'size-6')}<span class="sr-only">Ver repositorio</span></a>`
    : `<button class="repo-button repo-disabled" type="button" data-missing-repo="${project.title}" aria-label="Repositorio de ${project.title} pendiente de configurar">${icon('github', 'size-6')}<span class="sr-only">Agregar repositorio</span></button>`

  return `<article class="project-card reveal ${index % 2 ? 'project-reverse' : ''}" data-project-index="${index}">
    <div class="project-preview ${project.previewImage ? 'project-preview-image' : ''}">${project.previewImage
      ? `<img class="project-screenshot" src="${project.previewImage}" alt="${project.previewAlt}" loading="lazy">`
      : projectVisual(project.type)}</div>
    <div class="project-copy">
      <div class="project-meta"><span>▧ PROJECT_MODULE // ${project.code}</span>${repoAvailable ? icon('external', 'size-4') : ''}</div>
      <h3 class="project-title">${project.title}</h3>
      <p class="project-description">${project.description}</p>
      <ul>${project.stack.map(item => `<li>${item}</li>`).join('')}</ul>
      <div class="project-actions">${deploymentButton}${githubButton}</div>
    </div>
  </article>`
}

document.querySelector('#app').innerHTML = `
  <div class="noise" aria-hidden="true"></div>
  <header class="nav-shell">
    <a class="brand" href="#inicio" aria-label="Ir al inicio"><span>&gt;_</span> DEV</a>
    <button class="menu-button" type="button" aria-expanded="false" aria-controls="main-nav" aria-label="Abrir menú"><i></i><i></i><i></i></button>
    <nav id="main-nav">${navItems.map(([n, label, , id]) => `<a href="#${id}" data-section="${id}"><span>${n}.</span><b>${label}</b></a>`).join('')}</nav>
  </header>
  <div class="top-controls">
    <button class="language-toggle" type="button" aria-label="Cambiar a inglés" title="English">${icon('translate', 'size-5')}<span>EN</span></button>
    <button class="theme-toggle" type="button" aria-label="Activar tema claro" aria-pressed="false">
      <span class="theme-sun">${icon('sun', 'size-4')}</span>
      <span class="theme-moon">${icon('moon', 'size-4')}</span>
    </button>
  </div>

  <aside class="social-rail" aria-label="Redes sociales">
    ${socialLink(profile.githubUrl, 'github', 'GitHub')}
    ${socialLink(profile.linkedinUrl, 'linkedin', 'LinkedIn')}
    <a class="social-link email-action" href="${contactUrl('es')}" target="_blank" rel="noreferrer" aria-label="Escribir correo electrónico">${icon('mail')}</a>
    <i></i>
  </aside>
  <aside class="email-rail"><a class="email-action" href="${contactUrl('es')}" target="_blank" rel="noreferrer">${profile.email}</a><i></i></aside>

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
        <figure class="profile-photo reveal"><img src="/alcindo-chavarria.webp" alt="Retrato de Alcindo Chavarría" loading="lazy"></figure>
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
      <div class="contact-inner reveal"><p>06. ¿Qué sigue?</p><h2>Construyamos algo<br><span>que valga la pena.</span></h2><p>Estoy abierto a nuevas oportunidades y colaboraciones. Si tienes una idea o proyecto, conversemos.</p><a class="primary-button contact-button email-action" href="${contactUrl('es')}" target="_blank" rel="noreferrer">${icon('mail', 'size-4')} <span>Iniciar contacto</span></a></div>
      <footer><div>${socialLink(profile.githubUrl, 'github', 'GitHub')}${socialLink(profile.linkedinUrl, 'linkedin', 'LinkedIn')}<a class="social-link email-action" href="${contactUrl('es')}" target="_blank" rel="noreferrer" aria-label="Escribir correo electrónico">${icon('mail')}</a></div><p>Diseñado y construido por ${profile.name} — 2026</p><small><i></i> System Status: Operational</small></footer>
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

const translations = {
  es: {
    pageTitle: 'Alcindo Chavarría | Desarrollador Full Stack',
    pageDescription: 'Portafolio de Alcindo Chavarría, desarrollador Full Stack y estudiante de Ingeniería en Informática.',
    heroBadge: 'Modern Full-Stack Development',
    heroTitle: 'Desarrollo Full Stack rápido e impecable.',
    heroCopy: 'Convierto ideas únicas en productos y experiencias digitales totalmente funcionales y de vanguardia.',
    viewProjects: 'Ver Proyectos',
    sections: ['Sobre mí', 'Skills', 'Experiencia', 'Proyectos', 'Certificados'],
    about: [
      `Hola, soy <strong>${profile.name}</strong>, estudiante de Ingeniería en Informática y desarrollador enfocado en crear aplicaciones web, APIs y soluciones basadas en microservicios.`,
      'Trabajo principalmente con Java, Spring Boot, JavaScript y tecnologías cloud. Me interesa transformar requisitos reales en software claro, seguro y mantenible.',
    ],
    technologies: 'Tecnologías con las que he trabajado',
    skills: [
      ['Frontend Development', 'Intermedio'], ['Backend Development', 'Intermedio'], ['DevOps & Cloud', 'Intermedio'],
      ['Arquitectura de Software', 'Intermedio'], ['Desarrollo Móvil', 'Intermedio'], ['Bases de Datos', 'Intermedio'],
      ['Testing & Calidad de Software', 'Intermedio'], ['Integración Continua & Despliegue (CI/CD)', 'Intermedio'],
    ],
    experienceTitle: 'Desarrollo de proyectos <span>@ Académicos y personales</span>',
    experienceDate: '2024 — Actualidad',
    experience: [
      'Desarrollo APIs RESTful y microservicios con Java, Spring Boot, C# y ASP.NET Core.',
      'Construyo interfaces responsive con React y Angular integradas con servicios backend.',
      'Diseño bases de datos relacionales y NoSQL con PostgreSQL, Oracle, MySQL, Firebase y MongoDB.',
      'Aplico Git, integración continua, Docker y prácticas de desarrollo seguro.',
    ],
    projects: [
      ['Pedidos360', 'Tienda responsive de videojuegos con catálogo, búsqueda, carrito, checkout, historial de pedidos y autenticación local o social.'],
      ['Pedidos360 API', 'API REST modular para autenticación, usuarios, productos, carrito, pagos y pedidos, con seguridad JWT y documentación Swagger.'],
      ['Mega-Pokedex', 'Pokédex interactiva de las 48 megaevoluciones, con búsqueda, filtros por tipo, fichas detalladas, animaciones y datos sincronizados desde PokéAPI.'],
      ['Perfulandia', 'Ecosistema de microservicios para ventas, usuarios, productos, inventario, pagos, órdenes, envíos y notificaciones.'],
      ['BookReview App', 'Aplicación para descubrir, calificar y reseñar libros, con perfiles de usuario y una experiencia de lectura ordenada.'],
      ['Microservicio de Usuarios', 'Servicio de identidad y gestión de usuarios con autenticación JWT, documentación Swagger y persistencia segura.'],
      ['Backend Adopción de Mascotas', 'API para administrar mascotas, solicitudes de adopción y perfiles, conectada a una base de datos en la nube.'],
      ['Level-Up Gamer Mobile', 'Aplicación Android para explorar el catálogo gamer, consultar productos y consumir servicios remotos.'],
      ['Zona Futbolera', 'Modelo de datos y lógica de negocio para administrar equipos, jugadores, encuentros y estadísticas deportivas.'],
      ['Usuario Service MySQL', 'Microservicio documentado para crear y consultar usuarios, con validaciones, capas y persistencia relacional.'],
      ['Portal con Microsoft Entra ID', 'Frontend empresarial protegido con inicio de sesión, control de acceso y sesión mediante identidad de Microsoft.'],
    ],
    repoOpen: 'Ver repositorio', repoAdd: 'Agregar repositorio', deploymentOpen: 'Abrir proyecto desplegado', deploymentAdd: 'Agregar despliegue', viewAll: 'Ver todos los proyectos', backHome: '← Volver al inicio',
    allProjectsTitle: 'Todos los <span>Proyectos</span>',
    allProjectsCopy: 'Explora los proyectos que he desarrollado. Cada uno incluye una descripción de su objetivo, tecnologías utilizadas y acceso al repositorio cuando esté disponible.',
    certificates: ['AWS Academy Cloud Foundations', 'Desarrollo Full Stack', 'Ingeniería DevOps', 'Ciberseguridad Defensiva'],
    contactEyebrow: '06. ¿Qué sigue?', contactTitle: 'Construyamos algo<br><span>que valga la pena.</span>',
    contactCopy: 'Estoy abierto a nuevas oportunidades y colaboraciones. Si tienes una idea o proyecto, conversemos.',
    contactButton: 'Iniciar contacto', footer: `Diseñado y construido por ${profile.name} — 2026`, status: 'System Status: Operational',
    menuOpen: 'Abrir menú', menuClose: 'Cerrar menú', themeLight: 'Activar tema claro', themeDark: 'Activar tema oscuro',
    language: 'Cambiar a inglés', languageTitle: 'English', languageCode: 'EN', photoAlt: `Retrato de ${profile.name}`,
    missingRepo: 'Falta agregar la URL del repositorio', missingDeployment: 'Falta agregar la URL del despliegue',
    certificateUi: { previewPending: 'Vista previa pendiente', previewHelp: 'Agrega el PDF o imagen en <code>public/certificados</code> y configura <code>previewUrl</code> en <code>src/data/portfolio.js</code>.', missingCredential: 'Falta agregar el enlace oficial de' },
  },
  en: {
    pageTitle: 'Alcindo Chavarría | Full Stack Developer',
    pageDescription: 'Portfolio of Alcindo Chavarría, Full Stack developer and Computer Engineering student.',
    heroBadge: 'Modern Full-Stack Development', heroTitle: 'Fast, flawless Full Stack development.',
    heroCopy: 'I turn unique ideas into fully functional, cutting-edge digital products and experiences.', viewProjects: 'View Projects',
    sections: ['About me', 'Skills', 'Experience', 'Projects', 'Certificates'],
    about: [
      `Hello, I am <strong>${profile.name}</strong>, a Computer Engineering student and developer focused on building web applications, APIs, and microservices-based solutions.`,
      'I primarily work with Java, Spring Boot, JavaScript, and cloud technologies. I enjoy transforming real requirements into clear, secure, and maintainable software.',
    ],
    technologies: 'Technologies I have worked with',
    skills: [
      ['Frontend Development', 'Intermediate'], ['Backend Development', 'Intermediate'], ['DevOps & Cloud', 'Intermediate'],
      ['Software Architecture', 'Intermediate'], ['Mobile Development', 'Intermediate'], ['Databases', 'Intermediate'],
      ['Software Testing & Quality', 'Intermediate'], ['Continuous Integration & Deployment (CI/CD)', 'Intermediate'],
    ],
    experienceTitle: 'Project development <span>@ Academic and personal</span>', experienceDate: '2024 — Present',
    experience: [
      'I develop RESTful APIs and microservices with Java, Spring Boot, C#, and ASP.NET Core.',
      'I build responsive React and Angular interfaces integrated with backend services.',
      'I design relational and NoSQL databases with PostgreSQL, Oracle, MySQL, Firebase, and MongoDB.',
      'I apply Git, continuous integration, Docker, and secure development practices.',
    ],
    projects: [
      ['Pedidos360', 'Responsive video game store with catalog, search, cart, checkout, order history, and local or social authentication.'],
      ['Pedidos360 API', 'Modular REST API for authentication, users, products, cart, payments, and orders, with JWT security and Swagger documentation.'],
      ['Mega-Pokedex', 'Interactive Pokédex featuring all 48 Mega Evolutions, with search, type filters, detailed profiles, animations, and data synchronized from PokéAPI.'],
      ['Perfulandia', 'Microservices ecosystem for sales, users, products, inventory, payments, orders, shipping, and notifications.'],
      ['BookReview App', 'Application for discovering, rating, and reviewing books, with user profiles and an organized reading experience.'],
      ['User Microservice', 'Identity and user management service with JWT authentication, Swagger documentation, and secure persistence.'],
      ['Pet Adoption Backend', 'API for managing pets, adoption requests, and profiles, connected to a cloud database.'],
      ['Level-Up Gamer Mobile', 'Android application for browsing the gaming catalog, viewing products, and consuming remote services.'],
      ['Football Zone', 'Data model and business logic for managing teams, players, matches, and sports statistics.'],
      ['MySQL User Service', 'Documented microservice for creating and retrieving users, with validations, layers, and relational persistence.'],
      ['Microsoft Entra ID Portal', 'Protected enterprise frontend with sign-in, access control, and session management through Microsoft identity.'],
    ],
    repoOpen: 'View repository', repoAdd: 'Add repository', deploymentOpen: 'Open deployed project', deploymentAdd: 'Add deployment', viewAll: 'View all projects', backHome: '← Back to home',
    allProjectsTitle: 'All <span>Projects</span>',
    allProjectsCopy: 'Explore the projects I have developed. Each one includes its purpose, technologies used, and repository access when available.',
    certificates: ['AWS Academy Cloud Foundations', 'Full Stack Development', 'DevOps Engineering', 'Defensive Cybersecurity'],
    contactEyebrow: '06. What is next?', contactTitle: 'Let’s build something<br><span>worthwhile.</span>',
    contactCopy: 'I am open to new opportunities and collaborations. If you have an idea or a project, let’s talk.',
    contactButton: 'Start a conversation', footer: `Designed and built by ${profile.name} — 2026`, status: 'System Status: Operational',
    menuOpen: 'Open menu', menuClose: 'Close menu', themeLight: 'Switch to light theme', themeDark: 'Switch to dark theme',
    language: 'Cambiar a español', languageTitle: 'Español', languageCode: 'ES', photoAlt: `Portrait of ${profile.name}`,
    missingRepo: 'Repository URL still needs to be added', missingDeployment: 'Deployment URL still needs to be added',
    certificateUi: { previewPending: 'Preview pending', previewHelp: 'Add the PDF or image to <code>public/certificados</code> and set <code>previewUrl</code> in <code>src/data/portfolio.js</code>.', missingCredential: 'Official credential link still needs to be added for' },
  },
}

let currentLanguage = localStorage.getItem('portfolio-language') === 'en' ? 'en' : 'es'

function applyLanguage(language) {
  currentLanguage = language
  const copy = translations[language]
  document.documentElement.lang = language
  document.title = copy.pageTitle
  document.querySelector('meta[name="description"]').setAttribute('content', copy.pageDescription)
  document.querySelectorAll('#main-nav a').forEach((link, index) => { link.querySelector('b').textContent = navItems[index][language === 'en' ? 2 : 1] })
  document.querySelector('.brand').setAttribute('aria-label', language === 'en' ? 'Go to home' : 'Ir al inicio')
  document.querySelector('.hero-badge span').textContent = copy.heroBadge
  document.querySelector('.hero h1').textContent = copy.heroTitle
  document.querySelector('.hero-copy').textContent = copy.heroCopy
  document.querySelector('.hero-actions .primary-button').lastChild.textContent = ` ${copy.viewProjects}`
  document.querySelectorAll('.section-title h2').forEach((title, index) => { title.textContent = copy.sections[index] })
  const aboutParagraphs = document.querySelectorAll('.about-copy > p')
  aboutParagraphs.forEach((paragraph, index) => { paragraph.innerHTML = copy.about[index] })
  document.querySelector('.about-copy h3').textContent = copy.technologies
  document.querySelector('.profile-photo img').setAttribute('alt', copy.photoAlt)
  document.querySelectorAll('.skill-card').forEach((card, index) => { card.querySelector('h3').textContent = copy.skills[index][0]; card.querySelector('small').textContent = copy.skills[index][1] })
  document.querySelector('.experience-head h3').innerHTML = copy.experienceTitle
  document.querySelector('.experience-head time').textContent = copy.experienceDate
  document.querySelectorAll('.experience > ul li').forEach((item, index) => { item.textContent = copy.experience[index] })
  document.querySelectorAll('.project-card').forEach(card => {
    const projectIndex = Number(card.dataset.projectIndex)
    const project = copy.projects[projectIndex]
    card.querySelector('.project-title').textContent = project[0]
    card.querySelector('.project-description').textContent = project[1]
    const repoButton = card.querySelector('.repo-button')
    const repoLabel = repoButton?.querySelector('.sr-only')
    const repoMissing = repoButton?.classList.contains('repo-disabled')
    if (repoLabel) repoLabel.textContent = repoMissing ? copy.repoAdd : copy.repoOpen
    if (repoButton) repoButton.setAttribute('aria-label', `${repoMissing ? copy.repoAdd : copy.repoOpen}: ${project[0]}`)
    if (repoMissing) repoButton.dataset.missingRepo = project[0]
    const deploymentButton = card.querySelector('.deployment-button')
    const deploymentMissing = deploymentButton?.classList.contains('deployment-disabled')
    if (deploymentButton) deploymentButton.setAttribute('aria-label', `${deploymentMissing ? copy.deploymentAdd : copy.deploymentOpen}: ${project[0]}`)
    if (deploymentMissing) deploymentButton.dataset.missingDeployment = project[0]
    const screenshot = card.querySelector('.project-screenshot')
    if (screenshot) screenshot.setAttribute('alt', language === 'en' ? `${project[0]} project preview` : `Vista previa del proyecto ${project[0]}`)
    if (projectIndex === 5) card.querySelector('.swagger-head span').textContent = language === 'en' ? 'USERS' : 'USUARIOS'
    if (projectIndex === 6) card.querySelector('.generic-title').textContent = language === 'en' ? 'FIND A COMPANION' : 'ENCUENTRA UN COMPAÑERO'
    if (projectIndex === 8) {
      card.querySelector('.generic-title').textContent = language === 'en' ? 'FOOTBALL ZONE' : 'ZONA FUTBOLERA'
      const scoreLabels = card.querySelectorAll('.score-board span')
      scoreLabels[0].textContent = language === 'en' ? 'HOME' : 'LOCAL'
      scoreLabels[1].textContent = language === 'en' ? 'AWAY' : 'VISITA'
    }
    if (projectIndex === 10) {
      card.querySelector('.generic-title').textContent = language === 'en' ? 'SECURE IDENTITY' : 'IDENTIDAD SEGURA'
      card.querySelector('.identity-lock span').textContent = language === 'en' ? 'Access granted' : 'Acceso autorizado'
    }
  })
  document.querySelector('.projects-section .projects-more a').textContent = copy.viewAll
  document.querySelectorAll('.back-link, .all-projects .projects-more a').forEach(link => { link.textContent = copy.backHome })
  document.querySelector('.all-projects-heading h1').innerHTML = copy.allProjectsTitle
  document.querySelector('.all-projects-heading p').textContent = copy.allProjectsCopy
  document.querySelectorAll('.cert-card').forEach((card, index) => {
    card.querySelector('h3').textContent = copy.certificates[index]
    const eye = card.querySelector('[data-preview-cert]')
    const external = card.querySelector('[data-verify-cert]')
    eye.title = language === 'en' ? 'View certificate' : 'Ver certificado'
    eye.setAttribute('aria-label', `${eye.title}: ${copy.certificates[index]}`)
    external.title = language === 'en' ? 'Open validation' : 'Abrir validación'
    external.setAttribute('aria-label', `${external.title}: ${copy.certificates[index]}`)
  })
  const contact = document.querySelector('.contact-inner')
  contact.querySelector(':scope > p:first-child').textContent = copy.contactEyebrow
  contact.querySelector('h2').innerHTML = copy.contactTitle
  contact.querySelector(':scope > p:not(:first-child)').textContent = copy.contactCopy
  contact.querySelector('.contact-button span').textContent = copy.contactButton
  document.querySelector('footer > p').textContent = copy.footer
  document.querySelector('footer small').innerHTML = `<i></i> ${copy.status}`
  document.querySelectorAll('.email-action').forEach(link => { link.href = contactUrl(language); link.setAttribute('aria-label', language === 'en' ? 'Write an email' : 'Escribir correo electrónico') })
  document.querySelector('.language-toggle span').textContent = copy.languageCode
  document.querySelector('.language-toggle').setAttribute('aria-label', copy.language)
  document.querySelector('.language-toggle').title = copy.languageTitle
  document.querySelector('.certificate-dialog .dialog-heading > span').textContent = language === 'en' ? 'VERIFICATION // CERTIFICATE_VIEWER' : 'VERIFICACIÓN // CERTIFICATE_VIEWER'
  document.querySelector('.dialog-verify').lastChild.textContent = language === 'en' ? ' View official credential' : ' Ver credencial oficial'
  document.querySelector('.dialog-close').setAttribute('aria-label', language === 'en' ? 'Close certificate' : 'Cerrar certificado')
  localStorage.setItem('portfolio-language', language)
}

const menuButton = document.querySelector('.menu-button')
const nav = document.querySelector('#main-nav')
const navLinks = [...nav.querySelectorAll('a')]
const languageToggle = document.querySelector('.language-toggle')
const themeToggle = document.querySelector('.theme-toggle')
const themeColor = document.querySelector('meta[name="theme-color"]')

function applyTheme(theme) {
  const isLight = theme === 'light'
  document.documentElement.dataset.theme = theme
  themeToggle.setAttribute('aria-pressed', String(isLight))
  const copy = translations[currentLanguage]
  themeToggle.setAttribute('aria-label', isLight ? copy.themeDark : copy.themeLight)
  themeColor.setAttribute('content', isLight ? '#f4f7fb' : '#020617')
}

applyLanguage(currentLanguage)
applyTheme(document.documentElement.dataset.theme || 'dark')
languageToggle.addEventListener('click', () => {
  applyLanguage(currentLanguage === 'es' ? 'en' : 'es')
  applyTheme(document.documentElement.dataset.theme || 'dark')
})
themeToggle.addEventListener('click', () => {
  const nextTheme = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light'
  applyTheme(nextTheme)
  localStorage.setItem('portfolio-theme', nextTheme)
})

function setMenu(open) {
  menuButton.classList.toggle('open', open)
  nav.classList.toggle('open', open)
  menuButton.setAttribute('aria-expanded', String(open))
  const copy = translations[currentLanguage]
  menuButton.setAttribute('aria-label', open ? copy.menuClose : copy.menuOpen)
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
  showToast(`${translations[currentLanguage].missingRepo}: ${button.dataset.missingRepo}`)
}))

document.querySelectorAll('[data-missing-deployment]').forEach(button => button.addEventListener('click', () => {
  showToast(`${translations[currentLanguage].missingDeployment}: ${button.dataset.missingDeployment}`)
}))

setupCertificates(certificates, showToast, () => translations[currentLanguage].certificateUi)
