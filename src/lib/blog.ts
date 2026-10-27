import { getCollection, type CollectionEntry } from 'astro:content';

export async function getPosts() {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

/** Posts keep the Wix URL pattern (/post/<slug>), so existing links and rankings carry over. */
export const postUrl = (post: CollectionEntry<'blog'>) => `/post/${post.id}`;

const dateFormat = new Intl.DateTimeFormat('nl-BE', { day: 'numeric', month: 'long', year: 'numeric' });
export const formatDate = (d: Date) => dateFormat.format(d);

/** Rough reading time in minutes (Dutch reads at ~220 words a minute). */
export const readingTime = (body = '') => Math.max(1, Math.round(body.split(/\s+/).length / 220));
