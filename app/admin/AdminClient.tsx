"use client";

import { AdminApp, LoginForm, createApiClient } from "@kimoxstudio/admin";
import type { AdminApiClient } from "@kimoxstudio/admin";
import { useCallback, useEffect, useMemo, useState } from "react";
import { registry } from "@/kx/registry";

type AuthState = "checking" | "anonymous" | "authenticated";

/**
 * Client bootstrapper for the kimox-fw admin. Probes the variations endpoint
 * on mount: 401 (or any failure) -> render the login form; success -> the
 * admin app. `registry` is imported directly (never passed from a server
 * component — it exposes methods and is not RSC-serialisable).
 */
export function AdminClient() {
  const apiClient: AdminApiClient = useMemo(() => createApiClient(), []);
  const [auth, setAuth] = useState<AuthState>("checking");

  const probe = useCallback(async () => {
    try {
      await apiClient.listVariations();
      setAuth("authenticated");
    } catch {
      setAuth("anonymous");
    }
  }, [apiClient]);

  useEffect(() => {
    void probe();
  }, [probe]);

  if (auth === "checking") {
    return (
      <div
        style={{
          minHeight: "100dvh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
          color: "#6b7280",
        }}
      >
        Loading admin…
      </div>
    );
  }

  if (auth === "anonymous") {
    return (
      <div className="kx-admin-root" data-kx-admin-root="true">
        <LoginForm api={apiClient} onLoggedIn={() => setAuth("authenticated")} />
      </div>
    );
  }

  return (
    <AdminApp registry={registry} apiClient={apiClient} onLoggedOut={() => setAuth("anonymous")} />
  );
}
