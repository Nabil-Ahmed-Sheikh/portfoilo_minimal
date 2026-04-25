import { fetchPortfolio } from '@/lib/portfolio';
import { Nav } from '@/components/Nav';
import { Hero } from '@/components/Hero';
import { StatsBar } from '@/components/StatsBar';
import { Marquee } from '@/components/Marquee';
import { Projects } from '@/components/Projects';
import { Experience } from '@/components/Experience';
import { TechStack } from '@/components/TechStack';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';

export default async function Home() {
  const { personal, socialLinks, projects, experience, stack, stats } = await fetchPortfolio();

  return (
    <>
      <Nav personal={personal} />
      <main>
        <Hero personal={personal} />
        <StatsBar stats={stats} />
        <Marquee />
        <Projects projects={projects} />
        <Experience experience={experience} />
        <TechStack stack={stack} />
        <Contact socialLinks={socialLinks} />
      </main>
      <Footer personal={personal} />
    </>
  );
}
