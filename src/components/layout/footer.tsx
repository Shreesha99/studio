import { Zap } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-card text-secondary-foreground">
      <div className="container py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Zap className="h-6 w-6 text-primary" />
            <h1 className="text-lg font-bold font-headline text-foreground">
              Suprabha Electricals
            </h1>
          </div>
          <p className="text-sm text-center md:text-left text-muted-foreground">
            &copy; {currentYear} Suprabha Electricals. All rights reserved.
          </p>
          <nav className="flex gap-4">
            <Link href="#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About</Link>
            <Link href="#services" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Services</Link>
            <Link href="#contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
