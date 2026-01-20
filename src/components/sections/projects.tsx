"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { projects } from "@/data/projects";

gsap.registerPlugin(ScrollTrigger);

/* ================= PROJECT DATA ================= */
const IMAGE_DURATION = 4000;
const PROJECTS_PER_PAGE = 4;
const PAGE_DURATION = 5000;

/* ================= COMPONENT ================= */

export function Projects() {
  const container = useRef<HTMLDivElement | null>(null);
  const imageWrapperRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<SVGCircleElement | null>(null);
  const directionRef = useRef<1 | -1>(1);
  const [pageIndex, setPageIndex] = useState(0);
  const pageProgressRef = useRef<SVGCircleElement | null>(null);
  const pageTimelineRef = useRef<gsap.core.Tween | null>(null);
  const getIndicatorWidth = (count: number) => {
    if (count <= 5) return 28;
    if (count <= 10) return 20;
    if (count <= 20) return 14;
    if (count <= 40) return 10;
    return 6;
  };

  const totalPages = Math.ceil(projects.length / PROJECTS_PER_PAGE);
  const pagedProjects = projects.slice(
    pageIndex * PROJECTS_PER_PAGE,
    pageIndex * PROJECTS_PER_PAGE + PROJECTS_PER_PAGE
  );

  const [activeProject, setActiveProject] = useState<
    (typeof projects)[0] | null
  >(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!activeProject) return;

    const scrollY = window.scrollY;

    // Lock scroll safely (App Router compatible)
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.documentElement.style.overflow = "";
      window.scrollTo(0, scrollY);
    };
  }, [activeProject]);

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

  useEffect(() => {
    // 🚫 If modal is open, DO NOT autoplay pages
    if (activeProject) {
      pageTimelineRef.current?.kill();
      return;
    }

    if (!pageProgressRef.current) return;

    const radius = 16;
    const circumference = 2 * Math.PI * radius;

    pageTimelineRef.current?.kill();

    gsap.set(pageProgressRef.current, {
      strokeDasharray: circumference,
      strokeDashoffset: circumference,
    });

    pageTimelineRef.current = gsap.to(pageProgressRef.current, {
      strokeDashoffset: 0,
      duration: PAGE_DURATION / 1000,
      ease: "linear",
      onComplete: () => {
        setPageIndex((p) => (p === totalPages - 1 ? 0 : p + 1));
      },
    });

    return () => {
      pageTimelineRef.current?.kill();
    };
  }, [pageIndex, totalPages, activeProject]);

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
        <div className="container space-y-12 md:space-y-16 relative">
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
          {/* GRID PAGINATION — RESPONSIVE */}
          <div className="flex justify-end">
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Hide label on mobile */}
              <span className="text-muted-foreground">Pages</span>

              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  type="button"
                  key={i}
                  onClick={() => {
                    pageTimelineRef.current?.kill();
                    setPageIndex(i);
                  }}
                  className="
          relative
          flex items-center justify-center
          text-foreground
          h-8 w-8
          sm:h-9 sm:w-9
          md:h-10 md:w-10
        "
                >
                  <svg
                    className="absolute inset-0"
                    width="100%"
                    height="100%"
                    viewBox="0 0 40 40"
                  >
                    <circle
                      cx="20"
                      cy="20"
                      r="16"
                      stroke="hsl(var(--muted-foreground))"
                      strokeWidth="2"
                      fill="none"
                    />

                    {i === pageIndex && (
                      <circle
                        ref={pageProgressRef}
                        cx="20"
                        cy="20"
                        r="16"
                        stroke="hsl(var(--foreground))"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        transform="rotate(-90 20 20)"
                      />
                    )}
                  </svg>

                  <span className="relative z-10 text-xs sm:text-sm font-semibold">
                    {i + 1}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {pagedProjects.map((project) => (
              <button
                type="button"
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

          <div className="max-w-7xl mx-auto min-h-screen flex flex-col justify-center px-4 py-12">
            <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] items-center">
              <div
                ref={imageWrapperRef}
                className="relative h-[22rem] sm:h-[26rem] md:h-[30rem] lg:h-[36rem] w-full rounded-2xl overflow-hidden"
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

                <div className="absolute bottom-4 inset-x-0 flex justify-center px-4 pointer-events-auto">
                  <div className="w-full max-w-[520px] overflow-hidden">
                    <div className="flex items-center justify-center gap-1">
                      {activeProject.images.map((_, i) => {
                        const dotWidth = getIndicatorWidth(
                          activeProject.images.length
                        );

                        return (
                          <button
                            key={i}
                            onClick={() => {
                              directionRef.current = i > activeIndex ? 1 : -1;
                              setActiveIndex(i);
                            }}
                            style={{ width: dotWidth }}
                            className={`h-1.5 rounded-full transition-all duration-300 ${
                              i === activeIndex
                                ? "bg-white"
                                : "bg-white/30 hover:bg-white/50"
                            }`}
                          />
                        );
                      })}
                    </div>
                  </div>
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
