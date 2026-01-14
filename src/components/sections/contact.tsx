"use client";

import { Clock, Mail, Phone, MapPin, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useRef } from 'react';


const contactDetails = [
  {
    icon: <Phone className="h-6 w-6 text-primary" />,
    text: "+91 9448075362",
    href: "tel:+919448075362",
  },
  {
    icon: <Mail className="h-6 w-6 text-primary" />,
    text: "suprabhaele@gmail.com",
    href: "mailto:suprabhaele@gmail.com",
  },
  {
    icon: <Clock className="h-6 w-6 text-primary" />,
    text: "10:00 AM - 6:00 PM (Mon-Sat)",
  },
  {
    icon: <MapPin className="h-6 w-6 text-primary" />,
    text: "Serving Karnataka, India",
  },
];

export function Contact() {
  const container = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: 'top 80%',
      },
    });

    tl.fromTo('.section-header-contact', { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' })
      .fromTo('.contact-detail-item', { x: -50, opacity: 0 }, { x: 0, opacity: 1, stagger: 0.2, duration: 0.6, ease: 'power2.out' }, "-=0.5")
      .fromTo('.contact-card', { x: 50, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: 'power3.out' }, "-=0.8");

  }, { scope: container });

  return (
    <section id="contact" ref={container} className="py-16 lg:py-24 bg-background overflow-hidden">
      <div className="container">
        <div className="text-center space-y-4 mb-12 section-header-contact">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">
            Get in Touch
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-foreground/80">
            Have a project in mind? We'd love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-8 flex flex-col">
            {contactDetails.map((item, index) => (
              <div key={index} className="flex items-center gap-4 contact-detail-item">
                <div className="bg-primary/10 p-3 rounded-full">
                  {item.icon}
                </div>
                {item.href ? (
                  <a href={item.href} className="text-lg text-foreground/80 hover:text-primary transition-colors">{item.text}</a>
                ) : (
                  <p className="text-lg text-foreground/80">{item.text}</p>
                )}
              </div>
            ))}
            <div className="mt-auto pt-8 contact-detail-item">
              <Alert variant="destructive" className="bg-accent/20 border-accent text-accent-foreground">
                <AlertTriangle className="h-4 w-4 text-accent" />
                <AlertTitle className="text-accent font-bold">Please Note</AlertTitle>
                <AlertDescription className="text-accent-foreground/80">
                  We do not provide emergency support. Our working hours are strictly for project-based inquiries.
                </AlertDescription>
              </Alert>
            </div>
          </div>
          
          <Card className="shadow-lg contact-card">
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Send us a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <Input placeholder="Your Name" />
                <Input type="email" placeholder="Your Email" />
                <Textarea placeholder="Your Message" rows={5} />
                <Button type="submit" size="lg" className="w-full">Send Message</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
