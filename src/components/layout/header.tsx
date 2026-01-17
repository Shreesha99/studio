"use client";

import Link from "next/link";
import { Menu, Zap, MessageCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ThemeToggle } from "../theme-toggle";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#services", label: "Services" },
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export function Header() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks.map((link) => document.querySelector(link.href));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );

    sections.forEach((section) => section && observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const closeSheet = () => setIsSheetOpen(false);

  return (
    <>
      {/* Logo */}
      <header className="fixed top-0 z-50 w-full flex justify-center pt-4">
        <Link
          href="#home"
          className={cn(
            "relative flex items-center gap-2 rounded-full p-2 transition-all duration-500 ease-in-out",
            isScrolled ? "bg-transparent" : "h-12 bg-black",
            isScrolled && !isMobile && "!translate-x-[calc(0vw-55rem)]",
            isScrolled && isMobile && "!translate-x-[calc(0vw-10rem)]"
          )}
        >
          <div
            className={cn(
              "flex items-center justify-center transition-all",
              isScrolled ? "bg-white rounded-full h-10 w-10" : "h-12 w-12"
            )}
          >
            <Zap
              className={cn(
                isScrolled ? "h-6 w-6 text-primary" : "h-8 w-8 text-white"
              )}
            />
          </div>
          <h1
            className={cn(
              "font-headline font-bold text-white transition-all",
              isScrolled ? "opacity-0 w-0" : "opacity-100 pr-4"
            )}
          >
            Suprabha Electricals
          </h1>
        </Link>
      </header>

      {/* Theme Toggle Desktop */}
      <div className="fixed top-6 right-8 z-50 hidden md:flex">
        <ThemeToggle />
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden fixed top-4 right-4 z-50">
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <div
              className="
              rounded-md
              border
              bg-background
              shadow-sm
        "
            >
              <Button variant="ghost" size="icon" className="rounded-full">
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </SheetTrigger>

          <SheetContent side="bottom">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>

            <div className="mt-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeSheet}
                  className={cn(
                    "block text-lg transition-colors",
                    activeSection === link.href.replace("#", "")
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {link.label}
                </Link>
              ))}

              <button
                onClick={() => {
                  closeSheet();
                  window.dispatchEvent(new CustomEvent("open-chatbot"));
                }}
                className="flex items-center gap-2 text-lg text-muted-foreground hover:text-foreground transition-colors"
              >
                <MessageCircle className="h-5 w-5" />
                Help
              </button>
            </div>

            <div className="mt-8 pt-6 border-t flex justify-center items-center">
              <ThemeToggle />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Floating Bottom Nav */}
      <div className="hidden md:flex fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
        <nav className="flex items-center gap-2 rounded-full border bg-background/80 backdrop-blur-lg p-2 shadow-lg">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "px-4 py-2 rounded-full text-sm",
                activeSection === link.href.replace("#", "")
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}

          {/* 💬 Help — DESKTOP */}
          <Button
            variant="ghost"
            size="sm"
            className="rounded-full gap-2"
            onClick={() =>
              window.dispatchEvent(new CustomEvent("open-chatbot"))
            }
          >
            <MessageCircle className="h-4 w-4" />
            Help
          </Button>

          <Button asChild className="rounded-full font-bold">
            <Link href="#contact">Get a Quote</Link>
          </Button>
        </nav>
      </div>
    </>
  );
}
