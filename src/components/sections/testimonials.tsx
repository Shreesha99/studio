"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AUTOPLAY_DURATION = 5;
const FOCUS_HEIGHT = "clamp(300px, 70vh, 360px)";
const BLUR_HEIGHT = "clamp(260px, 65vh, 320px)";

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

      const getLayout = () => {
        const w = window.innerWidth;

        if (w < 640) return { visible: 1, center: 0 };
        if (w < 1024) return { visible: 2, center: 0 };

        return { visible: 3, center: 1 };
      };

      const getStep = () => {
        const cardWidth = getCards()[0].offsetWidth;
        const gap = 32;
        const { visible } = getLayout();
        return visible === 1 ? cardWidth : cardWidth + gap;
      };

      const slideNext = () => {
        const cards = getCards();
        const { center } = getLayout();
        const step = getStep();

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

        tl.set(
          cards,
          {
            opacity: 0.45,
            height: BLUR_HEIGHT,
          },
          "<"
        );

        tl.to(
          cards[center + 1],
          {
            opacity: 1,
            height: FOCUS_HEIGHT,
            duration: 0.6,
            ease: "power3.out",
          },
          "<0.4"
        );
      };

      ScrollTrigger.create({
        trigger: track,
        start: "top 80%",
        once: true,
        onEnter: () => {
          const { center } = getLayout();

          getCards().forEach((card, i) => {
            gsap.set(card, {
              height: i === center ? FOCUS_HEIGHT : BLUR_HEIGHT,
              opacity: i === center ? 1 : 0.45,
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

      window.addEventListener("resize", () => ScrollTrigger.refresh());
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
            className="
              overflow-hidden
              w-[420px]
              sm:w-[calc(2*420px+32px+40px)]
              lg:w-[calc(3*420px+2*32px+60px)]
              max-w-full
            "
          >
            <div
              ref={trackRef}
              className="flex items-center will-change-transform"
              style={{ height: FOCUS_HEIGHT }}
            >
              {testimonials
                .slice(-1)
                .concat(testimonials)
                .map((t, i) => (
                  <Card
                    key={i}
                    className="focus-card min-w-[420px] h-[320px] opacity-45 bg-card border-border shadow-lg"
                  >
                    <CardContent className="p-8 flex flex-col h-full">
                      <p className="text-[15px] leading-relaxed italic text-muted-foreground/80 flex-1">
                        “{t.quote}”
                      </p>

                      <div className="mt-6 pt-4 border-t border-border/40 flex items-center gap-4">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={t.image} />
                          <AvatarFallback>{t.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="leading-tight">
                          <p className="font-semibold text-sm">{t.name}</p>
                          <p className="text-xs text-muted-foreground">
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
