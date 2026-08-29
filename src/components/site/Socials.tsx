import { Instagram, Linkedin, Youtube } from "lucide-react";
import { cn } from "@/lib/utils";

export const socials = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/damien-carri%C3%B3n-finesarts/",
    Icon: Linkedin,
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/channel/UCizS8W_xRn2N-7IKPluawRQ",
    Icon: Youtube,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/damien_carrion/",
    Icon: Instagram,
  },
];

export function Socials({ className, size = "md" }: { className?: string; size?: "sm" | "md" }) {
  return (
    <ul className={cn("flex items-center gap-3", className)}>
      {socials.map(({ label, href, Icon }) => (
        <li key={label}>
          <a
            href={href}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={label}
            title={label}
            className={cn(
              "paint-icon flex items-center justify-center rounded-full border border-border text-foreground",
              size === "md" ? "size-11" : "size-9",
            )}
          >
            <Icon className={size === "md" ? "size-4" : "size-3.5"} strokeWidth={1.5} />
          </a>
        </li>
      ))}
    </ul>
  );
}
