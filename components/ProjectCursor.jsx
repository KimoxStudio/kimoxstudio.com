'use client';

import { useBlogCursor } from '@/lib/cursor';

// The site hides the native pointer (globals.css `cursor: none`) and draws its
// own; the custom cursor only starts once a page runs this hook, like the blog
// pages do. Without it the pointer is invisible on this route.
export default function ProjectCursor() {
  useBlogCursor();
  return null;
}
