# Herrería XXXXXX — Sitio Web

Página web estática de una sola página para mostrar trabajos de herrería artesanal y recibir consultas de clientes.

---

## Estructura de archivos

```
Herrero/
├── index.html       ← Página principal (HTML + SEO completo)
├── styles.css       ← Estilos CSS (diseño responsive y moderno)
├── main.js          ← JavaScript (menú, filtros, formulario)
├── favicon.svg      ← Ícono del sitio
├── netlify.toml     ← Configuración de Netlify (headers, caché, redirects)
├── robots.txt       ← Instrucciones para robots de Google
├── sitemap.xml      ← Mapa del sitio para indexación
└── README.md        ← Este archivo
```

---

## Personalización ANTES de publicar

Buscar y reemplazar los siguientes valores en `index.html`:

| Texto a reemplazar          | Descripción                              |
|-----------------------------|------------------------------------------|
| `+54 XXX XXX-XXXX`          | Tu número de teléfono real               |
| `+54XXXXXXXXXX`             | Tu número de WhatsApp (solo dígitos)     |
| `54XXXXXXXXXX`              | Tu número en el JS (main.js también)     |
| `fabian@herreria.com`       | Tu email real                            |
| `Tu ciudad`                 | Tu ciudad                                |
| `Tu provincia`              | Tu provincia                             |
| `Tu dirección`              | Tu dirección del taller                  |
| `tu_usuario` (Instagram)    | Tu usuario de Instagram                  |
| `tu_pagina` (Facebook)      | Tu página de Facebook                    |
| `herrero-fabian.netlify.app`| Tu dominio final en Netlify              |

En `main.js`, línea de `const phone`:
```js
const phone = '54XXXXXXXXXX'; // Reemplazar con tu número real
```

---

## Publicar en Netlify (paso a paso)

### Opción A — Arrastrar carpeta (más fácil)
1. Ir a [https://app.netlify.com](https://app.netlify.com)
2. Crear cuenta gratuita (con email o GitHub)
3. En el Dashboard hacer clic en **"Add new site" → "Deploy manually"**
4. Arrastrar la carpeta `Herrero` completa al área indicada
5. Netlify genera una URL automática (ej: `https://amazing-herreria-123.netlify.app`)
6. Opcionalmente ir a **Site settings → Change site name** para personalizar la URL

### Opción B — Con GitHub (recomendado para actualizaciones)
1. Subir la carpeta a un repositorio de GitHub
2. En Netlify: **"Add new site" → "Import an existing project"**
3. Conectar con GitHub y seleccionar el repositorio
4. Branch: `main`, Publish directory: `.` (raíz)
5. Deploy. Cada `git push` actualiza el sitio automáticamente.

---

## Recibir consultas del formulario

El formulario usa **Netlify Forms** (gratis hasta 100 envíos/mes):
- Se activa automáticamente porque el `<form>` tiene `data-netlify="true"`
- Las consultas llegan a **Netlify → Site → Forms**
- Para recibir email con cada consulta: **Site settings → Forms → Notifications**

---

## SEO — Indexar en Google

Una vez publicado el sitio:

1. **Google Search Console**: [https://search.google.com/search-console](https://search.google.com/search-console)
   - Agregar propiedad con tu URL de Netlify
   - Verificar (método recomendado: meta tag HTML — Netlify lo permite)
   - Enviar el sitemap: `https://tu-sitio.netlify.app/sitemap.xml`

2. **Google Business Profile** (muy importante para búsquedas locales):
   - [https://business.google.com](https://business.google.com)
   - Crear o reclamar tu negocio con la misma categoría "Herrería"
   - Agregar la URL de tu sitio web

3. **Tiempo de indexación**: Google suele indexar en 1-7 días después de enviar el sitemap.

---

## Reemplazar imágenes de ejemplo

Las imágenes actuales son de Unsplash (de muestra). Para usar tus propias fotos:
1. Agregar tus fotos a la carpeta (ej: `foto-reja.jpg`)
2. En `index.html` reemplazar las URLs de Unsplash por los nombres de tus archivos
3. Usar fotos con buena luz y proporción aproximada 4:3

---

## Dominio personalizado (opcional)

Para tener `www.herreriafabian.com.ar` en vez de la URL de Netlify:
1. Comprar dominio en NIC.ar (`.com.ar`) o Namecheap/GoDaddy (`.com`)
2. En Netlify: **Site settings → Domain management → Add a domain**
3. Seguir instrucciones para apuntar los DNS

---

Hecho con HTML, CSS y JavaScript puro — sin dependencias ni frameworks.
