export interface Project {
  id: string;
  title: string;
  subtitle?: string;
  tag: string;
  description: string;
  href: string;
  arrowLabel?: string;
  // detail page fields
  longDescription?: string;
  tech?: string[];
  highlights?: string[];
  year?: string;
  role?: string;
  liveHref?: string;
}

export interface ExperienceEntry {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string;
}

export interface StackEntry {
  id: string;
  name: string;
  type: string;
  icon: string;
}

export interface Stat {
  id: string;
  value: string;
  prefix?: string;
  label: string;
}

export interface SocialLink {
  id: string;
  label: string;
  display: string;
  href: string;
}

export interface PersonalInfo {
  name: string;
  tagline: string;
  bio: string;
  email: string;
}

export interface PortfolioData {
  personal: PersonalInfo;
  socialLinks: SocialLink[];
  projects: Project[];
  experience: ExperienceEntry[];
  stack: StackEntry[];
  stats: Stat[];
}
