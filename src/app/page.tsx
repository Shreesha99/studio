import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Hero } from '@/components/sections/hero';
import { About } from '@/components/sections/about';
import { Services } from '@/components/sections/services';
import { Projects } from '@/components/sections/projects';
import { Testimonials } from '@/components/sections/testimonials';
import { Contact } from '@/components/sections/contact';
import ChatBot from '@/components/chat-bot';
import { WhyChooseUs } from '@/components/sections/why-choose-us';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        <Hero />
        <About />
        <Services />
        <WhyChooseUs />
        <Projects />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <ChatBot />
    </div>
  );
}
