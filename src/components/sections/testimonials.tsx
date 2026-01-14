import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

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
  return (
    <section id="testimonials" className="py-16 lg:py-24 bg-background">
      <div className="container space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">
            What Our Clients Say
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-foreground/80">
            Building trust one project at a time.
          </p>
        </div>
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className="w-full max-w-5xl mx-auto"
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1 h-full">
                  <Card className="flex flex-col h-full shadow-md bg-secondary rounded-lg">
                    <CardContent className="flex-grow p-6 flex flex-col justify-between">
                       <blockquote className="italic text-foreground/80 mb-4 flex-grow">
                        "{testimonial.quote}"
                      </blockquote>
                      <div className="flex items-center gap-4 mt-auto">
                        <Avatar>
                          <AvatarImage src={testimonial.image} alt={testimonial.name} />
                          <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold">{testimonial.name}</p>
                          <p className="text-sm text-foreground/70">{testimonial.title}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:inline-flex" />
          <CarouselNext className="hidden sm:inline-flex" />
        </Carousel>
      </div>
    </section>
  );
}
