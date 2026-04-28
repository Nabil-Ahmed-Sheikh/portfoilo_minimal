import type { Project } from '@/types';

export const projects: Project[] = [
  {
    id: 'sidetrek',
    title: 'Sidetrek',
    tag: 'Data Infrastructure · Open Source',
    description:
      'Make your data pipeline the easy way. A streamlined platform for building, managing, and monitoring data workflows at scale.',
    href: 'https://github.com/Nabil-Ahmed-Sheikh',
    arrowLabel: 'GitHub →',
    longDescription:
      'Sidetrek is an open-source data infrastructure platform designed to simplify complex data pipeline management. Built to handle enterprise-scale workflows, it provides a unified interface for building, monitoring, and scaling data pipelines without traditional operational overhead. The platform integrates seamlessly with popular data tools and cloud providers, letting teams focus on insights rather than infrastructure.',
    tech: ['Python', 'Apache Airflow', 'AWS', 'Docker', 'PostgreSQL', 'Redis', 'FastAPI'],
    highlights: [
      'Reduced data pipeline setup time by 70% compared to traditional approaches',
      'Supports 15+ data source integrations out of the box',
      'Built-in monitoring and alerting for pipeline health',
      'Open-source with active community contributions',
    ],
    year: '2023',
    role: 'Cloud Engineer & Platform Architect',
    liveHref: 'https://sidetrek.com',
  },
  {
    id: 'cloud-infra',
    title: 'Cloud Infrastructure',
    subtitle: '@ SideTrek',
    tag: 'Cloud · AWS',
    description:
      'Designed and deployed scalable cloud architectures on AWS, optimizing reliability, cost, and developer experience for production workloads.',
    href: 'https://github.com/Nabil-Ahmed-Sheikh',
    arrowLabel: 'GitHub →',
    longDescription:
      "A comprehensive cloud infrastructure overhaul for SideTrek's production environment. This initiative migrated from a monolithic deployment to a distributed microservices architecture on AWS, implementing Infrastructure as Code and establishing robust CI/CD pipelines that dramatically improved deployment frequency and system reliability.",
    tech: ['AWS ECS', 'Terraform', 'GitHub Actions', 'CloudWatch', 'RDS', 'ElastiCache', 'ALB', 'Route 53'],
    highlights: [
      'Achieved 99.9% uptime SLA through multi-AZ deployment strategy',
      'Reduced infrastructure costs by 35% through right-sizing and spot instances',
      'Implemented zero-downtime deployments with blue/green strategy',
      'Full Infrastructure as Code with Terraform for reproducibility',
    ],
    year: '2023 – 2024',
    role: 'Cloud Engineer I',
  },
];
