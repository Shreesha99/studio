"use client";

import { useRef } from 'react';
import { CheckCircle, Award, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const features = [
  {
    icon: <Award className="h-10 w-10 text-primary" />,
    title: "Proven Expertise",
    description: "Years of specialized experience in government electrical contracts, ensuring compliance and quality.",
  },
  {
    icon: <CheckCircle className="h-10 w-10 text-primary" />,
    title: "Timely Delivery",
    description: "A strong track record of completing projects on schedule and within budget, without compromising on quality.",
  },
  {
    icon: <Users className="h-10 w-10 text-primary" />,
    title: "Skilled Professionals",
    description: "A dedicated team of certified and experienced electricians and project managers at your service.",
  },
];

export function WhyChooseUs() {
  const container = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: 'top 80%',
      },
    });

    tl.fromTo('.section-header-why-choose-us', { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' });
    tl.fromTo('.feature-card', { y: 50, opacity: 0, scale: 0.95 }, { y: 0, opacity: 1, scale: 1, stagger: 0.15, duration: 0.6, ease: 'power2.out' }, "-=0.5");

  }, { scope: container });

  return (
    <section id="why-choose-us" ref={container} className="py-16 lg:py-24 bg-background overflow-hidden">
      <div className="container space-y-12">
        <div className="text-center space-y-4 section-header-why-choose-us">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">
            Why Choose Us?
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-foreground/80">
            Our commitment to excellence sets us apart.
          </p>
        </div>
        <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="text-center shadow-md hover:shadow-xl transition-shadow duration-300 feature-card bg-card">
              <CardHeader className="items-center pb-4">
                {feature.icon}
              </CardHeader>
              <CardContent className="space-y-2">
                <CardTitle className="text-xl font-headline">{feature.title}</CardTitle>
                <p className="text-foreground/70">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
