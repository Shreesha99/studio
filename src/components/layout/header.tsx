"use client";

import Link from 'next/link';
import { Menu, Zap } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { ThemeToggle } from '../theme-toggle';

const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#services', label: 'Services' },
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
];

export function Header() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const closeSheet = () => setIsSheetOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center">
        <Link href="#home" className="flex items-center gap-2 mr-auto">
          <Zap className="h-6 w-6 text-primary" />
          <h1 className="text-lg font-bold font-headline text-foreground">
            Suprabha Electricals
          </h1>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium transition-colors text-muted-foreground hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        
        <div className="hidden md:flex items-center gap-4 ml-8">
            <Link href="#contact" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                Contact Us
            </Link>
            <Button asChild className="rounded-full text-primary-foreground font-bold">
                <Link href="#contact">Get a Quote</Link>
            </Button>
            <ThemeToggle />
        </div>


        <div className="md:hidden ml-4 flex items-center gap-2">
          <ThemeToggle />
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>
                  <Link href="#home" onClick={closeSheet} className="flex items-center gap-2">
                     <Zap className="h-6 w-6 text-primary" />
                     <span className="font-headline text-foreground">Suprabha Electricals</span>
                  </Link>
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-4 mt-8">
                {[...navLinks, {href: '#contact', label: 'Contact Us'}].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeSheet}
                    className="text-lg font-medium text-foreground/80 hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                ))}
                 <Button asChild className="mt-4 text-primary-foreground">
                    <Link href="#contact" onClick={closeSheet}>Get a Quote</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
