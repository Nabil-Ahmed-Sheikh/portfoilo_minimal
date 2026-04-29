import type { PortfolioData } from '@/types';
import { personal, socialLinks } from '@/data/personal';
import { projects } from '@/data/projects';
import { experience } from '@/data/experience';
import { stack } from '@/data/stack';
import { stats } from '@/data/stats';
import { readOverride } from '@/lib/override';

const placeholder: PortfolioData = {
  personal,
  socialLinks,
  projects,
  experience,
  stack,
  stats,
};

function mergeById<T extends { id: string }>(
  base: T[],
  overrides: T[] | undefined,
  deletedIds: string[] | undefined,
): T[] {
  const filtered = deletedIds?.length
    ? base.filter((item) => !deletedIds.includes(item.id))
    : base;

  if (!overrides?.length) return filtered;

  const overrideMap = new Map(overrides.map((item) => [item.id, item]));
  const merged = filtered.map((item) => overrideMap.get(item.id) ?? item);
  const existingIds = new Set(filtered.map((item) => item.id));
  const newItems = overrides.filter((item) => !existingIds.has(item.id));
  return [...merged, ...newItems];
}

export async function fetchPortfolio(): Promise<PortfolioData> {
  const override = await readOverride();

  const merged: PortfolioData = {
    personal: override.personal ?? placeholder.personal,
    socialLinks: override.socialLinks?.length ? override.socialLinks : placeholder.socialLinks,
    projects: mergeById(placeholder.projects, override.projects, override.deletedProjectIds),
    experience: mergeById(
      placeholder.experience,
      override.experience,
      override.deletedExperienceIds,
    ),
    stack: mergeById(placeholder.stack, override.stack, override.deletedStackIds),
    stats: override.stats?.length ? override.stats : placeholder.stats,
  };

  const apiUrl = process.env.PORTFOLIO_API_URL;
  if (!apiUrl) return merged;

  try {
    const res = await fetch(apiUrl, { next: { revalidate: 60 } });
    if (!res.ok) return merged;
    const data: Partial<PortfolioData> = await res.json();
    return {
      personal: data.personal ?? merged.personal,
      socialLinks: data.socialLinks?.length ? data.socialLinks : merged.socialLinks,
      projects: data.projects?.length ? data.projects : merged.projects,
      experience: data.experience?.length ? data.experience : merged.experience,
      stack: data.stack?.length ? data.stack : merged.stack,
      stats: data.stats?.length ? data.stats : merged.stats,
    };
  } catch {
    return merged;
  }
}
