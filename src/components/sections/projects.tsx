"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/* ================= PROJECT DATA ================= */
const IMAGE_DURATION = 4000;

const projects = [
  {
    id: "gsi",
    title: "Geological Survey of India",
    location: "Bengaluru",
    description:
      "Execution of HT & LT electrical infrastructure, panel installations, cabling, earthing, and statutory compliance for a central government research facility.",
    images: [
      "/projects/gsi/1.jpg",
      "/projects/gsi/2.jpeg",
      "/projects/gsi/3.jpeg",
      "/projects/gsi/4.jpeg",
      "/projects/gsi/5.jpeg",
      "/projects/gsi/6.jpeg",
      "/projects/gsi/7.jpeg",
      "/projects/gsi/8.jpeg",
      "/projects/gsi/9.jpeg",
    ],
  },
  {
    id: "cii",
    title: "CII Office",
    location: "Bengaluru",
    description:
      "Complete electrical installation including power distribution, lighting systems, structured cabling, and safety compliance for institutional office premises.",
    images: ["/projects/cii/1.jpg", "/projects/cii/2.jpg"],
  },
  {
    id: "nit",
    title: "NIT Surathkal – New Wing",
    location: "Surathkal",
    description:
      "HT/LT electrical works, internal wiring, panel installations, and coordination with statutory authorities for a new academic block.",
    images: [
      "/projects/nit/1.jpg",
      "/projects/nit/2.jpg",
      "/projects/nit/3.jpg",
    ],
  },
  {
    id: "auditorium",
    title: "Auditorium Electrification",
    location: "Multiple Locations",
    description:
      "Design and execution of electrical systems for auditoriums including lighting, power distribution, control panels, and safety systems.",
    images: ["/projects/auditorium/1.jpg", "/projects/auditorium/2.jpg"],
  },
];

/* ================= COMPONENT ================= */

export function Projects() {
  const container = useRef<HTMLDivElement | null>(null);
  const imageWrapperRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<SVGCircleElement | null>(null);
  const directionRef = useRef<1 | -1>(1);

  const [activeProject, setActiveProject] = useState<
    (typeof projects)[0] | null
  >(null);
  const [activeIndex, setActiveIndex] = useState(0);

  /* ---------- ENTRY ANIMATIONS ---------- */
  useGSAP(
    () => {
      gsap.fromTo(
        ".projects-header > *",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".projects-header",
            start: "top 80%",
          },
        }
      );

      gsap.utils.toArray<HTMLElement>(".project-card").forEach((card) => {
        gsap.fromTo(
          card,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
            },
          }
        );
      });
    },
    { scope: container }
  );

  /* ---------- IMAGE SLIDE ANIMATION ---------- */
  useEffect(() => {
    if (!imageWrapperRef.current) return;

    const wrapper = imageWrapperRef.current;
    const current = wrapper.querySelector(".image-current") as HTMLElement;
    const next = wrapper.querySelector(".image-next") as HTMLElement;

    if (!current || !next) return;

    gsap.killTweensOf([current, next]);

    const dir = directionRef.current;

    gsap.set(next, { x: dir * 40, opacity: 0 });

    gsap
      .timeline()
      .to(current, {
        x: -dir * 40,
        opacity: 0,
        duration: 0.35,
        ease: "power2.out",
      })
      .to(
        next,
        {
          x: 0,
          opacity: 1,
          duration: 0.45,
          ease: "power3.out",
        },
        "<"
      );
  }, [activeIndex]);

  /* ---------- AUTOPLAY + PROGRESS ---------- */
  useEffect(() => {
    if (!activeProject || !progressRef.current) return;

    const radius = 18;
    const circumference = 2 * Math.PI * radius;

    gsap.killTweensOf(progressRef.current);

    gsap.set(progressRef.current, {
      strokeDasharray: circumference,
      strokeDashoffset: circumference,
    });

    gsap.to(progressRef.current, {
      strokeDashoffset: 0,
      duration: IMAGE_DURATION / 1000,
      ease: "power1.out",
      onComplete: () => {
        directionRef.current = 1;
        setActiveIndex((i) =>
          i === activeProject.images.length - 1 ? 0 : i + 1
        );
      },
    });
  }, [activeIndex, activeProject]);

  return (
    <>
      {/* ================= GRID ================= */}
      <section
        id="projects"
        ref={container}
        className="py-16 md:py-20 lg:py-24 bg-background"
      >
        <div className="container space-y-12 md:space-y-16">
          <div className="projects-header text-center max-w-3xl mx-auto space-y-4">
            <span className="text-primary font-semibold uppercase tracking-wide">
              Our Work
            </span>
            <h2 className="text-2xl md:text-4xl font-headline font-bold">
              Landmark Government Projects
            </h2>
            <p className="text-base md:text-lg text-muted-foreground">
              Select infrastructure projects executed with strict compliance and
              execution discipline.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {projects.map((project) => (
              <button
                key={project.id}
                onClick={() => {
                  setActiveProject(project);
                  setActiveIndex(0);
                }}
                className="project-card group relative overflow-hidden rounded-2xl border border-border bg-card text-left"
              >
                <div className="relative h-[18rem] sm:h-[20rem] md:h-[22rem]">
                  <Image
                    src={project.images[0]}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                </div>

                {/* CTA */}
                <div className="pointer-events-none absolute top-4 right-4 md:inset-0 flex items-start justify-end md:items-center md:justify-center opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                  <span className="px-4 py-1.5 bg-white text-black text-xs md:text-sm font-semibold rounded-full shadow-lg">
                    <span className="md:hidden">Tap to know more</span>
                    <span className="hidden md:inline">Click to know more</span>
                  </span>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                  <span className="text-xs uppercase tracking-wide text-primary font-semibold">
                    {project.location}
                  </span>
                  <h3 className="mt-1 text-lg md:text-xl font-bold text-white">
                    {project.title}
                  </h3>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ================= MODAL ================= */}
      {activeProject && (
        <div className="fixed inset-0 z-[100] bg-black/90 overflow-y-auto">
          <button
            onClick={() => setActiveProject(null)}
            className="absolute top-4 right-4 md:top-6 md:right-6 text-white/70 hover:text-white"
          >
            <X className="h-6 w-6" />
          </button>

          <div className="container min-h-screen flex flex-col justify-center py-12">
            <div className="grid gap-10 lg:grid-cols-2 items-center">
              <div
                ref={imageWrapperRef}
                className="relative aspect-video w-full rounded-xl overflow-hidden"
              >
                <Image
                  key={activeIndex}
                  src={activeProject.images[activeIndex]}
                  alt={activeProject.title}
                  fill
                  className="absolute inset-0 object-cover image-current"
                />

                <Image
                  src={
                    activeProject.images[
                      activeIndex === activeProject.images.length - 1
                        ? 0
                        : activeIndex + 1
                    ]
                  }
                  alt=""
                  fill
                  className="absolute inset-0 object-cover image-next"
                />

                {/* PROGRESS RING */}
                <div className="absolute top-4 right-4">
                  <svg width="44" height="44">
                    <circle
                      cx="22"
                      cy="22"
                      r="18"
                      stroke="rgba(255,255,255,0.25)"
                      strokeWidth="3"
                      fill="none"
                    />
                    <circle
                      ref={progressRef}
                      cx="22"
                      cy="22"
                      r="18"
                      stroke="white"
                      strokeWidth="3"
                      fill="none"
                      strokeLinecap="round"
                      transform="rotate(-90 22 22)"
                    />
                  </svg>
                </div>

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {activeProject.images.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        directionRef.current = i > activeIndex ? 1 : -1;
                        setActiveIndex(i);
                      }}
                      className={`h-1.5 w-8 sm:w-10 rounded-full ${
                        i === activeIndex
                          ? "bg-white"
                          : "bg-white/30 hover:bg-white/50"
                      }`}
                    />
                  ))}
                </div>

                {activeProject.images.length > 1 && (
                  <>
                    <button
                      onClick={() => {
                        directionRef.current = -1;
                        setActiveIndex((i) =>
                          i === 0 ? activeProject.images.length - 1 : i - 1
                        );
                      }}
                      className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 text-white"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </button>

                    <button
                      onClick={() => {
                        directionRef.current = 1;
                        setActiveIndex((i) =>
                          i === activeProject.images.length - 1 ? 0 : i + 1
                        );
                      }}
                      className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 text-white"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </button>
                  </>
                )}
              </div>

              <div className="text-white space-y-6 md:space-y-8 max-w-xl">
                <span className="text-primary text-sm uppercase tracking-wide">
                  {activeProject.location}
                </span>
                <h3 className="text-2xl md:text-4xl font-bold leading-tight">
                  {activeProject.title}
                </h3>
                <p className="text-base md:text-lg text-white/80 leading-relaxed">
                  {activeProject.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
