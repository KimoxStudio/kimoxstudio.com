import '../blog.css';
import { notFound } from 'next/navigation';
import { getAllPosts, getPost } from '../../../lib/posts';
import BlogPostClient from '../../../components/BlogPostClient';

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: `${post.title?.es || post.slug} — Kimox Studio`,
    description: post.excerpt?.es,
  };
}

export default async function Page({ params }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  return <BlogPostClient post={post} />;
}
