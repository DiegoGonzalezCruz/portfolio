import { navItems, site } from "@/data/site";
import { LogoMark } from "./icons";
import { ThemeToggle } from "./ThemeToggle";

export function NavBar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-canvas/70 backdrop-blur-md">
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-2 px-4 md:px-6"
      >
        <a
          href="#top"
          className="flex items-center gap-2 font-display text-lg font-bold tracking-tight"
        >
          <LogoMark className="size-6 text-accent" />
          {site.shortName}
        </a>
        <div className="flex items-center gap-1 sm:gap-2">
          <ul className="flex items-center text-sm font-medium sm:gap-2">
            {navItems.map((item) => (
              <li key={item.href} className={item.mobile ? undefined : "hidden sm:block"}>
                <a
                  href={item.href}
                  className="rounded-full px-2.5 py-2 text-muted transition-colors hover:bg-fg/5 hover:text-fg sm:px-3"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
