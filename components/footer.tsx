import Link from "next/link";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import { profile } from "@/lib/resume-data";

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="container mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-muted-foreground sm:flex-row">
        <p>
          © {new Date().getFullYear()} {profile.name}. Built with Next.js & care.
        </p>
        <ul className="flex items-center gap-3" aria-label="Social links">
          <li>
            <Link href={profile.socials.github} aria-label="GitHub" className="hover:text-foreground">
              <Github className="size-4" />
            </Link>
          </li>
          <li>
            <Link href={profile.socials.linkedin} aria-label="LinkedIn" className="hover:text-foreground">
              <Linkedin className="size-4" />
            </Link>
          </li>
          <li>
            <Link href={profile.socials.twitter} aria-label="Twitter" className="hover:text-foreground">
              <Twitter className="size-4" />
            </Link>
          </li>
          <li>
            <Link href={`mailto:${profile.email}`} aria-label="Email" className="hover:text-foreground">
              <Mail className="size-4" />
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}