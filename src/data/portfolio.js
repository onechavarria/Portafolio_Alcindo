export const profile = {
  name: 'Alcindo Chavarría',
  role: 'Full Stack Developer',
  location: 'Chile',
  email: 'onechavito1615@gmail.com',
  githubUrl: 'https://github.com/onechavarria',
  linkedinUrl: 'https://www.linkedin.com/in/onechavarria',
}

export const skills = [
  { icon: 'layout', name: 'Frontend Development', level: 'Intermedio', progress: 76, color: 'emerald' },
  { icon: 'server', name: 'Sistemas Backend', level: 'Intermedio', progress: 84, color: 'pink' },
  { icon: 'cloud', name: 'DevOps & Cloud', level: 'En formación', progress: 68, color: 'blue' },
  { icon: 'settings', name: 'Diseño de Sistemas', level: 'Intermedio', progress: 72, color: 'emerald' },
  { icon: 'database', name: 'Bases de Datos', level: 'Intermedio', progress: 80, color: 'pink' },
]

// Pega la URL real del repositorio en repoUrl y la URL pública del proyecto en deploymentUrl.
export const projects = [
  {
    code: '0101',
    title: 'Biblioteca Spring Boot',
    type: 'biblioteca',
    description: 'Arquitectura de microservicios para gestionar catálogo, préstamos y usuarios, con automatización de integración continua.',
    stack: ['Java 21', 'Spring Boot', 'PostgreSQL', 'Docker', 'GitHub Actions'],
    deploymentUrl: '',
    repoUrl: '',
  },
  {
    code: '0110',
    title: 'Level-Up Gamer',
    type: 'gamer',
    description: 'Plataforma de comercio gamer con catálogo, autenticación, carrito, pedidos y contacto, integrada con servicios backend.',
    stack: ['React', 'Spring Boot', 'Firebase', 'Axios'],
    deploymentUrl: '',
    repoUrl: '',
  },
  {
    code: '0111',
    title: 'Mega-Pokedex',
    type: 'mega-pokedex',
    description: 'Pokédex interactiva de las 48 megaevoluciones, con búsqueda, filtros por tipo, fichas detalladas, animaciones y datos sincronizados desde PokéAPI.',
    stack: ['Vite', 'JavaScript ES Modules', 'CSS moderno', 'PokéAPI', 'ESLint'],
    previewImage: '/mega-pokedex.webp',
    previewAlt: 'Vista previa del proyecto Mega-Pokedex',
    deploymentUrl: 'https://megapokedex.alcindo.tech/',
    repoUrl: 'https://github.com/onechavarria/Mega-Pokedex',
  },
  {
    code: '1001',
    title: 'Perfulandia',
    type: 'perfulandia',
    description: 'Ecosistema de microservicios para ventas, usuarios, productos, inventario, pagos, órdenes, envíos y notificaciones.',
    stack: ['Java', 'Spring Boot', 'OpenAPI', 'Oracle'],
    deploymentUrl: '',
    repoUrl: '',
  },
  {
    code: '1010',
    title: 'BookReview App',
    type: 'books',
    description: 'Aplicación para descubrir, calificar y reseñar libros, con perfiles de usuario y una experiencia de lectura ordenada.',
    stack: ['C#', 'ASP.NET Core', 'SQL Server', 'Bootstrap'],
    deploymentUrl: '',
    repoUrl: '',
  },
  {
    code: '1011',
    title: 'Microservicio de Usuarios',
    type: 'users',
    description: 'Servicio de identidad y gestión de usuarios con autenticación JWT, documentación Swagger y persistencia segura.',
    stack: ['C#', 'ASP.NET Core', 'JWT', 'Swagger', 'SQL Server'],
    deploymentUrl: '',
    repoUrl: '',
  },
  {
    code: '1100',
    title: 'Backend Adopción de Mascotas',
    type: 'pets',
    description: 'API para administrar mascotas, solicitudes de adopción y perfiles, conectada a una base de datos en la nube.',
    stack: ['Node.js', 'Express', 'MongoDB Atlas', 'REST API'],
    deploymentUrl: '',
    repoUrl: '',
  },
  {
    code: '1101',
    title: 'Level-Up Gamer Mobile',
    type: 'mobile',
    description: 'Aplicación Android para explorar el catálogo gamer, consultar productos y consumir servicios remotos.',
    stack: ['Kotlin', 'Jetpack Compose', 'Retrofit', 'Android'],
    deploymentUrl: '',
    repoUrl: '',
  },
  {
    code: '1110',
    title: 'Zona Futbolera',
    type: 'football',
    description: 'Modelo de datos y lógica de negocio para administrar equipos, jugadores, encuentros y estadísticas deportivas.',
    stack: ['Oracle', 'PL/SQL', 'Data Modeling', 'SQL'],
    deploymentUrl: '',
    repoUrl: '',
  },
  {
    code: '1111',
    title: 'Usuario Service MySQL',
    type: 'service',
    description: 'Microservicio documentado para crear y consultar usuarios, con validaciones, capas y persistencia relacional.',
    stack: ['Java', 'Spring Boot', 'MySQL', 'Swagger'],
    deploymentUrl: '',
    repoUrl: '',
  },
  {
    code: '10000',
    title: 'Portal con Microsoft Entra ID',
    type: 'identity',
    description: 'Frontend empresarial protegido con inicio de sesión, control de acceso y sesión mediante identidad de Microsoft.',
    stack: ['Angular', 'TypeScript', 'MSAL', 'Microsoft Entra ID'],
    deploymentUrl: '',
    repoUrl: '',
  },
]

// Para activar los botones de cada certificado:
// previewUrl: archivo local en public/certificados, por ejemplo '/certificados/aws-cloud.pdf'
// verifyUrl: enlace público de validación emitido por la institución.
export const certificates = [
  { id: 'aws-cloud', title: 'AWS Academy Cloud Foundations', issuer: 'AWS Academy', year: '2025', previewUrl: '', verifyUrl: '' },
  { id: 'full-stack', title: 'Desarrollo Full Stack', issuer: 'Duoc UC', year: '2025', previewUrl: '', verifyUrl: '' },
  { id: 'devops', title: 'Ingeniería DevOps', issuer: 'Duoc UC', year: 'En curso · 2026', previewUrl: '', verifyUrl: '' },
  { id: 'ciberseguridad', title: 'Ciberseguridad Defensiva', issuer: 'Duoc UC', year: 'En curso · 2026', previewUrl: '', verifyUrl: '' },
]
