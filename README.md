# Portafolio Alcindo Chavarría

Portafolio responsive desarrollado con Node.js, npm, Vite y Tailwind CSS.

## Probar localmente

Abre una terminal dentro de la carpeta del proyecto y ejecuta:

```bash
npm install
npm run dev
```

Vite mostrará una dirección local, normalmente `http://localhost:5173`. Ábrela en el navegador. Los cambios se actualizan automáticamente al guardar.

## Enlaces de GitHub

Abre `src/data/portfolio.js` y pega la URL real de cada repositorio en la propiedad `repoUrl`. En ese mismo archivo puedes configurar tus perfiles de GitHub y LinkedIn.

La portada muestra seis proyectos destacados. El botón **Ver todos los proyectos** abre la colección completa de once proyectos y **Volver al inicio** regresa al portafolio principal.

## Certificados

1. Copia cada imagen o PDF real dentro de `public/certificados`.
2. Abre `src/data/portfolio.js`.
3. En cada certificado configura `previewUrl` y `verifyUrl`.

Ejemplo:

```javascript
{
  title: 'AWS Academy Cloud Foundations',
  previewUrl: '/certificados/aws-cloud.pdf',
  verifyUrl: 'https://enlace-oficial-de-la-credencial'
}
```

El botón con forma de ojo abre la vista previa dentro del portafolio y el botón de enlace externo abre la validación oficial.

## Preparar para Hostinger

```bash
npm run build
```

Después sube el contenido generado dentro de `dist` a la carpeta `public_html` de Hostinger.
