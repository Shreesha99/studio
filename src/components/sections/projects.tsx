"use client";

import Image from 'next/image';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useRef } from 'react';

const projectIds = [
  'project-geological-survey',
  'project-cii-bangalore',
  'project-nit-surathkal',
  'project-auditorium',
];

const projectDetails: { [key: string]: { title: string; location: string } } = {
  'project-geological-survey': { title: 'Geological Survey of India', location: 'Bangalore' },
  'project-cii-bangalore': { title: 'CII Office', location: 'Bangalore' },
  'project-nit-surathkal': { title: 'New Wing, NIT', location: 'Surathkal' },
  'project-auditorium': { title: 'Auditorium Electrification', location: 'Various Locations' },
}

export function Projects() {
  const container = useRef(null);
  const projects = projectIds.map(id => {
    const image = PlaceHolderImages.find(p => p.id === id);
    const details = projectDetails[id];
    return { ...image, ...details };
  });

  useGSAP(() => {
    gsap.fromTo('.section-header-projects', { y: 50, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
        scrollTrigger: {
            trigger: '.section-header-projects',
            start: 'top 85%',
        }
    });

    gsap.utils.toArray<gsap.DOMTarget>('.project-card').forEach((card, i) => {
        gsap.fromTo(card, { y: 50, opacity: 0 }, {
            y: 0, opacity: 1, duration: 0.6, ease: 'power2.out',
            scrollTrigger: {
                trigger: card,
                start: 'top 90%',
            }
        });
    });

  }, { scope: container });

  return (
    <section id="projects" ref={container} className="py-24 lg:py-32 bg-background overflow-hidden">
      <div className="container space-y-16">
        <div className="text-center space-y-4 section-header-projects">
          <span className="text-primary font-semibold">Our Work</span>
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-foreground">
            Featured Projects
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
            A showcase of our successfully completed government and commercial electrical projects.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            project.imageUrl && (
              <Card key={index} className="overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 group project-card border-border bg-card rounded-lg">
                <div className="relative h-80 w-full">
                  <Image
                    src={project.imageUrl}
                    alt={project.description || project.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    data-ai-hint={project.imageHint}
                  />
                </div>
                 <div className="p-6">
                    <p className="text-sm text-primary font-semibold">{project.location}</p>
                    <h3 className="font-bold text-white text-xl mt-1">{project.title}</h3>
                </div>
              </Card>
            )
          ))}
        </div>
      </div>
    </section>
  );
}
