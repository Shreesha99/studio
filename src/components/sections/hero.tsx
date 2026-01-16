"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { Gavel, ShieldCheck, Building2 } from "lucide-react";

const highlights = [
  {
    icon: <Gavel className="h-5 w-5 text-primary" />,
    title: "Government Projects",
  },
  {
    icon: <Building2 className="h-5 w-5 text-primary" />,
    title: "Institutional Infrastructure",
  },
  {
    icon: <ShieldCheck className="h-5 w-5 text-primary" />,
    title: "Compliance & Safety",
  },
];

const counters = [
  { label: "Years Experience", value: 25 },
  { label: "Government Projects", value: 100 },
  { label: "Compliance Record", value: 100, suffix: "%" },
];

export function Hero() {
  const heroImage = PlaceHolderImages.find(
    (img) => img.id === "hero-background"
  );
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.set(
        ".hero-badge, .hero-title, .hero-description, .counter-wrap, .hero-cta, .hero-support",
        { opacity: 0, y: 24 }
      );

      const tl = gsap.timeline({ delay: 0.25 });

      tl.to(".hero-badge", {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
      })
        .to(
          ".hero-title",
          { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" },
          "-=0.3"
        )
        .to(
          ".hero-description",
          { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
          "-=0.5"
        )
        .to(
          ".counter-wrap",
          {
            opacity: 1,
            y: 0,
            stagger: 0.18,
            duration: 0.7,
            ease: "power3.out",
          },
          "-=0.3"
        );

      gsap.utils.toArray<HTMLElement>(".counter-wrap").forEach((wrap, i) => {
        const numberEl = wrap.querySelector(".hero-counter") as HTMLElement;
        const lineEl = wrap.querySelector(".counter-line") as HTMLElement;
        if (!numberEl || !lineEl) return;

        const target = Number(numberEl.dataset.value);
        gsap.set(numberEl, { innerText: 0 });
        gsap.set(lineEl, { scaleX: 0, transformOrigin: "left" });

        gsap
          .timeline({ delay: tl.duration() + i * 0.2 })
          .to(lineEl, { scaleX: 1, duration: 3, ease: "power1.inOut" })
          .to(
            numberEl,
            {
              innerText: target,
              duration: 2.6,
              ease: "power1.inOut",
              snap: { innerText: 1 },
              onUpdate() {
                numberEl.innerText = Math.round(
                  Number(numberEl.innerText)
                ).toString();
              },
            },
            "-=2.3"
          );
      });

      tl.to(
        ".hero-cta",
        {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.6"
      );

      tl.to(
        ".hero-support",
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.5"
      );
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={container}
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden text-white"
    >
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          priority
          className="object-cover"
        />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70 dark:bg-black/80" />

      <div className="relative z-10 container px-4 py-24 sm:py-28">
        <div className="max-w-4xl mx-auto text-center space-y-8 sm:space-y-10">
          <div className="hero-badge inline-flex rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs sm:text-sm font-semibold text-primary">
            Electrical Contracting • Karnataka
          </div>

          <h1 className="hero-title text-3xl sm:text-4xl md:text-6xl font-headline font-bold leading-tight">
            Powering Government & Public Infrastructure
          </h1>

          <p className="hero-description max-w-3xl mx-auto text-base sm:text-lg text-white/75">
            Government Licensed Class ‘1’ Electrical Contractor delivering
            compliant, large-scale electrical infrastructure across Karnataka.
          </p>

          {/* Counters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 pt-6">
            {counters.map((item) => (
              <div key={item.label} className="counter-wrap text-center">
                <div className="text-4xl sm:text-5xl font-bold text-primary tabular-nums">
                  <span className="hero-counter" data-value={item.value}>
                    0
                  </span>
                  {item.suffix}+
                </div>
                <div className="mt-3 h-[2px] bg-white/20 overflow-hidden">
                  <div className="counter-line h-full bg-primary" />
                </div>
                <p className="mt-3 text-xs uppercase tracking-wide text-white/60">
                  {item.label}
                </p>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-6">
            <Button asChild size="lg" className="hero-cta">
              <Link href="#services">View Services</Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="
    hero-cta
    border-white/40
    text-foreground
    dark:hover:bg-white/20
  "
            >
              <Link href="#contact">Contact Us</Link>
            </Button>
          </div>
        </div>

        {/* Supporting icons */}
        <div className="hero-support mt-16 flex flex-wrap justify-center gap-6 sm:gap-10 text-white/60 text-sm">
          {highlights.map((item) => (
            <div key={item.title} className="flex items-center gap-2">
              {item.icon}
              <span>{item.title}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
