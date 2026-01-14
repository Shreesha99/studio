"use client";

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';
import { ArrowDown } from 'lucide-react';

export function Hero() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-background');
  const container = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      ".hero-title",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.2 }
    );
    gsap.fromTo(
      ".hero-p",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.4 }
    );
    gsap.fromTo(
      ".hero-buttons",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.6 }
    );
     gsap.fromTo(
      ".hero-image",
      { scale: 1.1, opacity: 0 },
      { scale: 1, opacity: 1, duration: 2, ease: 'power2.out' }
    );
    gsap.fromTo(
      ".scroll-indicator",
      { y: -20, opacity: 0},
      { y: 0, opacity: 1, duration: 1.5, ease: 'power2.out', delay: 1, repeat: -1, yoyo: true}
    )
  }, { scope: container });

  return (
    <section ref={container} id="home" className="relative w-full h-screen min-h-[700px] flex items-center justify-center text-white overflow-hidden">
      {heroImage && (
         <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover hero-image"
            priority
            quality={100}
            data-ai-hint={heroImage.imageHint}
          />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
      <div className="relative z-10 container text-center space-y-8 pt-24">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-headline font-black tracking-tight uppercase drop-shadow-lg hero-title">
          Powering Progress
        </h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto text-neutral-200 drop-shadow-sm hero-p">
          Your trusted partner for government electrical contracts, delivering excellence and reliability since day one.
        </p>
        <div className="flex gap-4 justify-center hero-buttons">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-full px-8">
            <Link href="#services">Our Services</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="text-white border-white hover:bg-white/10 hover:text-white rounded-full px-8 font-bold">
            <Link href="#contact">Contact Us</Link>
          </Button>
        </div>
      </div>
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 scroll-indicator">
        <span className="text-sm uppercase">Scroll</span>
        <ArrowDown className="w-5 h-5"/>
      </div>
    </section>
  );
}
