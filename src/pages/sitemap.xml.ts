import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async () => {
  const projects = await getCollection('work');
  const paths = [
    '/',
    '/work/',
    ...projects.sort((a, b) => a.data.order - b.data.order).map(({ id }) => `/work/${id}/`),
    '/lab/',
    '/about/',
  ];
  const urls = paths.map((path) => `  <url><loc>${new URL(path, 'https://micksfoundry.org')}</loc></url>`).join('\n');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
