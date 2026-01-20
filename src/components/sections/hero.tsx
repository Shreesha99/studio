"use client";

import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

/* ---------------- VENDORS (ANY COUNT SAFE) ---------------- */
const VENDORS = [
  { id: "CPWD", name: "CPWD", src: "/vendors/cpwd.png" },
  { id: "KMF", name: "KMF", src: "/vendors/kmf.jpg" },
  { id: "IISc", name: "IISc", src: "/vendors/iisc.jpg" },
  { id: "RBI", name: "RBI", src: "/vendors/rbi.jpg" },
  { id: "HOS", name: "Hospitals", src: "/vendors/stmarthas.jpg" },
];

/* ---------------- COUNTERS ---------------- */
const COUNTERS = [
  { label: "Years of Experience", value: 25, suffix: "+" },
  { label: "Government Projects", value: 100, suffix: "+" },
  { label: "Compliance Record", value: 100, suffix: "%" },
];

export function Hero() {
  const heroImage = PlaceHolderImages.find(
    (img) => img.id === "hero-background"
  );

  const container = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".hero-animate",
        { opacity: 0, y: 14 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.1,
        }
      );

      gsap.utils.toArray<HTMLElement>(".hero-counter").forEach((el) => {
        const target = Number(el.dataset.value);
        const suffix = el.dataset.suffix || "";

        gsap.fromTo(
          el,
          { innerText: 0 },
          {
            innerText: target,
            duration: 2.2,
            ease: "power4.out",
            snap: { innerText: 1 },
            onUpdate() {
              el.innerText = Math.round(Number(el.innerText)) + suffix;
            },
            onComplete() {
              el.innerText = target + suffix;
            },
          }
        );
      });
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden text-center px-4"
    >
      {/* Background */}
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          priority
          className="object-cover scale-105 blur-[2px] saturate-50 brightness-75"
        />
      )}

      <div className="absolute inset-0 bg-black/70" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto">
        <div className="space-y-6 sm:space-y-10">
          {/* Badge */}
          <div className="hero-animate inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[11px] sm:text-sm font-semibold text-primary">
            Government Super Licensed Electrical Contractor
          </div>

          {/* Title */}
          <h1 className="hero-animate text-xl sm:text-4xl md:text-5xl font-headline font-bold text-white leading-snug sm:leading-tight px-2">
            Powering Government & Public Infrastructure Across Karnataka
          </h1>

          {/* Description */}
          <p className="hero-animate max-w-2xl mx-auto text-sm sm:text-lg text-white/75 px-3">
            Compliant HT & LT electrical infrastructure for government bodies,
            PSUs, institutions, and critical facilities.
          </p>

          {/* Counters */}
          <div className="hero-animate grid grid-cols-3 gap-4 sm:gap-8 pt-2 max-w-md sm:max-w-none mx-auto">
            {COUNTERS.map((item) => (
              <div key={item.label} className="space-y-0.5">
                <div
                  className="hero-counter text-xl sm:text-3xl font-bold text-white tabular-nums"
                  data-value={item.value}
                  data-suffix={item.suffix}
                >
                  0
                </div>
                <p className="text-[10px] sm:text-sm uppercase tracking-wide text-white/60">
                  {item.label}
                </p>
              </div>
            ))}
          </div>

          {/* Vendors */}
          <div className="hero-animate pt-6 sm:pt-10">
            <p className="mb-3 text-[10px] sm:text-xs uppercase tracking-wide text-white/50">
              Trusted Vendors
            </p>

            <div className="bg-black/40 backdrop-blur-sm border-t border-white/10 py-4 sm:py-6">
              <div
                className="
    grid
    gap-y-6
    gap-x-6
    sm:gap-10
    items-center
    justify-items-center
    max-w-5xl
    mx-auto
  "
                style={{
                  gridTemplateColumns: "repeat(auto-fit, minmax(110px, 1fr))",
                }}
              >
                {VENDORS.map((vendor) => (
                  <div key={vendor.id} className="vendor-logo">
                    <div className="relative h-16 w-28 sm:h-24 sm:w-36">
                      <Image
                        src={vendor.src}
                        alt={vendor.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
