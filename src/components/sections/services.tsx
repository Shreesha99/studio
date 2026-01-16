"use client";

import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ServiceItem, type Service } from "@/components/service-item";
import { ServiceImage } from "@/components/service-image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const AUTOPLAY_DURATION = 4000;

const services: Service[] = [
  {
    id: 1,
    iconName: "Gavel",
    title: "Government Projects",
    description:
      "Specializing in electrical tendering and execution for state and central government projects.",
    imageUrl: PlaceHolderImages.find((p) => p.id === "service-govt")!.imageUrl,
  },
  {
    id: 2,
    iconName: "Lightbulb",
    title: "Electrical Installations",
    description:
      "Complete installation services for new buildings, infrastructure, and public facilities.",
    imageUrl: PlaceHolderImages.find((p) => p.id === "service-installations")!
      .imageUrl,
  },
  {
    id: 3,
    iconName: "Building",
    title: "Auditorium & Public Spaces",
    description:
      "Expert design and installation of lighting and electrical systems for auditoriums and large venues.",
    imageUrl: PlaceHolderImages.find((p) => p.id === "service-auditorium")!
      .imageUrl,
  },
  {
    id: 4,
    iconName: "Network",
    title: "Infrastructure Setup",
    description:
      "Electrical setup for new wings of institutions, and large-scale infrastructure projects.",
    imageUrl: PlaceHolderImages.find((p) => p.id === "service-infra")!.imageUrl,
  },
];

export function Services() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeService = services[activeIndex];

  const container = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const progressRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isPaused = useRef(false);

  /* Section entry animation (unchanged) */
  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
        },
      });

      tl.fromTo(
        ".section-header-services > *",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.8,
          ease: "power3.out",
        }
      );

      tl.fromTo(
        ".service-item",
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.4"
      );

      tl.fromTo(
        ".service-image-container",
        { opacity: 0, scale: 0.96 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.6"
      );
    },
    { scope: container }
  );

  const transitionImage = (nextIndex: number) => {
    if (!imageRef.current || nextIndex === activeIndexRef.current) {
      setActiveIndex(nextIndex);
      return;
    }

    gsap.killTweensOf(imageRef.current);

    gsap.to(imageRef.current, {
      opacity: 0,
      y: 8,
      duration: 0.25,
      ease: "power2.out",
      onComplete: () => {
        // 🔒 Commit state ONLY after fade-out
        setActiveIndex(nextIndex);

        // wait for React to paint the new image
        requestAnimationFrame(() => {
          gsap.fromTo(
            imageRef.current,
            { opacity: 0, y: -8 },
            {
              opacity: 1,
              y: 0,
              duration: 0.4,
              ease: "power3.out",
            }
          );
        });
      },
    });
  };

  /* Progress animation per card */
  const animateProgress = (index: number) => {
    progressRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.killTweensOf(el);
      gsap.set(el, { scaleX: 0 });
      if (i === index) {
        gsap.to(el, {
          scaleX: 1,
          duration: AUTOPLAY_DURATION / 1000,
          ease: "linear",
          transformOrigin: "left",
        });
      }
    });
  };

  const activeIndexRef = useRef(0);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  const startAutoplay = () => {
    stopAutoplay();

    intervalRef.current = setInterval(() => {
      if (isPaused.current) return;

      const nextIndex = (activeIndexRef.current + 1) % services.length;
      activeIndexRef.current = nextIndex;

      transitionImage(nextIndex);
      animateProgress(nextIndex);
    }, AUTOPLAY_DURATION);

    animateProgress(activeIndexRef.current);
  };

  const stopAutoplay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    progressRefs.current.forEach((el) => {
      if (!el) return;
      gsap.killTweensOf(el);
      gsap.set(el, { scaleX: 0 });
    });
  };

  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
  }, []);

  return (
    <section
      id="services"
      ref={container}
      className="py-24 lg:py-32 bg-card overflow-hidden"
    >
      <div className="container space-y-16">
        {/* Header */}
        <div className="section-header-services text-center space-y-4 max-w-3xl mx-auto">
          <span className="text-primary font-semibold">Our Services</span>
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-foreground">
            Comprehensive Electrical Solutions
          </h2>
          <p className="text-lg text-muted-foreground">
            We provide a complete range of electrical services tailored for
            government contracts, ensuring quality, safety, and efficiency.
          </p>
        </div>

        {/* Content */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="flex flex-col gap-3">
            {services.map((service, index) => (
              <div
                key={service.id}
                className={cn(
                  "service-item relative rounded-xl transition-colors overflow-hidden",
                  activeIndex === index &&
                    "bg-muted/40 border-l-2 border-primary"
                )}
                onMouseEnter={() => {
                  isPaused.current = true;
                  stopAutoplay();
                  transitionImage(index);
                }}
                onMouseLeave={() => {
                  isPaused.current = false;
                  startAutoplay();
                }}
              >
                {/* Progress line */}
                <div className="absolute top-0 left-0 h-[1px] w-full bg-muted/30">
                  <div
                    ref={(el) => {
                      progressRefs.current[index] = el;
                    }}
                    className="h-full bg-primary scale-x-0"
                  />
                </div>

                <ServiceItem service={service} onMouseEnter={() => {}} />

                <div className="lg:hidden mt-4">
                  {activeIndex === index && <ServiceImage service={service} />}
                </div>
              </div>
            ))}
          </div>

          <div className="hidden lg:block sticky top-24 service-image-container">
            <div ref={imageRef}>
              <ServiceImage service={activeService} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
