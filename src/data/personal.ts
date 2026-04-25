import type { PersonalInfo, SocialLink } from '@/types';

export const personal: PersonalInfo = {
  name: 'Nabil Ahmed',
  tagline: 'Building fast, scalable web apps',
  bio: 'Building fast, scalable web apps. I turn complex problems into elegant, reliable systems — from frontend to cloud infrastructure.',
  email: 'nabilahmed.cloud@gmail.com',
};

export const socialLinks: SocialLink[] = [
  {
    id: 'github',
    label: 'GitHub',
    display: 'github.com/Nabil-Ahmed-Sheikh',
    href: 'https://github.com/Nabil-Ahmed-Sheikh',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    display: 'linkedin.com/in/nabil-ahmed11',
    href: 'https://www.linkedin.com/in/nabil-ahmed11/',
  },
  {
    id: 'email',
    label: 'Email',
    display: 'nabilahmed.cloud@gmail.com',
    href: 'mailto:nabilahmed.cloud@gmail.com',
  },
];
