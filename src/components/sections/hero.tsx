"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { ArrowDown, Gavel, ShieldCheck, Building2 } from "lucide-react";

const highlights = [
  {
    icon: <Gavel className="h-5 w-5 text-primary" />,
    title: "Government Projects",
    description: "Public sector & tender-based electrical works",
  },
  {
    icon: <Building2 className="h-5 w-5 text-primary" />,
    title: "Institutional Infrastructure",
    description: "Large-scale installations for public facilities",
  },
  {
    icon: <ShieldCheck className="h-5 w-5 text-primary" />,
    title: "Compliance & Safety",
    description: "Execution aligned with statutory regulations",
  },
];

export function Hero() {
  const heroImage = PlaceHolderImages.find(
    (img) => img.id === "hero-background"
  );
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      /* ===== Timeline ===== */
      const tl = gsap.timeline({ delay: 0.2 });

      /* Badge */
      tl.fromTo(
        ".hero-badge",
        { y: 20, opacity: 0, filter: "blur(6px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.6,
          ease: "power3.out",
        }
      )

        /* Title */
        .fromTo(
          ".hero-title",
          { y: 30, opacity: 0, filter: "blur(8px)" },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.9,
            ease: "power3.out",
          },
          "-=0.3"
        )

        /* Description */
        .fromTo(
          ".hero-description",
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
          },
          "-=0.5"
        )

        /* Buttons */
        .fromTo(
          ".hero-buttons",
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.4"
        )

        /* Feature Cards Entrance */
        .fromTo(
          ".hero-card",
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.15,
            duration: 0.7,
            ease: "power3.out",
          },
          "-=0.2"
        );

      /* Background slow zoom */
      gsap.fromTo(
        ".hero-image",
        { scale: 1.1 },
        {
          scale: 1,
          duration: 3,
          ease: "power2.out",
        }
      );

      /* Scroll indicator pulse */
      gsap.to(".scroll-indicator", {
        y: 8,
        duration: 1.4,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });

      /* ===== Subtle hover interactions for highlight cards ===== */
      gsap.utils.toArray<HTMLElement>(".hero-card").forEach((card) => {
        gsap.set(card, { transformOrigin: "center" });

        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            y: -2,
            scale: 1.015,
            boxShadow: "0 20px 40px rgba(0,0,0,0.35)",
            duration: 0.35,
            ease: "power2.out",
          });
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            y: 0,
            scale: 1,
            boxShadow: "0 0 0 rgba(0,0,0,0)",
            duration: 0.4,
            ease: "power2.out",
          });
        });
      });
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      id="home"
      className="relative isolate min-h-screen flex items-center text-white overflow-hidden"
    >
      {/* Background */}
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          priority
          quality={100}
          className="object-cover hero-image"
          data-ai-hint={heroImage.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/65 to-black/85" />

      {/* Content */}
      <div className="relative z-10 container py-28">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          {/* Badge */}
          <div className="hero-badge inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-semibold text-primary backdrop-blur">
            Electrical Contracting • Karnataka
          </div>

          {/* Title */}
          <h1 className="hero-title text-4xl md:text-6xl lg:text-7xl font-headline font-bold tracking-tight">
            Powering Government & Public
            <br className="hidden sm:block" />
            Infrastructure
          </h1>

          {/* Description */}
          <p className="hero-description max-w-3xl mx-auto text-base md:text-lg text-white/80">
            A Government Licensed Class ‘1’ Electrical Contractor delivering
            compliant, large-scale electrical solutions for public sector and
            institutional infrastructure projects across Karnataka.
          </p>

          {/* CTAs */}
          <div className="hero-buttons flex flex-wrap justify-center gap-4 pt-2">
            <Button
              asChild
              size="lg"
              className="rounded-full px-8 font-semibold transition-transform hover:scale-[1.03]"
            >
              <Link href="#services">View Services</Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full px-8 font-semibold border-white/40 bg-white/10 hover:bg-white/20 text-white backdrop-blur transition-transform hover:scale-[1.03]"
            >
              <Link href="#contact">Contact Us</Link>
            </Button>
          </div>
        </div>

        {/* Highlights */}
        <div className="mt-20 grid gap-6 md:grid-cols-3 max-w-6xl mx-auto hover:cursor-default">
          {highlights.map((item) => (
            <div
              key={item.title}
              className="hero-card rounded-2xl border border-white/10 bg-black/35 p-6 backdrop-blur-md text-left"
            >
              <div className="mb-3">{item.icon}</div>
              <h3 className="text-base font-semibold">{item.title}</h3>
              <p className="mt-1 text-sm text-white/70">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="flex justify-center gap-4 scroll-indicator absolute bottom-6 right-6 -translate-x-1/2 text-white/60">
        <ArrowDown className="h-7 w-7" />
      </div>
    </section>
  );
}
