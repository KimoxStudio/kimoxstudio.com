'use client';

import Nav from './Nav';
import { useSmoothCursor } from '../lib/cursor';

// Nav for the Spanish-only service landing pages: section links point back to
// the home page (/#work, /#contact…) and there is no language switcher, since
// these pages have no /en or /ja version to switch to.
export default function ServiceNav() {
  useSmoothCursor();
  return <Nav lang="es" mode="service" hideLangSwitch />;
}
