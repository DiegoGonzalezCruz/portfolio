import { useSyncExternalStore } from "react";

export type Theme = "light" | "dark";

const STORAGE_KEY = "theme";

function readTheme(): Theme {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}

/** The resolved theme on the client; `null` during SSR and hydration. */
export function useResolvedTheme(): Theme | null {
  return useSyncExternalStore(subscribe, readTheme, () => null);
}

/**
 * Flip the theme. The choice is only persisted when it differs from the
 * system preference, so picking the system theme again goes back to following it.
 */
export function toggleTheme() {
  const next: Theme = readTheme() === "dark" ? "light" : "dark";
  const system: Theme = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
  try {
    if (next === system) localStorage.removeItem(STORAGE_KEY);
    else localStorage.setItem(STORAGE_KEY, next);
  } catch {
    // Storage blocked (private mode etc.): the toggle still works for this page view.
  }
  document.documentElement.dataset.theme = next;
}
