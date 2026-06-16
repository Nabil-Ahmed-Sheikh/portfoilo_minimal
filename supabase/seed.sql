-- Seed data matching src/data/*.ts — run this after 001_initial.sql
-- Re-run safely: uses INSERT ... ON CONFLICT DO UPDATE

-- ─── Personal ────────────────────────────────────────────────────────────────

INSERT INTO portfolio_personal (id, name, tagline, bio, email)
VALUES (
  'default',
  'Nabil Ahmed',
  'Full-Stack & Cloud Engineer',
  'Full-stack and cloud engineer with 5+ years shipping production systems — from HIPAA-compliant telemedicine to open-source data infrastructure and AWS cloud architecture. I turn complex problems into reliable, well-tested solutions.',
  'nabil.ahmednsu@gmail.com'
)
ON CONFLICT (id) DO UPDATE SET
  name       = EXCLUDED.name,
  tagline    = EXCLUDED.tagline,
  bio        = EXCLUDED.bio,
  email      = EXCLUDED.email,
  updated_at = now();

-- ─── Social links ────────────────────────────────────────────────────────────

INSERT INTO social_links (id, label, display, href, sort_order) VALUES
  ('github',   'GitHub',   'github.com/Nabil-Ahmed-Sheikh',    'https://github.com/Nabil-Ahmed-Sheikh',         0),
  ('linkedin', 'LinkedIn', 'linkedin.com/in/nabil-ahmed11',    'https://www.linkedin.com/in/nabil-ahmed11/',    1),
  ('email',    'Email',    'nabil.ahmednsu@gmail.com',         'mailto:nabil.ahmednsu@gmail.com',               2)
ON CONFLICT (id) DO UPDATE SET
  label      = EXCLUDED.label,
  display    = EXCLUDED.display,
  href       = EXCLUDED.href,
  sort_order = EXCLUDED.sort_order;

-- ─── Projects ────────────────────────────────────────────────────────────────

INSERT INTO projects (id, title, subtitle, tag, description, long_description, year, role, href, arrow_label, live_href, tech, highlights, cover_image, sort_order)
VALUES
(
  'sidetrek',
  'Sidetrek',
  NULL,
  'Data Infrastructure · Open Source',
  'An open-source CLI tool that streamlines the creation of modern data pipelines, integrating popular tools for ingestion, transformation, storage, and visualization.',
  'Sidetrek is an open-source command-line interface (CLI) tool designed to streamline the creation of modern data pipelines. It integrates several popular open-source tools to facilitate data ingestion, transformation, storage, querying, and visualization at scale. Built across two engineering roles, contributing from core feature development to cloud infrastructure.',
  '2022 – 2024',
  'Software Engineer II → Cloud Engineer I',
  'https://github.com/Nabil-Ahmed-Sheikh',
  'GitHub →',
  'https://sidetrek.com',
  ARRAY['Node.js','Express.js','Go','React','AWS EKS','Docker','Kubernetes','Airflow','MLflow','Terraform'],
  ARRAY[
    'Developed IaC using Terraform ensuring consistent deployments, saving up to 68% in deployment cost redundancy',
    'Implemented data pipelines and workflows using Apache Airflow and Temporal, enhancing ML and Data Engineering scalability',
    'Contributed to UI development using React, improving user experience and interface design',
    'Supported third-party API integrations and plugin development, expanding platform functionality'
  ],
  '/images/projects/sidetrek.svg',
  0
),
(
  'myhealth',
  'myHealth',
  '@ iHealthScreen',
  'Healthcare · Telemedicine',
  'HIPAA-compliant telemedicine platform connecting 2000+ patients with doctors nationwide through secure video, audio, and chat.',
  'iHealthScreen Telemedicine connects patients and doctors remotely through secure video, audio, or chat. It offers easy appointment booking, digital prescriptions, and timely care from the comfort of home — serving over 2000 patients daily nationwide. Built to strict HIPAA compliance standards.',
  '2020 – 2021',
  'Software Engineer',
  'https://github.com/Nabil-Ahmed-Sheikh',
  'GitHub →',
  'https://ihealthscreen.org/telemedicine',
  ARRAY['Node.js','Express.js','Socket.io','MongoDB','React Native','AWS EC2','PM2'],
  ARRAY[
    'Built backend for a HIPAA-compliant telemedicine app connecting 2000+ patients with doctors daily',
    'Implemented appointment scheduling, messaging, video calling, e-prescriptions, and disease prediction services',
    'Achieved 12× improvement in API response times by restructuring the database layer',
    'Developed Selenium UI tests for video calling, appointment booking, and messaging reliability'
  ],
  '/images/projects/myhealth.svg',
  1
),
(
  'power-system',
  'Power System Forecasting Tool',
  '@ University of Calgary',
  'Machine Learning · Energy',
  'Forecasts electricity generation and demand, then optimizes power flow to minimize total system production cost while respecting transmission constraints.',
  'A comprehensive tool that forecasts electricity generation and demand and optimizes power flow to minimize total system production cost while respecting transmission system constraints. Combines machine learning forecasts with Security Constrained Optimal Power Flow (SCOPF) optimization using Gurobi and a PyQt-based Single Line Diagram (SLD) interface.',
  '2024 – 2025',
  'Lead ML Engineer',
  'https://github.com/Nabil-Ahmed-Sheikh',
  'GitHub →',
  NULL,
  ARRAY['Python','Scikit-learn','XGBoost','Random Forest','Neural Networks','Gurobi','MySQL','Tkinter'],
  ARRAY[
    'Implemented XGBoost, Random Forest, and Neural Networks achieving R² > 0.9 and MAPE ~10% on demand forecasting',
    'Full simulation completes in 13.6 seconds — a notable improvement over industry standards',
    'Seamlessly integrated ML forecasts with SCOPF optimization (Gurobi) for cost-optimal power dispatch',
    'Built robust data frameworks for historical load and real-time weather data integration'
  ],
  '/images/projects/power-system.svg',
  2
)
ON CONFLICT (id) DO UPDATE SET
  title            = EXCLUDED.title,
  subtitle         = EXCLUDED.subtitle,
  tag              = EXCLUDED.tag,
  description      = EXCLUDED.description,
  long_description = EXCLUDED.long_description,
  year             = EXCLUDED.year,
  role             = EXCLUDED.role,
  href             = EXCLUDED.href,
  arrow_label      = EXCLUDED.arrow_label,
  live_href        = EXCLUDED.live_href,
  tech             = EXCLUDED.tech,
  highlights       = EXCLUDED.highlights,
  cover_image      = EXCLUDED.cover_image,
  sort_order       = EXCLUDED.sort_order,
  updated_at       = now();

-- ─── Experience ──────────────────────────────────────────────────────────────

INSERT INTO experience (id, company, role, period, description, sort_order) VALUES
(
  'flex-connect',
  'Flex Connect (Innovate Calgary)',
  'Intern',
  'Sep 2024 — Dec 2024',
  'Spearheaded development of a cloud application for real-time power data monitoring using Node.js, Next.js, DataHub, and Grafana. Optimized APIs and implemented caching mechanisms to reduce latency, and automated data validation tests with Jest to increase regression coverage.',
  0
),
(
  'sidetrek-cloud',
  'Sidetrek',
  'Cloud Engineer I',
  'Jun 2024 — Aug 2024',
  'Worked on a scalable ETL tool for data processing and visualization. Developed and managed infrastructure as code using Terraform, ensuring consistent deployments across environments and saving up to 68% in cost redundancy. Built a Jest-based automated framework to validate REST endpoints.',
  1
),
(
  'sidetrek-swe',
  'Sidetrek',
  'Software Engineer II',
  'Jul 2022 — Jul 2023',
  'Delivered key features for the Sidetrek platform including API generation and MLflow integration. Spearheaded development using AWS services, Docker, and Kubernetes. Implemented data pipelines and workflows using Airflow and BentoML, enhancing ML lifecycle scalability.',
  2
),
(
  'inevex',
  'Inevex Solutions',
  'Software Engineer',
  'Sep 2021 — Jul 2022',
  'Designed and developed full-stack client platforms ensuring 99% uptime. Introduced a real-time chat system using Socket.io for low-latency communication and supported beta testing of internal tools. Designed Mocha-based API validation tests to ensure secure data flow across microservices.',
  3
),
(
  'ihealthscreen',
  'iHealthScreen Inc.',
  'Software Engineer',
  'Sep 2020 — May 2021',
  'Built the backend of a HIPAA-compliant telemedicine application connecting 2000+ patients with doctors daily. Implemented appointment scheduling, messaging, video calling, e-prescriptions, and disease prediction. Achieved a 12× improvement in API response times by restructuring the database layer.',
  4
)
ON CONFLICT (id) DO UPDATE SET
  company     = EXCLUDED.company,
  role        = EXCLUDED.role,
  period      = EXCLUDED.period,
  description = EXCLUDED.description,
  sort_order  = EXCLUDED.sort_order;

-- ─── Stack ───────────────────────────────────────────────────────────────────

INSERT INTO stack (id, name, type, icon, sort_order) VALUES
  ('typescript', 'TypeScript', 'Language', '𝑇𝑆', 0),
  ('python',     'Python',     'Language', '🐍', 1),
  ('go',         'Go',         'Language', 'Go', 2),
  ('react',      'React',      'Frontend', '⚛',  3),
  ('nodejs',     'Node.js',    'Backend',  '⬡',  4),
  ('aws',        'AWS',        'Cloud',    '☁',  5),
  ('docker',     'Docker',     'DevOps',   '🐋', 6),
  ('kubernetes', 'Kubernetes', 'DevOps',   '☸',  7),
  ('terraform',  'Terraform',  'DevOps',   '◈',  8),
  ('postgresql', 'PostgreSQL', 'Database', '🗄', 9)
ON CONFLICT (id) DO UPDATE SET
  name       = EXCLUDED.name,
  type       = EXCLUDED.type,
  icon       = EXCLUDED.icon,
  sort_order = EXCLUDED.sort_order;

-- ─── Stats ───────────────────────────────────────────────────────────────────

INSERT INTO stats (id, value, prefix, label, sort_order) VALUES
  ('experience', '5',  '+', E'Years of\nExperience', 0),
  ('projects',   '10', '+', E'Projects\nCompleted',  1),
  ('companies',  '4',  NULL, E'Companies\nWorked At', 2)
ON CONFLICT (id) DO UPDATE SET
  value      = EXCLUDED.value,
  prefix     = EXCLUDED.prefix,
  label      = EXCLUDED.label,
  sort_order = EXCLUDED.sort_order;
