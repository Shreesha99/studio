"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { Gavel, ShieldCheck, Timer, Landmark, Hospital } from "lucide-react";

const highlights = [
  {
    icon: <Gavel className="h-5 w-5 text-primary" />,
    title: "Government Projects",
  },
  {
    icon: <Hospital className="h-5 w-5 text-primary" />,
    title: "Commercial & Healthcare Electrical Infrastructure",
  },
  {
    icon: <ShieldCheck className="h-5 w-5 text-primary" />,
    title: "Compliance & Safety",
  },
];

const counters = [
  { label: "Years of Experience", value: 25, icon: Timer },
  { label: "Government Projects", value: 100, icon: Landmark },
  { label: "Compliance Record", value: 100, suffix: "%", icon: ShieldCheck },
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
        const numberWrap = numberEl.parentElement as HTMLElement;
        const ring = wrap.querySelector(".counter-ring") as SVGCircleElement;
        const icon = wrap.querySelector(".counter-icon") as HTMLElement;

        if (!numberEl || !ring || !icon || !numberWrap) return;

        const target = Number(numberEl.dataset.value);
        const suffix = numberEl.dataset.suffix || "+";
        const radius = 52;
        const circumference = 2 * Math.PI * radius;

        gsap.set(ring, {
          strokeDasharray: circumference,
          strokeDashoffset: circumference,
        });

        gsap.set(icon, { opacity: 0, scale: 0.6 });
        gsap.set(numberWrap, { opacity: 1, scale: 1 });
        gsap.set(numberEl, { innerText: 0 });

        const counterTl = gsap.timeline({ delay: tl.duration() + i * 0.25 });

        // Ring fill
        counterTl.to(ring, {
          strokeDashoffset: 0,
          duration: 3,
          ease: "power1.inOut",
        });

        // Count up
        counterTl.to(
          numberEl,
          {
            innerText: target,
            duration: 2.6,
            ease: "power1.inOut",
            snap: { innerText: 1 },
            onUpdate() {
              numberEl.innerText =
                Math.round(Number(numberEl.innerText)) + suffix;
            },
            onComplete() {
              numberEl.innerText = target + suffix;
            },
          },
          "-=2.4"
        );

        // Infinite toggle loop
        counterTl.add(() => {
          gsap
            .timeline({ repeat: -1 })
            .to({}, { duration: 2 })
            .to(numberWrap, { opacity: 0, scale: 0.85, duration: 0.3 })
            .to(
              icon,
              { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.8)" },
              "<"
            )
            .to({}, { duration: 2 })
            .to(icon, { opacity: 0, scale: 0.8, duration: 0.3 })
            .to(numberWrap, { opacity: 1, scale: 1, duration: 0.4 }, "<");
        });
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

      <div className="absolute inset-0 bg-black/70 dark:bg-black/80" />

      <div className="relative z-10 container px-4 py-20 sm:py-24">
        <div className="max-w-4xl mx-auto text-center space-y-8 sm:space-y-10">
          <div className="hero-badge inline-flex rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm sm:text-xl font-semibold text-primary">
            Electrical Contracting • Karnataka
          </div>

          <h1 className="hero-title text-3xl sm:text-4xl md:text-6xl font-headline font-bold leading-tight">
            Powering Government & Public Infrastructure
          </h1>

          <p className="hero-description max-w-3xl mx-auto text-base sm:text-lg text-white/75">
            Government <strong>Super Licensed</strong> Electrical Contractor
            delivering compliant, large-scale electrical infrastructure across
            Karnataka.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 pt-8">
            {counters.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className="counter-wrap text-center space-y-4"
                >
                  <div className="relative mx-auto h-32 w-32">
                    <svg
                      viewBox="0 0 120 120"
                      className="absolute inset-0 -rotate-90"
                    >
                      <circle
                        cx="60"
                        cy="60"
                        r="52"
                        stroke="rgba(255,255,255,0.15)"
                        strokeWidth="8"
                        fill="none"
                      />
                      <circle
                        cx="60"
                        cy="60"
                        r="52"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="none"
                        className="counter-ring text-primary"
                      />
                    </svg>

                    <div className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-primary tabular-nums">
                      <span
                        className="hero-counter"
                        data-value={item.value}
                        data-suffix={item.suffix ?? "+"}
                      >
                        0
                      </span>
                    </div>

                    <div className="counter-icon absolute inset-0 flex items-center justify-center opacity-0">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                  </div>

                  <p className="text-xs uppercase tracking-wide text-white/60">
                    {item.label}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-6">
            <Button asChild size="lg" className="hero-cta">
              <Link href="#services">View Services</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="hero-cta border-white/40 text-foreground dark:hover:bg-white/20"
            >
              <Link href="#contact">Contact Us</Link>
            </Button>
          </div>
        </div>

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
