"use client";

import { toggleTheme } from "@/lib/theme";
import { MoonIcon, SunIcon } from "./icons";

export function ThemeToggle() {
  // Both icons are rendered and swapped with CSS, so server and client markup
  // match no matter which theme the inline script picked.
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle light and dark theme"
      title="Toggle light and dark theme"
      className="grid size-9 place-items-center rounded-full text-muted transition-colors hover:bg-fg/5 hover:text-fg"
    >
      <SunIcon className="hidden size-5 dark:block" />
      <MoonIcon className="size-5 dark:hidden" />
    </button>
  );
}
