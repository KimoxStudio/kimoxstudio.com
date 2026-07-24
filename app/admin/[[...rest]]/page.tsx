import { AdminClient } from "../AdminClient";

// Catch-all admin route — the admin is a single-page React app; every
// sub-path renders the same tree, with internal state driving the view.
export default function KxAdminPage() {
  return <AdminClient />;
}
