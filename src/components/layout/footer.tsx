import Image from "next/image";
import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card text-secondary-foreground border-t">
      <div className="container py-8 space-y-4">
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
        <div className="text-xs text-muted-foreground text-center md:text-left">
          © {currentYear} Suprabha Electricals. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
