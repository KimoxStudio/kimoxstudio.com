import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';

const POSTS_DIR = path.join(process.cwd(), 'content', 'posts');

function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { data: {}, content: raw };
  return { data: yaml.load(match[1]) || {}, content: match[2] };
}

export function getAllPosts() {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((file) => {
      const raw = fs.readFileSync(path.join(POSTS_DIR, file), 'utf8');
      const { data, content } = parseFrontmatter(raw);
      return {
        slug: data.slug || file.replace(/\.md$/, ''),
        ...data,
        content,
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getFeaturedAndOthers() {
  const all = getAllPosts();
  const featured = all.find((p) => p.featured) || all[0] || null;
  const others = all.filter((p) => p.slug !== featured?.slug);
  return { featured, others };
}

export function getPost(slug) {
  return getAllPosts().find((p) => p.slug === slug) || null;
}
