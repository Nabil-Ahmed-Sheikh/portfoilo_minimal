import type { StackEntry } from '@/types';

export const stack: StackEntry[] = [
  { id: 'typescript', name: 'TypeScript', type: 'Language', icon: '𝑇𝑆' },
  { id: 'python', name: 'Python', type: 'Language', icon: '🐍' },
  { id: 'go', name: 'Go', type: 'Language', icon: 'Go' },
  { id: 'react', name: 'React', type: 'Frontend', icon: '⚛' },
  { id: 'nodejs', name: 'Node.js', type: 'Backend', icon: '⬡' },
  { id: 'aws', name: 'AWS', type: 'Cloud', icon: '☁' },
  { id: 'docker', name: 'Docker', type: 'DevOps', icon: '🐋' },
  { id: 'kubernetes', name: 'Kubernetes', type: 'DevOps', icon: '☸' },
  { id: 'terraform', name: 'Terraform', type: 'DevOps', icon: '◈' },
  { id: 'postgresql', name: 'PostgreSQL', type: 'Database', icon: '🗄' },
];
