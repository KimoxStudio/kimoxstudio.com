import './blog.css';
import { getFeaturedAndOthers } from '../../lib/posts';
import BlogClient from '../../components/BlogClient';

export const metadata = {
  title: 'Blog — Kimox Studio',
  description:
    'Cuaderno del estudio: notas técnicas sobre desarrollo web, SEO, diseño de producto y migraciones.',
};

export default function Page() {
  const { featured, others } = getFeaturedAndOthers();
  return <BlogClient featured={featured} others={others} />;
}
