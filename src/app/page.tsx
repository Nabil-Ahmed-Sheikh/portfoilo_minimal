import { Nav } from '@/components/Nav';
import { Hero } from '@/components/Hero';
import { StatsBar } from '@/components/StatsBar';
import { Marquee } from '@/components/Marquee';
import { Projects } from '@/components/Projects';
import { Experience } from '@/components/Experience';
import { TechStack } from '@/components/TechStack';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <StatsBar />
        <Marquee />
        <Projects />
        <Experience />
        <TechStack />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
