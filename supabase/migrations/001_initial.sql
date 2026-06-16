-- Portfolio personal info (single row with id = 'default')
CREATE TABLE IF NOT EXISTS portfolio_personal (
  id         text PRIMARY KEY DEFAULT 'default',
  name       text NOT NULL DEFAULT '',
  tagline    text NOT NULL DEFAULT '',
  bio        text NOT NULL DEFAULT '',
  email      text NOT NULL DEFAULT '',
  updated_at timestamptz DEFAULT now()
);

-- Social links
CREATE TABLE IF NOT EXISTS social_links (
  id         text PRIMARY KEY,
  label      text NOT NULL,
  display    text NOT NULL,
  href       text NOT NULL,
  sort_order int  NOT NULL DEFAULT 0
);

-- Projects
CREATE TABLE IF NOT EXISTS projects (
  id               text PRIMARY KEY,
  title            text NOT NULL,
  subtitle         text,
  tag              text NOT NULL DEFAULT '',
  description      text NOT NULL DEFAULT '',
  long_description text,
  year             text,
  role             text,
  href             text NOT NULL DEFAULT '',
  arrow_label      text,
  live_href        text,
  tech             text[],
  highlights       text[],
  cover_image      text,
  images           text[],
  video_url        text,
  sort_order       int  NOT NULL DEFAULT 0,
  created_at       timestamptz DEFAULT now(),
  updated_at       timestamptz DEFAULT now()
);

-- Work experience
CREATE TABLE IF NOT EXISTS experience (
  id          text PRIMARY KEY,
  company     text NOT NULL,
  role        text NOT NULL,
  period      text NOT NULL,
  description text NOT NULL DEFAULT '',
  sort_order  int  NOT NULL DEFAULT 0,
  created_at  timestamptz DEFAULT now()
);

-- Tech stack
CREATE TABLE IF NOT EXISTS stack (
  id         text PRIMARY KEY,
  name       text NOT NULL,
  type       text NOT NULL,
  icon       text NOT NULL,
  sort_order int  NOT NULL DEFAULT 0
);

-- Stats
CREATE TABLE IF NOT EXISTS stats (
  id         text PRIMARY KEY,
  value      text NOT NULL,
  prefix     text,
  label      text NOT NULL,
  sort_order int  NOT NULL DEFAULT 0
);

-- Contact form messages
CREATE TABLE IF NOT EXISTS contact_messages (
  id         uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name       text NOT NULL,
  email      text NOT NULL,
  message    text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security (read-only public access for portfolio data)
ALTER TABLE portfolio_personal  ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_links        ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects            ENABLE ROW LEVEL SECURITY;
ALTER TABLE experience          ENABLE ROW LEVEL SECURITY;
ALTER TABLE stack               ENABLE ROW LEVEL SECURITY;
ALTER TABLE stats               ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages    ENABLE ROW LEVEL SECURITY;

-- Public read policies for portfolio display tables
CREATE POLICY "public can read personal"   ON portfolio_personal  FOR SELECT USING (true);
CREATE POLICY "public can read links"      ON social_links        FOR SELECT USING (true);
CREATE POLICY "public can read projects"   ON projects            FOR SELECT USING (true);
CREATE POLICY "public can read experience" ON experience          FOR SELECT USING (true);
CREATE POLICY "public can read stack"      ON stack               FOR SELECT USING (true);
CREATE POLICY "public can read stats"      ON stats               FOR SELECT USING (true);

-- contact_messages: public insert only (no read — admin reads via service role)
CREATE POLICY "public can insert messages" ON contact_messages FOR INSERT WITH CHECK (true);
