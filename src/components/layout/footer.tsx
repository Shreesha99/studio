import Image from "next/image";
import Link from "next/link";
import { HeartHandshake } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card text-secondary-foreground border-t">
      {/* ⬆ extra bottom padding on mobile */}
      <div className="container py-8 pb-20 md:pb-8 space-y-4">
        {/* Top row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="relative h-8 w-8">
              <Image
                src="/logo.png"
                alt="Suprabha Electricals Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="text-lg font-bold font-headline text-foreground">
              Suprabha Electricals
            </span>
          </div>

          {/* Nav */}
          <nav className="flex gap-6">
            <Link
              href="#about"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              About
            </Link>
            <Link
              href="#services"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Services
            </Link>
            <Link
              href="#contact"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Contact
            </Link>
          </nav>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col gap-3 text-xs text-muted-foreground text-center md:text-right">
          <div>© {currentYear} Suprabha Electricals. All rights reserved.</div>

          <div className="flex flex-wrap items-center justify-center md:justify-end gap-2">
            <HeartHandshake className="h-3.5 w-3.5 text-muted-foreground" />

            <span className="flex items-center gap-1">
              <span className="text-muted-foreground">
                Designed and Developed By:
              </span>
              <span className="font-medium text-foreground">
                Shreesha Venkatram · Chiranth Iyengar
              </span>
            </span>

            <span className="flex items-center gap-1">
              <span className="text-primary">|</span> Built in
              <span className="relative flex items-center group">
                <svg
                  width="18"
                  height="12"
                  viewBox="0 0 36 24"
                  aria-label="Indian Flag"
                  role="img"
                >
                  <rect width="36" height="8" y="0" fill="#FF9933" />
                  <rect width="36" height="8" y="8" fill="#FFFFFF" />
                  <rect width="36" height="8" y="16" fill="#138808" />
                  <circle
                    cx="18"
                    cy="12"
                    r="3"
                    fill="none"
                    stroke="#000080"
                    strokeWidth="0.8"
                  />
                </svg>

                <span
                  className="
          absolute -top-7 left-1/2 -translate-x-1/2
          whitespace-nowrap rounded-md
          bg-muted text-primary
          px-2 py-0.5 text-[10px] leading-none
          shadow-sm
          opacity-0 group-hover:opacity-100
          transition-opacity duration-150
          pointer-events-none
        "
                >
                  India
                </span>
              </span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
