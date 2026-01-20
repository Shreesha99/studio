"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AUTOPLAY_DURATION = 5;

const testimonials = [
  {
    name: "Mr. Sharma",
    title: "Project Manager, Geological Survey of India",
    image: "https://picsum.photos/seed/avatar1/100/100",
    quote:
      "Suprabha Electricals demonstrated exceptional execution discipline and technical compliance during our Bengaluru facility upgrade.",
  },
  {
    name: "Dr. Anjali Rao",
    title: "Dean, NIT Surathkal",
    image: "https://picsum.photos/seed/avatar2/100/100",
    quote:
      "The electrical infrastructure for our new academic wing was completed ahead of schedule with zero compliance issues.",
  },
  {
    name: "Prakash Menon",
    title: "Director, CII Bengaluru",
    image: "https://picsum.photos/seed/avatar3/100/100",
    quote:
      "Their ability to handle large-scale institutional projects with precision makes them one of the most reliable contractors.",
  },
  {
    name: "R. Krishnamurthy",
    title: "Chief Engineer, BESCOM",
    image: "https://picsum.photos/seed/avatar4/100/100",
    quote:
      "Strong engineering fundamentals, excellent safety practices, and timely delivery.",
  },
  {
    name: "Sunita Deshpande",
    title: "Facilities Head, IISc Bengaluru",
    image: "https://picsum.photos/seed/avatar5/100/100",
    quote:
      "Documentation, execution quality, and statutory compliance were flawless.",
  },
];

export function Testimonials() {
  const container = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (!trackRef.current) return;

      const track = trackRef.current;
      const getCards = () => Array.from(track.children) as HTMLElement[];

      const cardWidth = getCards()[0].offsetWidth;
      const gap = 32;
      const isMobile = window.innerWidth < 640;
      const step = isMobile ? cardWidth : cardWidth + gap;

      /* ---------- Mobile-safe scale ---------- */
      const mm = gsap.matchMedia();
      let ACTIVE_SCALE = 1.05;

      mm.add("(max-width: 640px)", () => {
        ACTIVE_SCALE = 1;
      });

      mm.add("(min-width: 641px)", () => {
        ACTIVE_SCALE = 1.05;
      });

      /* ---------------- Slide (TRUE LOOP) ---------------- */
      const slideNext = () => {
        const cards = getCards();

        const tl = gsap.timeline({
          onComplete: () => {
            track.appendChild(cards[0]);
            gsap.set(track, { x: 0 });
          },
        });

        tl.to(track, {
          x: -step,
          duration: 1,
          ease: "power3.inOut",
        });

        tl.to(
          cards,
          {
            scale: (i) => (i === 2 ? ACTIVE_SCALE : 0.9),
            opacity: (i) => (i === 2 ? 1 : 0.45),
            duration: 0.6,
            ease: "power3.out",
            overwrite: "auto",
          },
          "<0.3"
        );
      };

      /* ---------------- Init ---------------- */
      ScrollTrigger.create({
        trigger: track,
        start: "top 80%",
        once: true,
        onEnter: () => {
          gsap.set(track, { x: 0 });

          getCards().forEach((card, i) => {
            gsap.set(card, {
              scale: i === 1 ? ACTIVE_SCALE : 0.9,
              opacity: i === 1 ? 1 : 0.45,
            });
          });

          gsap.timeline({ repeat: -1 }).to(
            {},
            {
              duration: AUTOPLAY_DURATION,
              onComplete: slideNext,
            }
          );
        },
      });
    },
    { scope: container }
  );

  return (
    <section ref={container} className="py-32 bg-background overflow-hidden">
      <div className="container space-y-20">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-primary font-semibold uppercase tracking-wide">
            Client Trust
          </span>
          <h2 className="text-3xl md:text-4xl font-bold">
            Trusted by Institutions & Government Bodies
          </h2>
        </div>

        <div className="relative flex justify-center">
          <div
            className="overflow-hidden"
            style={{
              width: "calc(3 * 420px + 2 * 32px + 60px)",
              maxWidth: "100%",
            }}
          >
            <div ref={trackRef} className="flex will-change-transform">
              <Card className="focus-card min-w-[420px] bg-card border-border shadow-lg">
                <CardContent className="p-8 space-y-6">
                  <p className="text-lg italic text-muted-foreground">
                    “{testimonials.at(-1)!.quote}”
                  </p>
                  <div className="flex items-center gap-4 pt-4 border-t border-border">
                    <Avatar>
                      <AvatarImage src={testimonials.at(-1)!.image} />
                      <AvatarFallback>
                        {testimonials.at(-1)!.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">
                        {testimonials.at(-1)!.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {testimonials.at(-1)!.title}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {testimonials.map((t, i) => (
                <Card
                  key={i}
                  className="focus-card min-w-[420px] bg-card border-border shadow-lg"
                >
                  <CardContent className="p-8 space-y-6">
                    <p className="text-lg italic text-muted-foreground">
                      “{t.quote}”
                    </p>
                    <div className="flex items-center gap-4 pt-4 border-t border-border">
                      <Avatar>
                        <AvatarImage src={t.image} />
                        <AvatarFallback>{t.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{t.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {t.title}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
