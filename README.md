# Mi Cuaderno Digital

Blog personal construido con [Astro](https://astro.build), Tailwind CSS y contenido en Markdown. Estética oscura, editorial y con textura de imprenta: rojo carmesí, arte pixelado y tipografía de cartel.

## Desarrollo

Requiere Node 22 o superior.

```sh
npm install
npm run dev
```

El servidor de desarrollo se abre en `http://localhost:4321/`.

Comandos disponibles:

| Comando           | Acción                                             |
| :---------------- | :------------------------------------------------- |
| `npm run dev`     | Servidor local en `localhost:4321`                 |
| `npm run build`   | Genera el sitio de producción en `./dist/`         |
| `npm run preview` | Previsualiza el build local                        |
| `npm run astro`   | Ejecuta la CLI de Astro (`add`, `check`, etc.)     |
| `npm run panel`   | Abre el panel para editar `sitio.js`               |

## Contenido

- La configuración global del blog vive en `sitio.js`: nombre, textos, menú, colores, categorías, newsletter y redes.
- Los artículos están en `src/content/posts/*.md`.
- Las imágenes y el arte SVG están en `public/img/`.
- Los estilos globales están en `src/styles/global.css`.
- Las fuentes están autoalojadas en `src/assets/fonts/` y se declaran en `src/styles/fonts.css`. No se carga nada desde Google Fonts: Open Sans (párrafos), Bebas Neue (titulares) y Space Mono (etiquetas).

## Enlaces y rutas

GitHub Pages publica los proyectos en un subdirectorio (`https://usuario.github.io/repositorio/`), no en la raíz del dominio. Para que los enlaces y assets funcionen en ambos casos:

- `src/utils/url.ts` expone `withBase()` (prefija el base path) y `absoluteUrl()` (URL absoluta para RSS, Open Graph y compartir).
- Usa `withBase('/ruta/')` en cualquier `href` o `src` interno nuevo.
- `astro.config.mjs` lee `SITE_URL` y `BASE_PATH` del entorno. En local se usa `/` como base, así que `npm run dev` y `npm run preview` funcionan en la raíz.
- En el CI, el workflow obtiene la URL y el base reales con `actions/configure-pages`.

## Despliegue en GitHub Pages

El repositorio incluye `.github/workflows/deploy.yml`, que compila y publica el sitio con GitHub Actions.

1. Sube el proyecto a GitHub.
2. Ve a **Settings → Pages**.
3. En **Source**, elige **GitHub Actions**.
4. Haz push a `master` (o lanza el workflow manualmente desde **Actions → Deploy to GitHub Pages → Run workflow**).

El workflow calcula automáticamente `SITE_URL` y `BASE_PATH` según el repositorio, ejecuta `npm ci` y `npm run build`, y publica `dist/`. No hace falta cambiar `sitio.js` para cada repositorio.

> Si usas un dominio propio o publicas en `usuario.github.io`, configura el dominio en **Settings → Pages**. `actions/configure-pages` seguirá generando las URLs correctas.

### Comprobación local del build con base path

```sh
SITE_URL=https://usuario.github.io BASE_PATH=/nombre-del-repo npm run build
npx serve dist
```

El resultado debe servirse en `http://localhost:3000/nombre-del-repo/`, con enlaces, imágenes y RSS apuntando al prefijo correcto.

## Estructura

```text
/
├── .github/workflows/deploy.yml
├── public/
│   ├── .nojekyll
│   └── img/
├── src/
│   ├── components/
│   ├── content/posts/
│   ├── layouts/
│   ├── pages/
│   ├── styles/
│   └── utils/url.ts
├── astro.config.mjs
└── sitio.js
```
