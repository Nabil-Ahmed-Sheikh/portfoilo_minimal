import type { PortfolioData } from '@/types';
import { personal, socialLinks } from '@/data/personal';
import { projects } from '@/data/projects';
import { experience } from '@/data/experience';
import { stack } from '@/data/stack';
import { stats } from '@/data/stats';

const placeholder: PortfolioData = {
  personal,
  socialLinks,
  projects,
  experience,
  stack,
  stats,
};

export async function fetchPortfolio(): Promise<PortfolioData> {
  const apiUrl = process.env.PORTFOLIO_API_URL;

  // No external API configured — serve static placeholder data
  if (!apiUrl) return placeholder;

  try {
    const res = await fetch(apiUrl, { next: { revalidate: 60 } });
    if (!res.ok) return placeholder;

    const data: Partial<PortfolioData> = await res.json();

    // Merge: use API data when present, fall back to placeholders for missing fields
    return {
      personal: data.personal ?? placeholder.personal,
      socialLinks: data.socialLinks?.length ? data.socialLinks : placeholder.socialLinks,
      projects: data.projects?.length ? data.projects : placeholder.projects,
      experience: data.experience?.length ? data.experience : placeholder.experience,
      stack: data.stack?.length ? data.stack : placeholder.stack,
      stats: data.stats?.length ? data.stats : placeholder.stats,
    };
  } catch {
    return placeholder;
  }
}
