"use client";

import { useSyncExternalStore } from "react";

/**
 * Local copy of `@kimoxstudio/renderer/client`'s `createClientStore` /
 * `useClientStore` — a generic `useSyncExternalStore` wrapper with optional
 * localStorage persistence, no CMS/admin coupling whatsoever. Inlined here
 * as part of removing kimox-fw so `kx/stores.ts`'s `langStore` (the
 * language switcher shared across the independently-mounted homepage
 * template islands, still live post-removal) has no framework dependency.
 * Behavior is unchanged from the original.
 */

export interface ClientStoreOptions<T> {
  /** Persist to this localStorage key and rehydrate from it on the client. */
  key?: string;
  /** Storage override (tests, custom backends). Defaults to window.localStorage when available. */
  storage?: Pick<Storage, "getItem" | "setItem">;
  /** Serializer for persisted values. Defaults to JSON.stringify. */
  serialize?: (value: T) => string;
  /** Deserializer for persisted values. Defaults to JSON.parse. */
  deserialize?: (raw: string) => T;
}

export interface ClientStore<T> {
  get(): T;
  /** The initial value — what the server render and hydration pass see. */
  getServerSnapshot(): T;
  set(next: T | ((prev: T) => T)): void;
  subscribe(listener: () => void): () => void;
}

export function createClientStore<T>(initial: T, options: ClientStoreOptions<T> = {}): ClientStore<T> {
  const serialize = options.serialize ?? ((value: T) => JSON.stringify(value));
  const deserialize = options.deserialize ?? ((raw: string) => JSON.parse(raw) as T);
  const storage = options.storage ?? (typeof window !== "undefined" ? window.localStorage : undefined);
  const key = options.key;

  let value = initial;
  if (key && storage) {
    try {
      const raw = storage.getItem(key);
      if (raw !== null) value = deserialize(raw);
    } catch {
      // ignore malformed/unreadable storage
    }
  }

  const listeners = new Set<() => void>();

  return {
    get: () => value,
    getServerSnapshot: () => initial,
    set: (next) => {
      const resolved = typeof next === "function" ? (next as (prev: T) => T)(value) : next;
      if (Object.is(resolved, value)) return;
      value = resolved;
      if (key && storage) {
        try {
          storage.setItem(key, serialize(value));
        } catch {
          // ignore write failures (private browsing, quota, etc.)
        }
      }
      for (const listener of Array.from(listeners)) listener();
    },
    subscribe: (listener) => {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
  };
}

export function useClientStore<T>(store: ClientStore<T>): T {
  return useSyncExternalStore(store.subscribe, store.get, store.getServerSnapshot);
}
