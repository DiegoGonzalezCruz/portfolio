import { site } from "@/data/site";
import { GitHubIcon, LinkedInIcon } from "./icons";

const links = [
  { label: "LinkedIn", href: site.links.linkedin, Icon: LinkedInIcon },
  { label: "GitHub", href: site.links.github, Icon: GitHubIcon },
];

export function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <ul className={`flex items-center gap-3 ${className}`}>
      {links.map(({ label, href, Icon }) => (
        <li key={label}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="grid size-10 place-items-center rounded-full border border-line text-muted transition-colors hover:border-accent/50 hover:text-fg"
          >
            <Icon className="size-[18px]" />
          </a>
        </li>
      ))}
    </ul>
  );
}
