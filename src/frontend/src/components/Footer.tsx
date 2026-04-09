import { Link } from "@tanstack/react-router";
import { GraduationCap, Linkedin, Twitter, Youtube } from "lucide-react";

const footerLinks = [
  { label: "Courses", to: "/" },
  { label: "About", to: "/profile" },
  { label: "My Learning", to: "/dashboard" },
];

const socialLinks = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Youtube, href: "#", label: "YouTube" },
];

export function Footer() {
  const year = new Date().getFullYear();
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`;

  return (
    <footer
      className="bg-card border-t border-border mt-auto"
      data-ocid="footer"
    >
      <div className="container mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-xs">
                <GraduationCap className="size-4.5" />
              </div>
              <span className="font-display text-lg font-bold text-foreground">
                Mehar Singla
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Learn technical skills from an industry expert. Practical,
              project-based courses designed for real-world success.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex size-8 items-center justify-center rounded-full bg-muted hover:bg-primary hover:text-primary-foreground text-muted-foreground transition-smooth"
                >
                  <Icon className="size-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h4 className="font-display text-sm font-semibold text-foreground uppercase tracking-wider">
              Navigation
            </h4>
            <nav className="flex flex-col gap-2">
              {footerLinks.map(({ label, to }) => (
                <Link
                  key={to}
                  to={to}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* CTA */}
          <div className="flex flex-col gap-4">
            <h4 className="font-display text-sm font-semibold text-foreground uppercase tracking-wider">
              Start Learning
            </h4>
            <p className="text-sm text-muted-foreground">
              Join hundreds of students accelerating their technical careers
              with expert-led courses.
            </p>
            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-lg bg-accent text-accent-foreground hover:bg-accent/90 px-4 py-2 text-sm font-semibold transition-smooth w-fit"
              data-ocid="footer-cta"
            >
              Explore Courses
            </Link>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <span>© {year} Mehar Singla. All rights reserved.</span>
          <span>
            Built with love using{" "}
            <a
              href={caffeineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              caffeine.ai
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
