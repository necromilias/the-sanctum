import { useEffect, useState } from 'react';
import { Loader2, Github, Mail, User, Zap, Clock, MessageSquare } from 'lucide-react';
import { supabase, type AboutSection } from '../lib/supabase';

const SECTION_ICONS: Record<AboutSection['section_type'], React.ElementType> = {
  bio:      User,
  skills:   Zap,
  timeline: Clock,
  contact:  MessageSquare,
};

function BioSection({ section }: { section: AboutSection }) {
  return (
    <section className="glass-panel p-6 md:p-8 animate-slide-up">
      <h2 className="font-mono text-xs tracking-widest text-cyan-500/70 uppercase mb-4">
        {section.title}
      </h2>
      <div className="space-y-3">
        {section.content.split('\n\n').map((para, i) => (
          <p key={i} className="text-ghost-300 leading-relaxed text-sm">
            {para}
          </p>
        ))}
      </div>
    </section>
  );
}

function SkillsSection({ section }: { section: AboutSection }) {
  const skills = section.content
    .split(/[·,\n]/)
    .map(s => s.trim())
    .filter(Boolean);

  return (
    <section className="glass-panel p-6 md:p-8 animate-slide-up">
      <h2 className="font-mono text-xs tracking-widest text-cyan-500/70 uppercase mb-4">
        {section.title}
      </h2>
      <div className="flex flex-wrap gap-2">
        {skills.map(skill => (
          <span
            key={skill}
            className="font-mono text-xs px-3 py-1.5 rounded-lg bg-cyan-500/8 border border-cyan-500/20 text-cyan-300/90 hover:border-cyan-500/40 hover:bg-cyan-500/15 transition-all duration-200 cursor-default"
          >
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
}

function TimelineSection({ sections }: { sections: AboutSection[] }) {
  return (
    <section className="glass-panel p-6 md:p-8 animate-slide-up">
      <h2 className="font-mono text-xs tracking-widest text-cyan-500/70 uppercase mb-6">
        Journey
      </h2>
      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/50 via-cyan-500/20 to-transparent" />
        <div className="space-y-6 pl-10">
          {sections.map((section, i) => (
            <div key={section.id} className={`relative animate-slide-up`} style={{ animationDelay: `${i * 80}ms` }}>
              <div className="absolute -left-[26px] top-1 w-2.5 h-2.5 rounded-full border-2 border-cyan-500 bg-void-900" />
              <div>
                <h3 className="font-mono text-sm text-ghost-100 font-medium mb-1">
                  {section.title}
                </h3>
                <p className="text-xs text-ghost-400 leading-relaxed">
                  {section.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection({ section }: { section: AboutSection }) {
  const lines = section.content.split('\n').filter(Boolean);

  const links = lines.map(line => {
    const lower = line.toLowerCase();
    if (lower.startsWith('github:')) {
      return { icon: Github, label: 'GitHub', href: line.split(': ')[1]?.trim(), text: line.split(': ')[1]?.trim().replace('https://github.com/', '') };
    }
    if (lower.startsWith('email:')) {
      const addr = line.split(': ')[1]?.trim();
      return { icon: Mail, label: 'Email', href: `mailto:${addr}`, text: addr };
    }
    return null;
  }).filter(Boolean);

  return (
    <section className="glass-panel p-6 md:p-8 animate-slide-up">
      <h2 className="font-mono text-xs tracking-widest text-cyan-500/70 uppercase mb-4">
        {section.title}
      </h2>
      <div className="flex flex-wrap gap-3">
        {links.map(link => {
          if (!link) return null;
          const Icon = link.icon;
          return (
            <a
              key={link.label}
              href={link.href}
              target={link.href?.startsWith('mailto:') ? undefined : '_blank'}
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-lg glass-panel border-ghost-600 hover:border-cyan-500/40 hover:text-cyan-400 text-ghost-300 transition-all duration-200 group"
            >
              <Icon size={14} className="text-cyan-500/70 group-hover:text-cyan-400 transition-colors duration-200" />
              <span className="font-mono text-xs">{link.text}</span>
            </a>
          );
        })}
      </div>
    </section>
  );
}

export default function About() {
  const [sections, setSections] = useState<AboutSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    supabase
      .from('about_sections')
      .select('*')
      .order('display_order')
      .then(({ data, error: err }) => {
        if (err) setError(err.message);
        else setSections(data ?? []);
        setLoading(false);
      });
  }, []);

  const bio      = sections.filter(s => s.section_type === 'bio');
  const skills   = sections.filter(s => s.section_type === 'skills');
  const timeline = sections.filter(s => s.section_type === 'timeline');
  const contact  = sections.filter(s => s.section_type === 'contact');

  return (
    <main className="max-w-4xl mx-auto px-4 py-12 animate-fade-in">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-100" />
        <div className="absolute inset-0 bg-glow-cyan" />
      </div>

      <div className="relative z-10">
        <div className="mb-10">
          <p className="section-heading">~/about</p>
          <h1 className="page-title mb-2">About Me</h1>
          <p className="text-ghost-400 text-sm max-w-xl">
            Edit this page by updating rows in the{' '}
            <span className="font-mono text-cyan-400">about_sections</span> table in Supabase.
          </p>
        </div>

        {loading && (
          <div className="flex items-center gap-3 text-ghost-400 font-mono text-sm py-16 justify-center">
            <Loader2 size={16} className="animate-spin text-cyan-400" />
            Loading...
          </div>
        )}

        {error && (
          <div className="glass-panel border-error-500/30 p-6 text-error-400 font-mono text-sm">
            Error: {error}
          </div>
        )}

        {!loading && !error && (
          <div className="space-y-6">
            {bio.map(s => <BioSection key={s.id} section={s} />)}
            {skills.map(s => <SkillsSection key={s.id} section={s} />)}
            {timeline.length > 0 && <TimelineSection sections={timeline} />}
            {contact.map(s => <ContactSection key={s.id} section={s} />)}

            {sections.length === 0 && (
              <div className="glass-panel p-10 text-center text-ghost-400 font-mono text-sm">
                No content yet. Add rows to the{' '}
                <span className="text-cyan-400">about_sections</span> table in Supabase.
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
