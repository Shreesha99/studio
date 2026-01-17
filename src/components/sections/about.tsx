"use client";

import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Check } from "lucide-react";

export function About() {
  const aboutImage = PlaceHolderImages.find((img) => img.id === "about-image");
  const container = useRef(null);

  useGSAP(
    () => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: container.current,
            start: "top 80%",
          },
        })
        .fromTo(
          ".about-image-container",
          { x: -40, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.9, ease: "power3.out" }
        )
        .fromTo(
          ".about-content",
          { x: 40, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.9, ease: "power3.out" },
          "-=0.7"
        );
    },
    { scope: container }
  );

  return (
    <section
      id="about"
      ref={container}
      className="py-16 lg:py-20 bg-background overflow-hidden"
    >
      <div className="container grid lg:grid-cols-2 gap-16 items-center">
        {/* Image */}
        <div className="about-image-container rounded-xl overflow-hidden shadow-sm">
          {aboutImage && (
            <Image
              src={aboutImage.imageUrl}
              alt={aboutImage.description}
              width={600}
              height={700}
              className="object-cover w-full aspect-[4/5]"
              data-ai-hint={aboutImage.imageHint}
            />
          )}
        </div>

        {/* Content */}
        <div className="about-content space-y-7">
          {/* Heading */}
          <div className="space-y-3">
            <span className="text-sm font-semibold text-primary uppercase tracking-wide">
              About Us
            </span>
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-foreground">
              A Trusted Partner in Electrical Infrastructure
            </h2>
          </div>

          <ul className="space-y-3 text-sm leading-relaxed text-muted-foreground">
            <li>
              <span className="font-semibold text-foreground">
                Suprabha Electricals
              </span>{" "}
              is a Government Super Licensed{" "}
              <span className="font-semibold text-foreground">
                Electrical Contractor & Consultant
              </span>{" "}
              with over{" "}
              <span className="font-semibold text-foreground">
                25 years of experience
              </span>{" "}
              delivering reliable electrical solutions across Karnataka.
            </li>

            <li>
              We undertake{" "}
              <span className="font-medium text-foreground">
                HT & LT electrical works up to 400 kVA
              </span>
              , including consultancy, supply, execution, and turnkey project
              delivery.
            </li>

            <li>
              Our capabilities include{" "}
              <span className="font-medium text-foreground">
                DG sets, panels, transformers, cable laying, earthing, and
                annual maintenance
              </span>{" "}
              for industrial, commercial, and institutional facilities.
            </li>

            {/* 🔽 SINGLE, COMPRESSED INTEGRATION BLOCK */}
            <li>
              Our scope further covers{" "}
              <span className="font-medium text-foreground">
                industrial and domestic wiring, HT/LT cable laying and jointing,
                dedicated earthing for UPS and machinery, supply of AMF,
                synchronization, MCC, PCC, APFC panels, HT/LT breakers (ACB &
                OCB), transformer oil filtration, OLTC, relay and meter testing
              </span>
              , along with integrated systems such as{" "}
              <span className="font-medium text-foreground">
                CCTV, fire alarm systems, audio/video conferencing, and VRF /
                split air-conditioning systems
              </span>
              . We have executed projects for{" "}
              <span className="font-medium text-foreground">
                industries, IT parks, hospitals, educational institutions, PSUs,
                KMF projects, and central government bodies
              </span>
              .
            </li>

            <li>
              We also provide end-to-end support for{" "}
              <span className="font-medium text-foreground">
                Electrical Inspectorate licensing, statutory inspections, and
                renewals
              </span>{" "}
              for HT installations, DG sets, and lift electrical systems.
            </li>
          </ul>

          {/* Trust indicators */}
          <div className="grid gap-2">
            {[
              "Quality-driven execution with safety-first practices",
              "Strong experience in government, commercial & healthcare projects",
              "Reliable delivery backed by regulatory compliance",
            ].map((feature) => (
              <div key={feature} className="flex items-start gap-3">
                <Check className="h-5 w-5 text-primary mt-0.5" />
                <span className="text-sm text-muted-foreground">{feature}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <Button asChild size="lg" className="rounded-full font-semibold">
            <Link href="#contact">Contact Us Today</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
