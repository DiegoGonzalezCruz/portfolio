import Link from "next/link";
import { site } from "@/data/site";
import { LogoMark } from "./icons";
import { SocialLinks } from "./SocialLinks";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-10 md:flex-row md:justify-between md:px-6">
        <div className="flex items-center gap-3">
          <LogoMark className="size-8 text-accent" />
          <div>
            <p className="font-display font-semibold">Creating cool stuff since 👶🏻</p>
            <p className="text-sm text-muted">
              {site.tagline} · {site.location.city}, {site.location.regionName}
            </p>
            <p className="text-sm text-muted">
              © {new Date().getFullYear()} {site.name} ·{" "}
              <Link href="/privacy" className="underline-offset-4 hover:text-fg hover:underline">
                Privacy
              </Link>
            </p>
          </div>
        </div>
        <SocialLinks />
      </div>
    </footer>
  );
}
