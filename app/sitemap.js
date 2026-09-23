import { getAllPosts } from '../lib/posts';

const BASE_URL = 'https://www.kimoxstudio.com';

export default function sitemap() {
  const posts = getAllPosts();
  const latestPostDate = posts[0]?.date ? new Date(posts[0].date) : new Date();

  return [
    {
      url: `${BASE_URL}/`,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: latestPostDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...posts.map((post) => ({
      url: `${BASE_URL}/blog/${post.slug}`,
      lastModified: post.date ? new Date(post.date) : undefined,
      changeFrequency: 'yearly',
      priority: 0.6,
    })),
  ];
}
