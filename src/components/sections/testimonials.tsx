"use client";

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import {Star} from "lucide-react";
import {useGSAP} from "@gsap/react";
import {useRef} from "react";
import gsap from "gsap";

const testimonials = [
  {
    name: 'Mr. Sharma',
    title: 'Project Manager, GSI',
    image: 'https://picsum.photos/seed/avatar1/100/100',
    quote: 'Suprabha Electricals delivered exceptional quality on our Bangalore facility. Their professionalism and attention to detail were evident throughout the project. Highly recommended.',
  },
  {
    name: 'Dr. Anjali Rao',
    title: 'Dean, NIT Surathkal',
    image: 'https://picsum.photos/seed/avatar2/100/100',
    quote: 'The electrical work for our new wing was completed ahead of schedule and within budget. The team was efficient, skilled, and a pleasure to work with.',
  },
  {
    name: 'Prakash Menon',
    title: 'Director, CII',
    image: 'https://picsum.photos/seed/avatar3/100/100',
    quote: 'Their expertise in handling large-scale government contracts is unmatched. They navigated the complexities with ease and delivered a flawless result for our auditorium.',
  },
];

export function Testimonials() {
    const container = useRef(null);
    useGSAP(() => {
        gsap.fromTo('.testimonials-header', {y: 50, opacity: 0}, {
            y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
            scrollTrigger: {
                trigger: '.testimonials-header',
                start: 'top 85%',
            }
        });
        gsap.fromTo('.testimonials-carousel', {y: 50, opacity: 0}, {
            y: 0, opacity: 1, duration: 1.2, ease: 'power3.out',
            scrollTrigger: {
                trigger: '.testimonials-carousel',
                start: 'top 85%',
            }
        });
    }, {scope: container})

  return (
    <section id="testimonials" ref={container} className="py-24 lg:py-32 bg-background">
      <div className="container space-y-16">
        <div className="text-center space-y-4 testimonials-header">
          <span className="text-primary font-semibold">Testimonials</span>
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-foreground">
            What Our Clients Say
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
            Building trust one project at a time with 100% client satisfaction.
          </p>
        </div>
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className="w-full max-w-6xl mx-auto testimonials-carousel"
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1 h-full">
                  <Card className="flex flex-col h-full shadow-md bg-card rounded-lg border-border">
                    <CardContent className="flex-grow p-6 flex flex-col justify-between">
                       <div className="flex gap-1 mb-4">
                           {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 text-primary fill-primary"/>)}
                       </div>
                       <blockquote className="italic text-muted-foreground mb-4 flex-grow">
                        "{testimonial.quote}"
                      </blockquote>
                      <div className="flex items-center gap-4 mt-auto">
                        <Avatar>
                          <AvatarImage src={testimonial.image} alt={testimonial.name} />
                          <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold text-foreground">{testimonial.name}</p>
                          <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden xl:inline-flex" />
          <CarouselNext className="hidden xl:inline-flex" />
        </Carousel>
      </div>
    </section>
  );
}
