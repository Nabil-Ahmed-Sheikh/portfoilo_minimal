import type { PortfolioData } from '@/types';
import { personal as fallbackPersonal, socialLinks as fallbackSocialLinks } from '@/data/personal';
import { projects as fallbackProjects } from '@/data/projects';
import { experience as fallbackExperience } from '@/data/experience';
import { stack as fallbackStack } from '@/data/stack';
import { stats as fallbackStats } from '@/data/stats';
import * as db from '@/lib/db';

const staticFallback: PortfolioData = {
  personal: fallbackPersonal,
  socialLinks: fallbackSocialLinks,
  projects: fallbackProjects,
  experience: fallbackExperience,
  stack: fallbackStack,
  stats: fallbackStats,
};

export async function fetchPortfolio(): Promise<PortfolioData> {
  try {
    const [personal, socialLinks, projects, experience, stack, stats] = await Promise.all([
      db.getPersonal(),
      db.getSocialLinks(),
      db.getProjects(),
      db.getExperience(),
      db.getStack(),
      db.getStats(),
    ]);

    return {
      personal: personal ?? fallbackPersonal,
      socialLinks: socialLinks.length ? socialLinks : fallbackSocialLinks,
      projects: projects.length ? projects : fallbackProjects,
      experience: experience.length ? experience : fallbackExperience,
      stack: stack.length ? stack : fallbackStack,
      stats: stats.length ? stats : fallbackStats,
    };
  } catch {
    // DB not configured or unavailable — serve from static seed data
    return staticFallback;
  }
}
