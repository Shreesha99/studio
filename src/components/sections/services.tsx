"use client";

import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { ServiceItem, type Service } from '@/components/service-item';
import { ServiceImage } from '@/components/service-image';

const services: Service[] = [
  {
    id: 1,
    iconName: "Gavel",
    title: "Government Projects",
    description: "Specializing in electrical tendering and execution for state and central government projects.",
    imageUrl: "https://images.unsplash.com/photo-1494476105528-620b211f568d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxnb3Zlcm5tZW50JTIwYnVpbGRpbmd8ZW58MHx8fHwxNzY4MzI4MDg5fDA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    id: 2,
    iconName: "Lightbulb",
    title: "Electrical Installations",
    description: "Complete installation services for new buildings, infrastructure, and public facilities.",
    imageUrl: "https://images.unsplash.com/photo-1517420704952-d9f39e95b41d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGVsZWN0cmljYWwlMjBwYW5lbHxlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    id: 3,
    iconName: "Building",
    title: "Auditorium & Public Spaces",
    description: "Expert design and installation of lighting and electrical systems for auditoriums and large venues.",
    imageUrl: "https://images.unsplash.com/photo-1722321974479-a6722bea8b23?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxhdWRpdG9yaXVtJTIwbGlnaHRpbmd8ZW58MHx8fHwxNzY4NDEzOTM3fDA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    id: 4,
    iconName: "Network",
    title: "Infrastructure Setup",
    description: "Electrical setup for new wings of institutions, and large-scale infrastructure projects.",
    imageUrl: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHx1bml2ZXJzaXR5JTIwY2FtcHVzfGVufDB8fHx8MTc2ODMzNjk0M3ww&ixlib=rb-4.1.0&q=80&w=1080"
  },
];

export function Services() {
  const [activeService, setActiveService] = useState<Service | null>(services[0]);
  const container = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: 'top 80%',
      },
    });

    tl.fromTo('.section-header-services', { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' });
    tl.fromTo('.service-item', { x: -50, opacity: 0 }, { x: 0, opacity: 1, stagger: 0.15, duration: 0.6, ease: 'power2.out' }, "-=0.5");
    tl.fromTo('.service-image-container', { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out'}, '-=0.8');

  }, { scope: container });

  return (
    <section id="services" ref={container} className="py-24 lg:py-32 bg-background overflow-hidden">
      <div className="container space-y-16">
        <div className="text-center space-y-4 section-header-services max-w-3xl mx-auto">
          <span className="text-primary font-semibold">Our Services</span>
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-foreground">
            Comprehensive Electrical Solutions
          </h2>
          <p className="text-lg text-muted-foreground">
            We provide a complete range of electrical services tailored for government contracts, ensuring quality, safety, and efficiency.
          </p>
        </div>
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <div className="flex flex-col border-t border-border">
            {services.map((service) => (
              <ServiceItem
                key={service.id}
                service={service}
                onMouseEnter={() => setActiveService(service)}
              />
            ))}
          </div>
          <div className="hidden lg:block sticky top-24 service-image-container">
            {activeService && <ServiceImage service={activeService} />}
          </div>
        </div>
      </div>
    </section>
  );
}
