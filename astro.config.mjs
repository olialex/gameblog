// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import { sitio } from './sitio.js';

// En GitHub Pages el workflow inyecta SITE_URL y BASE_PATH.
// En local se usa la raíz para que `npm run dev` y `npm run preview`
// funcionen en http://localhost:4321/.
const normalizarBase = (valor) => {
  if (!valor || valor === '/') return '/';
  return `/${valor.replace(/^\/+|\/+$/g, '')}`;
};

const urlPublica = new URL(process.env.SITE_URL || sitio.url);
const site = process.env.SITE_URL || urlPublica.origin;
const base = normalizarBase(process.env.BASE_PATH || '/');

// https://astro.build/config
export default defineConfig({
  site,
  base,
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
