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
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: 'top 80%',
      },
    });

    tl.fromTo('.section-header-projects', { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' });
    tl.fromTo('.project-card', { y: 50, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.15, duration: 0.6, ease: 'power2.out' }, "-=0.5");

  }, { scope: container });

  return (
    <section id="projects" ref={container} className="py-16 lg:py-24 bg-background overflow-hidden">
      <div className="container space-y-12">
        <div className="text-center space-y-4 section-header-projects">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">
            Our Projects
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-foreground/80">
            A showcase of our successfully completed government electrical projects.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {projects.map((project, index) => (
            project.imageUrl && (
              <Card key={index} className="overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 group project-card">
                <div className="relative h-48 w-full">
                  <Image
                    src={project.imageUrl}
                    alt={project.description || project.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    data-ai-hint={project.imageHint}
                  />
                </div>
                <CardHeader>
                  <CardTitle className="font-headline text-xl">{project.title}</CardTitle>
                  <CardDescription>{project.location}</CardDescription>
                </CardHeader>
              </Card>
            )
          ))}
        </div>
      </div>
    </section>
  );
}
