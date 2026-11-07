// Utilidades para respetar el `base` de Astro (GitHub Pages sirve los
// proyectos en /nombre-del-repo, no en la raíz del dominio).

const BASE = import.meta.env.BASE_URL || '/';

/**
 * Añade el base path a una ruta interna.
 * Las URLs externas, anclas y mailto se devuelven tal cual.
 */
export function withBase(path: string): string {
  if (!path) return BASE;
  if (
    /^(?:[a-z]+:)?\/\//i.test(path) ||
    path.startsWith('mailto:') ||
    path.startsWith('tel:') ||
    path.startsWith('data:') ||
    path.startsWith('#')
  ) {
    return path;
  }

  const base = BASE.endsWith('/') ? BASE.slice(0, -1) : BASE;

  // Evita duplicar el prefijo si la ruta ya lo trae.
  if (base && (path === base || path.startsWith(`${base}/`))) return path;

  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${base}${clean}` || '/';
}

/**
 * Convierte una ruta interna en una URL absoluta usando `site` + `base`.
 * Ideal para RSS, Open Graph y enlaces para compartir.
 */
export function absoluteUrl(path: string): string {
  const site = (import.meta.env.SITE || 'https://example.com').replace(/\/$/, '');
  return new URL(withBase(path), `${site}/`).href;
}
