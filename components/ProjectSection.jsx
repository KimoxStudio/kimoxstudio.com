'use client';

import { useEffect, useRef } from 'react';

// Story row of the project page. A row that starts below the fold is armed
// (`data-armed`) and marked `data-in` the first time it scrolls into view;
// project.css hides armed rows and plays the entrance from `data-in`. A row
// already on screen is never armed, so nothing is hidden that the script has
// not taken responsibility for revealing. Attributes are set on the node
// directly (no state), so the server-rendered children never re-render.
export default function ProjectSection({ children, ...rest }) {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    // Only a row that starts below the fold is armed: one already painted must not be hidden after hydration.
    if (!node || node.getBoundingClientRect().top < window.innerHeight) return undefined;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          node.setAttribute('data-in', '');
          io.disconnect();
        }
      },
      // Reveal when the row's top crosses 80% of the viewport height, whatever the row's own height.
      { rootMargin: '0px 0px -20% 0px' },
    );
    node.setAttribute('data-armed', '');
    io.observe(node);
    return () => {
      io.disconnect();
      // Never leave a row hidden (armed) with no observer left to reveal it.
      if (!node.hasAttribute('data-in')) node.removeAttribute('data-armed');
    };
  }, []);

  return (
    <section ref={ref} {...rest}>
      {children}
    </section>
  );
}
