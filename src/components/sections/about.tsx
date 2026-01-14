"use client";

import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useRef } from 'react';
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {Check} from "lucide-react";

export function About() {
  const aboutImage = PlaceHolderImages.find((img) => img.id === 'about-image');
  const container = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: 'top 80%',
      },
    });

    tl.fromTo('.about-image-container', { x: -50, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: 'power3.out' })
      .fromTo('.about-content', { x: 50, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: 'power3.out' }, "-=0.8");
      
  }, { scope: container });

  const aboutFeatures = [
    "Quality and Safety Commitment",
    "Timely Project Execution",
    "Expertise in Government Contracts"
  ]

  return (
    <section id="about" ref={container} className="py-24 lg:py-32 bg-background overflow-hidden">
        <div className="container grid lg:grid-cols-2 gap-16 items-center">
            <div className="about-image-container rounded-lg overflow-hidden">
                {aboutImage && (
                    <Image
                        src={aboutImage.imageUrl}
                        alt={aboutImage.description}
                        width={600}
                        height={700}
                        className="object-cover w-full h-auto aspect-[4/5]"
                        data-ai-hint={aboutImage.imageHint}
                    />
                )}
            </div>
            <div className="space-y-8 about-content">
                <div className="space-y-4">
                    <span className="text-primary font-semibold">About Us</span>
                    <h2 className="text-3xl md:text-4xl font-headline font-bold text-foreground">
                        Your Trusted Electrical Partner
                    </h2>
                </div>
                <p className="text-muted-foreground">
                    Suprabha Electricals is a premier electrical contracting firm specializing in government projects across Karnataka, India. With a steadfast commitment to quality, safety, and timely execution, we have built a reputation for excellence in the public sector. Our team of certified professionals is equipped to handle projects of any scale, from new infrastructure installations to complex auditorium setups.
                </p>
                <div className="space-y-4">
                    {aboutFeatures.map((feature) => (
                        <div key={feature} className="flex items-center gap-3">
                            <Check className="h-5 w-5 text-primary flex-shrink-0"/>
                            <span className="text-muted-foreground">{feature}</span>
                        </div>
                    ))}
                </div>

                <Button asChild size="lg" className="rounded-full text-primary-foreground font-bold">
                    <Link href="#contact">Contact Us Today</Link>
                </Button>
            </div>
        </div>
    </section>
  );
}
