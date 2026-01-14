"use client";

import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useRef } from 'react';
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {Check, Award, Users, Zap, CheckCircle} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';

const features = [
  {
    icon: <Award className="h-8 w-8 text-primary" />,
    title: "Proven Expertise",
    description: "Years of specialized experience in government electrical contracts, ensuring compliance and quality.",
  },
  {
    icon: <CheckCircle className="h-8 w-8 text-primary" />,
    title: "Timely Delivery",
    description: "A strong track record of completing projects on schedule and within budget, without compromising on quality.",
  },
  {
    icon: <Users className="h-8 w-8 text-primary" />,
    title: "Skilled Professionals",
    description: "A dedicated team of certified and experienced electricians and project managers at your service.",
  },
    {
    icon: <Zap className="h-8 w-8 text-primary" />,
    title: "Modern Technology",
    description: "Utilizing the latest technology and equipment to deliver efficient and reliable electrical solutions.",
  },
];

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
      .fromTo('.about-content', { x: 50, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: 'power3.out' }, "-=0.8")
      .fromTo('.feature-card', { y: 50, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.15, duration: 0.6, ease: 'power2.out' }, "-=0.5");
      
  }, { scope: container });

  const aboutFeatures = [
    "Quality and Safety Commitment",
    "Timely Project Execution",
    "Expertise in Government Contracts"
  ]

  return (
    <section id="about" ref={container} className="py-24 lg:py-32 bg-secondary overflow-hidden">
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
                        Harnessing the Power of Modern Electrical Solutions
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
        <div className="container space-y-16 mt-24">
            <div className="text-center space-y-4">
                <span className="text-primary font-semibold">Why Choose Us</span>
                <h2 className="text-3xl md:text-4xl font-headline font-bold text-foreground">
                    Your Trusted Electrical Partner
                </h2>
                <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
                    Our commitment to excellence, safety, and customer satisfaction sets us apart.
                </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {features.map((feature, index) => (
                    <Card key={index} className="text-center shadow-md hover:shadow-xl transition-all duration-300 feature-card bg-card border-border rounded-lg hover:-translate-y-2 hover:border-primary">
                        <CardHeader className="items-center">
                            <div className="p-4 bg-primary/10 rounded-lg">
                                {feature.icon}
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <CardTitle className="text-xl font-headline">{feature.title}</CardTitle>
                            <CardDescription className="text-muted-foreground">{feature.description}</CardDescription>
                        </CardContent>
                    </Card>
                ))}
            </div>
      </div>
    </section>
  );
}
