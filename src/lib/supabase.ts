import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Service {
  id: string;
  name: string;
  description: string;
  url: string;
  icon_name: string;
  category: string;
  display_order: number;
  is_active: boolean;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  live_url: string | null;
  github_url: string | null;
  status: 'planned' | 'in-progress' | 'completed';
  started_at: string | null;
  display_order: number;
}

export interface AboutSection {
  id: string;
  section_type: 'bio' | 'skills' | 'timeline' | 'contact';
  title: string;
  content: string;
  display_order: number;
}
