import type { ReactNode } from "react";
import "@kx/admin/styles.css";

// Admin styles are Tailwind scoped under `.kx-admin-root`, so importing them
// here cannot leak into the public site. Mounted at /kx-admin (not /admin,
// which the existing Decap CMS owns).
export default function KxAdminLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
