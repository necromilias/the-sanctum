/*
# Personal Portfolio Schema

Creates three tables for a personal homepage with services dashboard, portfolio tracker, and about page.

## New Tables

### services
Stores self-hosted service links. Each row represents one app exposed via Cloudflare Tunnel.
- id: uuid primary key
- name: display name of the service
- description: short description shown on the card
- url: full URL (Cloudflare Tunnel link)
- icon_name: Lucide React icon name string (e.g. "Server", "Film")
- category: grouping label (e.g. "Media", "Network", "Productivity")
- display_order: integer for manual reordering
- is_active: boolean toggle to hide a service without deleting it

### projects
Tracks coding projects and learning progress for the portfolio page.
- id: uuid primary key
- title: project name
- description: summary of what the project is
- technologies: text array of tech stack tags (e.g. ["React", "TypeScript"])
- live_url: optional deployed URL
- github_url: optional GitHub repository URL
- status: one of 'planned', 'in-progress', 'completed'
- started_at: when work began (optional)
- display_order: integer for manual reordering

### about_sections
Flexible rows for the about page. Each row is a content block.
- id: uuid primary key
- section_type: one of 'bio', 'skills', 'timeline', 'contact'
- title: optional heading for the section
- content: markdown/plain text body
- display_order: integer for ordering sections

## Security
- RLS enabled on all three tables.
- Public read-only: anon role can SELECT only.
- No public write access — content is managed via the Supabase dashboard.
*/

-- SERVICES TABLE
CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL DEFAULT '',
  url text NOT NULL,
  icon_name text NOT NULL DEFAULT 'Server',
  category text NOT NULL DEFAULT 'General',
  display_order integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE services ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_services" ON services;
CREATE POLICY "public_read_services" ON services FOR SELECT
  TO anon, authenticated USING (true);

-- PROJECTS TABLE
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL DEFAULT '',
  technologies text[] NOT NULL DEFAULT '{}',
  live_url text,
  github_url text,
  status text NOT NULL DEFAULT 'planned' CHECK (status IN ('planned', 'in-progress', 'completed')),
  started_at date,
  display_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_projects" ON projects;
CREATE POLICY "public_read_projects" ON projects FOR SELECT
  TO anon, authenticated USING (true);

-- ABOUT SECTIONS TABLE
CREATE TABLE IF NOT EXISTS about_sections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section_type text NOT NULL DEFAULT 'bio' CHECK (section_type IN ('bio', 'skills', 'timeline', 'contact')),
  title text NOT NULL DEFAULT '',
  content text NOT NULL DEFAULT '',
  display_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE about_sections ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_about_sections" ON about_sections;
CREATE POLICY "public_read_about_sections" ON about_sections FOR SELECT
  TO anon, authenticated USING (true);

-- INDEXES
CREATE INDEX IF NOT EXISTS services_display_order_idx ON services (display_order) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS projects_display_order_idx ON projects (display_order);
CREATE INDEX IF NOT EXISTS about_sections_display_order_idx ON about_sections (display_order);
