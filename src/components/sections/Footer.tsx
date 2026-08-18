import logo from "@/assets/alineu-logo.jpg.asset.json";
import { CLINIC, NAV_LINKS } from "@/lib/clinic";

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/50">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-3 lg:px-8">
        <div>
          <div className="flex items-center gap-2.5">
            <img
              src={logo.url}
              alt="AlineU Physio logo"
              className="h-10 w-10 rounded-xl object-contain"
              width={40}
              height={40}
              loading="lazy"
            />
            <span className="font-[family-name:var(--font-display)] text-lg font-semibold text-foreground">
              AlineU
            </span>
          </div>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            {CLINIC.tagline} Physiotherapy &amp; rehabilitation care in Ashoknagar, MP.
          </p>
        </div>

        <nav aria-label="Footer">
          <p className="text-sm font-semibold text-foreground">Quick links</p>
          <ul className="mt-3 space-y-2">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="text-sm font-semibold text-foreground">Get in touch</p>
          <a
            href={CLINIC.phoneHref}
            className="mt-3 block text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            {CLINIC.phoneDisplay}
          </a>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{CLINIC.address}</p>
          <div className="mt-3 flex gap-4 text-sm">
            <a
              href={CLINIC.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline underline-offset-4"
            >
              Instagram
            </a>
            <a
              href={CLINIC.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline underline-offset-4"
            >
              Facebook
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p>© {new Date().getFullYear()} AlineU Physio. All rights reserved.</p>
          <p>Website by Marketing Vertos</p>
        </div>
      </div>
    </footer>
  );
}
