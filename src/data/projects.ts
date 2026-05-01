import type { Project } from '@/types';

export const projects: Project[] = [
  {
    id: 'sidetrek',
    title: 'Sidetrek',
    tag: 'Data Infrastructure · Open Source',
    description:
      'An open-source CLI tool that streamlines the creation of modern data pipelines, integrating popular tools for ingestion, transformation, storage, and visualization.',
    href: 'https://github.com/Nabil-Ahmed-Sheikh',
    arrowLabel: 'GitHub →',
    longDescription:
      'Sidetrek is an open-source command-line interface (CLI) tool designed to streamline the creation of modern data pipelines. It integrates several popular open-source tools to facilitate data ingestion, transformation, storage, querying, and visualization at scale. Built across two engineering roles, contributing from core feature development to cloud infrastructure.',
    tech: ['Node.js', 'Express.js', 'Go', 'React', 'AWS EKS', 'Docker', 'Kubernetes', 'Airflow', 'MLflow', 'Terraform'],
    highlights: [
      'Developed IaC using Terraform ensuring consistent deployments, saving up to 68% in deployment cost redundancy',
      'Implemented data pipelines and workflows using Apache Airflow and Temporal, enhancing ML and Data Engineering scalability',
      'Contributed to UI development using React, improving user experience and interface design',
      'Supported third-party API integrations and plugin development, expanding platform functionality',
    ],
    year: '2022 – 2024',
    role: 'Software Engineer II → Cloud Engineer I',
    liveHref: 'https://sidetrek.com',
  },
  {
    id: 'myhealth',
    title: 'myHealth',
    subtitle: '@ iHealthScreen',
    tag: 'Healthcare · Telemedicine',
    description:
      'HIPAA-compliant telemedicine platform connecting 2000+ patients with doctors nationwide through secure video, audio, and chat.',
    href: 'https://github.com/Nabil-Ahmed-Sheikh',
    arrowLabel: 'GitHub →',
    longDescription:
      'iHealthScreen Telemedicine connects patients and doctors remotely through secure video, audio, or chat. It offers easy appointment booking, digital prescriptions, and timely care from the comfort of home — serving over 2000 patients daily nationwide. Built to strict HIPAA compliance standards.',
    tech: ['Node.js', 'Express.js', 'Socket.io', 'MongoDB', 'React Native', 'AWS EC2', 'PM2'],
    highlights: [
      'Built backend for a HIPAA-compliant telemedicine app connecting 2000+ patients with doctors daily',
      'Implemented appointment scheduling, messaging, video calling, e-prescriptions, and disease prediction services',
      'Achieved 12× improvement in API response times by restructuring the database layer',
      'Developed Selenium UI tests for video calling, appointment booking, and messaging reliability',
    ],
    year: '2020 – 2021',
    role: 'Software Engineer',
    liveHref: 'https://ihealthscreen.org/telemedicine',
  },
  {
    id: 'power-system',
    title: 'Power System Forecasting Tool',
    subtitle: '@ University of Calgary',
    tag: 'Machine Learning · Energy',
    description:
      'Forecasts electricity generation and demand, then optimizes power flow to minimize total system production cost while respecting transmission constraints.',
    href: 'https://github.com/Nabil-Ahmed-Sheikh',
    arrowLabel: 'GitHub →',
    longDescription:
      'A comprehensive tool that forecasts electricity generation and demand and optimizes power flow to minimize total system production cost while respecting transmission system constraints. Combines machine learning forecasts with Security Constrained Optimal Power Flow (SCOPF) optimization using Gurobi and a PyQt-based Single Line Diagram (SLD) interface.',
    tech: ['Python', 'Scikit-learn', 'XGBoost', 'Random Forest', 'Neural Networks', 'Gurobi', 'MySQL', 'Tkinter'],
    highlights: [
      'Implemented XGBoost, Random Forest, and Neural Networks achieving R² > 0.9 and MAPE ~10% on demand forecasting',
      'Full simulation completes in 13.6 seconds — a notable improvement over industry standards',
      'Seamlessly integrated ML forecasts with SCOPF optimization (Gurobi) for cost-optimal power dispatch',
      'Built robust data frameworks for historical load and real-time weather data integration',
    ],
    year: '2024 – 2025',
    role: 'Lead ML Engineer',
  },
];
