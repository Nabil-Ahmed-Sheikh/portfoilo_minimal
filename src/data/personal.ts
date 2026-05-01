import type { PersonalInfo, SocialLink } from '@/types';

export const personal: PersonalInfo = {
  name: 'Nabil Ahmed',
  tagline: 'Full-Stack & Cloud Engineer',
  bio: 'Full-stack and cloud engineer with 5+ years shipping production systems — from HIPAA-compliant telemedicine to open-source data infrastructure and AWS cloud architecture. I turn complex problems into reliable, well-tested solutions.',
  email: 'nabil.ahmednsu@gmail.com',
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
    display: 'nabil.ahmednsu@gmail.com',
    href: 'mailto:nabil.ahmednsu@gmail.com',
  },
];
