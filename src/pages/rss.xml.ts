import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { sitio } from '../../sitio.js';
import { absoluteUrl } from '../utils/url';

const escapar = (texto: string) =>
  texto
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

export const GET: APIRoute = async () => {
  const posts = (await getCollection('blog')).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );

  const items = posts
    .map((post) => {
      const url = absoluteUrl(`/articulos/${post.id}/`);
      return `<item>
        <title>${escapar(post.data.title)}</title>
        <link>${escapar(url)}</link>
        <guid isPermaLink="true">${escapar(url)}</guid>
        <pubDate>${post.data.pubDate.toUTCString()}</pubDate>
        <description>${escapar(post.data.description)}</description>
        <author>${escapar(post.data.author)}</author>
        <category>${escapar(post.data.category)}</category>
      </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapar(sitio.nombre)}</title>
    <link>${escapar(absoluteUrl('/'))}</link>
    <description>${escapar(sitio.descripcion)}</description>
    <language>${escapar(sitio.idioma)}</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${escapar(absoluteUrl('/rss.xml'))}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
