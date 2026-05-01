import type { ExperienceEntry } from '@/types';

export const experience: ExperienceEntry[] = [
  {
    id: 'flex-connect',
    company: 'Flex Connect (Innovate Calgary)',
    role: 'Intern',
    period: 'Sep 2024 — Dec 2024',
    description:
      'Spearheaded development of a cloud application for real-time power data monitoring using Node.js, Next.js, DataHub, and Grafana. Optimized APIs and implemented caching mechanisms to reduce latency, and automated data validation tests with Jest to increase regression coverage.',
  },
  {
    id: 'sidetrek-cloud',
    company: 'Sidetrek',
    role: 'Cloud Engineer I',
    period: 'Jun 2024 — Aug 2024',
    description:
      'Worked on a scalable ETL tool for data processing and visualization. Developed and managed infrastructure as code using Terraform, ensuring consistent deployments across environments and saving up to 68% in cost redundancy. Built a Jest-based automated framework to validate REST endpoints.',
  },
  {
    id: 'sidetrek-swe',
    company: 'Sidetrek',
    role: 'Software Engineer II',
    period: 'Jul 2022 — Jul 2023',
    description:
      'Delivered key features for the Sidetrek platform including API generation and MLflow integration. Spearheaded development using AWS services, Docker, and Kubernetes. Implemented data pipelines and workflows using Airflow and BentoML, enhancing ML lifecycle scalability.',
  },
  {
    id: 'inevex',
    company: 'Inevex Solutions',
    role: 'Software Engineer',
    period: 'Sep 2021 — Jul 2022',
    description:
      'Designed and developed full-stack client platforms ensuring 99% uptime. Introduced a real-time chat system using Socket.io for low-latency communication and supported beta testing of internal tools. Designed Mocha-based API validation tests to ensure secure data flow across microservices.',
  },
  {
    id: 'ihealthscreen',
    company: 'iHealthScreen Inc.',
    role: 'Software Engineer',
    period: 'Sep 2020 — May 2021',
    description:
      'Built the backend of a HIPAA-compliant telemedicine application connecting 2000+ patients with doctors daily. Implemented appointment scheduling, messaging, video calling, e-prescriptions, and disease prediction. Achieved a 12× improvement in API response times by restructuring the database layer.',
  },
];
