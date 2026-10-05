import { getCollection } from 'astro:content';

// Opt-in is for local layout review only. Ordinary builds omit every draft.
export const writingPreview = import.meta.env.DEV || import.meta.env.WRITING_PREVIEW === '1';

export async function getWritingPosts() {
  const posts = await getCollection('writing');
  const slugs = new Set<string>();
  for (const { data } of posts) {
    if (slugs.has(data.slug)) throw new Error(`Duplicate writing slug: ${data.slug}`);
    slugs.add(data.slug);
  }
  return posts
    .filter(({ data }) => writingPreview || !data.draft)
    .sort((a, b) => b.data.publishedDate.localeCompare(a.data.publishedDate) || a.data.slug.localeCompare(b.data.slug));
}

export function formatWritingDate(date: string) {
  return new Intl.DateTimeFormat('en-AU', {
    day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC',
  }).format(new Date(`${date}T00:00:00Z`));
}
