import { useEffect, useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import logo from "@/assets/alineu-logo.jpg.asset.json";
import { CLINIC, NAV_LINKS } from "@/lib/clinic";
import { cn } from "@/lib/utils";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-shadow duration-300",
        scrolled ? "bg-background/95 shadow-[0_6px_24px_-18px_rgba(31,46,23,0.8)] backdrop-blur" : "bg-background/80 backdrop-blur",
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3 sm:px-5 lg:gap-4 lg:px-8">
        <a href="#top" className="flex min-w-0 items-center gap-2.5">
          <img
            src={logo.url}
            alt="AlineU Physiotherapy and Rehabilitation Center logo"
            className="h-9 w-9 shrink-0 rounded-xl object-contain sm:h-10 sm:w-10"
            width={40}
            height={40}
          />
          <span className="truncate font-[family-name:var(--font-display)] text-lg font-semibold tracking-tight text-foreground">
            AlineU
          </span>
        </a>

        <nav className="ml-auto hidden items-center gap-7 lg:flex" aria-label="Main">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-2 lg:ml-6">
          <a
            href="#book"
            className="inline-flex h-10 shrink-0 items-center justify-center whitespace-nowrap rounded-full bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-[0_10px_24px_-14px_rgba(31,46,23,0.9)] transition-transform hover:-translate-y-0.5 lg:px-5"
          >
            <span className="lg:hidden">Appointment</span>
            <span className="hidden lg:inline">Book an Appointment</span>
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border text-foreground lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <nav
          className="border-t border-border bg-background px-5 pb-5 pt-2 lg:hidden"
          aria-label="Mobile"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-2 py-3 text-base font-medium text-foreground transition-colors hover:bg-secondary"
            >
              {link.label}
            </a>
          ))}
          <a
            href={CLINIC.phoneHref}
            onClick={() => setOpen(false)}
            className="mt-2 flex items-center justify-center gap-2 rounded-full border border-border px-4 py-3 text-base font-semibold text-primary transition-colors hover:bg-secondary"
          >
            <Phone className="h-4 w-4" />
            {CLINIC.phoneDisplay}
          </a>
        </nav>
      ) : null}
    </header>
  );
}
