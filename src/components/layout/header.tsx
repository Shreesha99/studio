"use client";

import Link from 'next/link';
import { Menu, Zap } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { ThemeToggle } from '../theme-toggle';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#services', label: 'Services' },
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
];

export function Header() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const closeSheet = () => setIsSheetOpen(false);

  return (
    <>
      {/* Centered Logo for all screen sizes */}
      <header className="fixed top-0 z-50 w-full flex justify-center pt-4 transition-all duration-300">
        <Link href="#home" className="flex items-center gap-2">
          <div className={cn(
            "transition-all duration-300 ease-in-out flex items-center justify-center",
            isScrolled ? "bg-white rounded-full h-10 w-10" : "h-12 w-12"
          )}>
            <Zap className={cn("transition-colors duration-300", isScrolled ? "h-6 w-6 text-primary" : "h-8 w-8 text-white")} />
          </div>
          <h1 className={cn(
            "text-lg font-bold font-headline transition-all duration-300 ease-in-out",
            isScrolled ? "opacity-0 -translate-x-4" : "opacity-100 translate-x-0 text-white"
          )}>
            Suprabha Electricals
          </h1>
        </Link>
      </header>
      
      {/* Mobile Menu Trigger - top right */}
      <div className="md:hidden fixed top-4 right-4 z-50 flex items-center gap-2">
        <ThemeToggle />
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="text-white">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="rounded-t-lg">
            <SheetHeader>
              <SheetTitle>
                <Link href="#home" onClick={closeSheet} className="flex items-center gap-2">
                  <Zap className="h-6 w-6 text-primary" />
                  <span className="font-headline text-foreground">Suprabha Electricals</span>
                </Link>
              </SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-4 mt-8">
              {navLinks.map((link) => (
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
      
      {/* Floating Desktop Navigation */}
      <div className="hidden md:flex fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
         <nav className="flex items-center gap-4 p-2 rounded-full border border-border/40 bg-background/80 backdrop-blur-lg shadow-lg">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium transition-colors text-muted-foreground hover:text-foreground px-4 py-2 rounded-full"
            >
              {link.label}
            </Link>
          ))}
          <ThemeToggle />
          <Button asChild className="rounded-full text-primary-foreground font-bold">
              <Link href="#contact">Get a Quote</Link>
          </Button>
        </nav>
      </div>
    </>
  );
}