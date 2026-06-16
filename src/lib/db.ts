import type {
  ExperienceEntry,
  PersonalInfo,
  Project,
  SocialLink,
  StackEntry,
  Stat,
} from '@/types';
import { getSupabase } from './supabase';

// ─── Row mappers (snake_case DB ↔ camelCase TS) ─────────────────────────────

type Row = Record<string, unknown>;

function toProject(r: Row): Project {
  return {
    id: r.id as string,
    title: r.title as string,
    subtitle: (r.subtitle as string) || undefined,
    tag: r.tag as string,
    description: r.description as string,
    longDescription: (r.long_description as string) || undefined,
    year: (r.year as string) || undefined,
    role: (r.role as string) || undefined,
    href: r.href as string,
    arrowLabel: (r.arrow_label as string) || undefined,
    liveHref: (r.live_href as string) || undefined,
    tech: (r.tech as string[]) || undefined,
    highlights: (r.highlights as string[]) || undefined,
    coverImage: (r.cover_image as string) || undefined,
    images: (r.images as string[]) || undefined,
    videoUrl: (r.video_url as string) || undefined,
  };
}

function fromProject(p: Project): Row {
  return {
    id: p.id,
    title: p.title,
    subtitle: p.subtitle ?? null,
    tag: p.tag,
    description: p.description,
    long_description: p.longDescription ?? null,
    year: p.year ?? null,
    role: p.role ?? null,
    href: p.href,
    arrow_label: p.arrowLabel ?? null,
    live_href: p.liveHref ?? null,
    tech: p.tech ?? null,
    highlights: p.highlights ?? null,
    cover_image: p.coverImage ?? null,
    images: p.images ?? null,
    video_url: p.videoUrl ?? null,
    updated_at: new Date().toISOString(),
  };
}

function toExperience(r: Row): ExperienceEntry {
  return {
    id: r.id as string,
    company: r.company as string,
    role: r.role as string,
    period: r.period as string,
    description: r.description as string,
  };
}

function toStackEntry(r: Row): StackEntry {
  return {
    id: r.id as string,
    name: r.name as string,
    type: r.type as string,
    icon: r.icon as string,
  };
}

function toStat(r: Row): Stat {
  return {
    id: r.id as string,
    value: r.value as string,
    prefix: (r.prefix as string) || undefined,
    label: r.label as string,
  };
}

function toSocialLink(r: Row): SocialLink {
  return {
    id: r.id as string,
    label: r.label as string,
    display: r.display as string,
    href: r.href as string,
  };
}

// ─── Personal ───────────────────────────────────────────────────────────────

export async function getPersonal(): Promise<PersonalInfo | null> {
  const sb = getSupabase();
  const { data, error } = await sb
    .from('portfolio_personal')
    .select('*')
    .eq('id', 'default')
    .single();
  if (error) {
    if (error.code === 'PGRST116') return null;
    throw error;
  }
  return {
    name: data.name,
    tagline: data.tagline,
    bio: data.bio,
    email: data.email,
  };
}

export async function upsertPersonal(info: PersonalInfo): Promise<PersonalInfo> {
  const sb = getSupabase();
  const { data, error } = await sb
    .from('portfolio_personal')
    .upsert({ id: 'default', ...info, updated_at: new Date().toISOString() })
    .select()
    .single();
  if (error) throw error;
  return { name: data.name, tagline: data.tagline, bio: data.bio, email: data.email };
}

// ─── Social links ────────────────────────────────────────────────────────────

export async function getSocialLinks(): Promise<SocialLink[]> {
  const sb = getSupabase();
  const { data, error } = await sb.from('social_links').select('*').order('sort_order');
  if (error) throw error;
  return (data ?? []).map(toSocialLink);
}

export async function upsertSocialLinks(links: SocialLink[]): Promise<SocialLink[]> {
  const sb = getSupabase();
  const rows = links.map((link, i) => ({ ...link, sort_order: i }));
  const { data, error } = await sb
    .from('social_links')
    .upsert(rows, { onConflict: 'id' })
    .select()
    .order('sort_order');
  if (error) throw error;
  return (data ?? []).map(toSocialLink);
}

// ─── Projects ────────────────────────────────────────────────────────────────

export async function getProjects(): Promise<Project[]> {
  const sb = getSupabase();
  const { data, error } = await sb
    .from('projects')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: true });
  if (error) throw error;
  return (data ?? []).map(toProject);
}

export async function getProject(id: string): Promise<Project | null> {
  const sb = getSupabase();
  const { data, error } = await sb.from('projects').select('*').eq('id', id).single();
  if (error) {
    if (error.code === 'PGRST116') return null;
    throw error;
  }
  return toProject(data);
}

export async function upsertProject(project: Project): Promise<Project> {
  const sb = getSupabase();
  const { data, error } = await sb
    .from('projects')
    .upsert(fromProject(project), { onConflict: 'id' })
    .select()
    .single();
  if (error) throw error;
  return toProject(data);
}

export async function deleteProject(id: string): Promise<void> {
  const sb = getSupabase();
  const { error } = await sb.from('projects').delete().eq('id', id);
  if (error) throw error;
}

// ─── Experience ──────────────────────────────────────────────────────────────

export async function getExperience(): Promise<ExperienceEntry[]> {
  const sb = getSupabase();
  const { data, error } = await sb
    .from('experience')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: true });
  if (error) throw error;
  return (data ?? []).map(toExperience);
}

export async function getExperienceEntry(id: string): Promise<ExperienceEntry | null> {
  const sb = getSupabase();
  const { data, error } = await sb.from('experience').select('*').eq('id', id).single();
  if (error) {
    if (error.code === 'PGRST116') return null;
    throw error;
  }
  return toExperience(data);
}

export async function upsertExperience(entry: ExperienceEntry): Promise<ExperienceEntry> {
  const sb = getSupabase();
  const { data, error } = await sb
    .from('experience')
    .upsert(entry, { onConflict: 'id' })
    .select()
    .single();
  if (error) throw error;
  return toExperience(data);
}

export async function deleteExperience(id: string): Promise<void> {
  const sb = getSupabase();
  const { error } = await sb.from('experience').delete().eq('id', id);
  if (error) throw error;
}

// ─── Stack ───────────────────────────────────────────────────────────────────

export async function getStack(): Promise<StackEntry[]> {
  const sb = getSupabase();
  const { data, error } = await sb.from('stack').select('*').order('sort_order');
  if (error) throw error;
  return (data ?? []).map(toStackEntry);
}

export async function getStackEntry(id: string): Promise<StackEntry | null> {
  const sb = getSupabase();
  const { data, error } = await sb.from('stack').select('*').eq('id', id).single();
  if (error) {
    if (error.code === 'PGRST116') return null;
    throw error;
  }
  return toStackEntry(data);
}

export async function upsertStack(entry: StackEntry): Promise<StackEntry> {
  const sb = getSupabase();
  const { data, error } = await sb
    .from('stack')
    .upsert(entry, { onConflict: 'id' })
    .select()
    .single();
  if (error) throw error;
  return toStackEntry(data);
}

export async function deleteStack(id: string): Promise<void> {
  const sb = getSupabase();
  const { error } = await sb.from('stack').delete().eq('id', id);
  if (error) throw error;
}

// ─── Stats ───────────────────────────────────────────────────────────────────

export async function getStats(): Promise<Stat[]> {
  const sb = getSupabase();
  const { data, error } = await sb.from('stats').select('*').order('sort_order');
  if (error) throw error;
  return (data ?? []).map(toStat);
}

export async function upsertStats(stats: Stat[]): Promise<Stat[]> {
  const sb = getSupabase();
  const rows = stats.map((s, i) => ({ ...s, sort_order: i }));
  const { data, error } = await sb
    .from('stats')
    .upsert(rows, { onConflict: 'id' })
    .select()
    .order('sort_order');
  if (error) throw error;
  return (data ?? []).map(toStat);
}

// ─── Contact messages ────────────────────────────────────────────────────────

export async function saveContactMessage(msg: {
  name: string;
  email: string;
  message: string;
}): Promise<void> {
  const sb = getSupabase();
  const { error } = await sb.from('contact_messages').insert(msg);
  if (error) throw error;
}
