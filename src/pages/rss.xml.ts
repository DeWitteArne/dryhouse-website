import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPosts, postUrl } from '@/lib/blog';

export async function GET(context: APIContext) {
  const posts = (await getPosts()).filter((p) => p.data.category === 'advies');
  return rss({
    title: 'Dryhouse blog',
    description: 'Advies over vocht in huis van de specialisten van Dryhouse.',
    site: context.site!,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: postUrl(post),
    })),
    customData: '<language>nl-BE</language>',
  });
}
