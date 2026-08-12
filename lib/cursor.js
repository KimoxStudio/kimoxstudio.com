'use client';

import { useEffect } from 'react';

// Last known pointer position, shared across route changes. #cursor and its
// companions live in the root layout, so when one page's hook hands over to
// another's the new hook can pick up where the pointer already is instead of
// waiting for the next mousemove (which made the cursor blink out on click-
// through navigations, e.g. landing → /blog).
let lastX = null;
let lastY = null;

// Incremented on every hook mount so a hook can tell whether it is still the
// one driving the cursor. React may run the outgoing page's cleanup after the
// incoming page's effect; without this guard the old cleanup wipes the new
// hook's state.
let cursorOwner = 0;

// Restores `hover` sizing right after a handover, since `mouseover` won't fire
// again until the pointer actually moves.
function hoverAtPointer(selector) {
  if (lastX == null || lastY == null) return false;
  const el = document.elementFromPoint(lastX, lastY);
  return !!(el && el.closest && el.closest(selector));
}

export function useSmoothCursor() {
  useEffect(() => {
    const c = document.getElementById('cursor');
    const ring = document.getElementById('cursor-ring');
    if (!c || !ring) return;
    const id = ++cursorOwner;
    let mx = lastX ?? innerWidth / 2,
      my = lastY ?? innerHeight / 2;
    let rx = mx,
      ry = my;
    let revealed = false;

    const reveal = () => {
      revealed = true;
      c.classList.add('ready');
      ring.classList.add('ready');
    };

    const onMove = (e) => {
      mx = lastX = e.clientX;
      my = lastY = e.clientY;
      c.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%,-50%)`;
      if (!revealed) reveal();
    };

    if (lastX != null && lastY != null) {
      c.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%,-50%)`;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%,-50%)`;
      const hovering = hoverAtPointer('a, button, input, textarea, [data-hover]');
      c.classList.toggle('hover', hovering);
      ring.classList.toggle('hover', hovering);
      reveal();
    }
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
      // #cursor / #cursor-ring are mounted once in the root layout and persist
      // across client-side route changes. Without resetting the classes/transform
      // this hook applied, they stay frozen mid-page (still `.ready`, last known
      // position) on whichever route mounts next — including routes that don't
      // manage #cursor-ring at all (e.g. useBlogCursor), leaving a permanent stray
      // artifact. Reset to the same off-screen/hidden state as a fresh page load.
      // Skip the reset when another hook has already taken over, or we'd blank
      // out the cursor the incoming page just set up.
      if (cursorOwner !== id) return;
      c.classList.remove('ready', 'hover', 'click');
      ring.classList.remove('ready', 'hover');
      c.style.transform = 'translate3d(-100px,-100px,0)';
      ring.style.transform = 'translate3d(-100px,-100px,0)';
    };
  }, []);
}

export function useBlogCursor() {
  useEffect(() => {
    const c = document.getElementById('cursor');
    const tr = document.getElementById('cursor-trail');
    if (!c || !tr) return;
    const id = ++cursorOwner;
    let mx = lastX ?? innerWidth / 2,
      my = lastY ?? innerHeight / 2,
      tx = mx,
      ty = my;
    let revealed = false;
    const reveal = () => {
      revealed = true;
      c.classList.add('ready');
      tr.classList.add('ready');
    };
    const onMove = (e) => {
      mx = lastX = e.clientX;
      my = lastY = e.clientY;
      c.style.transform = `translate(${mx}px, ${my}px) translate(-50%,-50%)`;
      if (!revealed) reveal();
    };

    if (lastX != null && lastY != null) {
      c.style.transform = `translate(${mx}px, ${my}px) translate(-50%,-50%)`;
      tr.style.transform = `translate(${tx}px, ${ty}px) translate(-50%,-50%)`;
      const hovering = hoverAtPointer('a, button, [data-hover]');
      c.classList.toggle('hover', hovering);
      tr.classList.toggle('hover', hovering);
      reveal();
    }
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
      // Same reasoning as useSmoothCursor's cleanup: #cursor / #cursor-trail
      // persist across route changes, so reset them on unmount instead of
      // leaving a frozen artifact for whatever page mounts next — unless
      // another hook already owns the cursor.
      if (cursorOwner !== id) return;
      c.classList.remove('ready', 'hover');
      tr.classList.remove('ready', 'hover');
      c.style.transform = 'translate(-100px,-100px) translate(-50%,-50%)';
      tr.style.transform = 'translate(-100px,-100px) translate(-50%,-50%)';
    };
  }, []);
}
