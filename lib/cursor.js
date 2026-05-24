'use client';

import { useEffect } from 'react';

export function useSmoothCursor() {
  useEffect(() => {
    const c = document.getElementById('cursor');
    const ring = document.getElementById('cursor-ring');
    if (!c || !ring) return;
    let mx = innerWidth / 2,
      my = innerHeight / 2;
    let rx = mx,
      ry = my;
    let revealed = false;

    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      c.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%,-50%)`;
      if (!revealed) {
        revealed = true;
        c.classList.add('ready');
        ring.classList.add('ready');
      }
    };
    const onDown = () => c.classList.add('click');
    const onUp = () => c.classList.remove('click');
    const onOver = (e) => {
      const a = e.target.closest && e.target.closest('a, button, input, textarea, [data-hover]');
      c.classList.toggle('hover', !!a);
      ring.classList.toggle('hover', !!a);
    };

    let raf;
    const tick = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%,-50%)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('mouseup', onUp);
    document.addEventListener('mouseover', onOver);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('mouseup', onUp);
      document.removeEventListener('mouseover', onOver);
    };
  }, []);
}

export function useBlogCursor() {
  useEffect(() => {
    const c = document.getElementById('cursor');
    const tr = document.getElementById('cursor-trail');
    if (!c || !tr) return;
    let mx = innerWidth / 2,
      my = innerHeight / 2,
      tx = mx,
      ty = my;
    let revealed = false;
    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      c.style.transform = `translate(${mx}px, ${my}px) translate(-50%,-50%)`;
      if (!revealed) {
        revealed = true;
        c.classList.add('ready');
        tr.classList.add('ready');
      }
    };
    const onOver = (e) => {
      const el = e.target.closest && e.target.closest('a, button, [data-hover]');
      c.classList.toggle('hover', !!el);
      tr.classList.toggle('hover', !!el);
    };
    let raf;
    const tick = () => {
      tx += (mx - tx) * 0.18;
      ty += (my - ty) * 0.18;
      tr.style.transform = `translate(${tx}px, ${ty}px) translate(-50%,-50%)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onOver);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
    };
  }, []);
}
