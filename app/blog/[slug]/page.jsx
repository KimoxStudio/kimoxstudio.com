import '../blog.css';
import { notFound } from 'next/navigation';
import { getAllPosts, getPost } from '../../../lib/posts';
import BlogPostClient from '../../../components/BlogPostClient';

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }) {
  const post = getPost(params.slug);
  if (!post) return {};
  return {
    title: `${post.title?.es || post.slug} — Kimox Studio`,
    description: post.excerpt?.es,
  };
}

export default function Page({ params }) {
  const post = getPost(params.slug);
  if (!post) notFound();
  return <BlogPostClient post={post} />;
}
