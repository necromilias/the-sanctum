import { User, Zap, Clock, MessageSquare } from 'lucide-react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';

const SECTION_ICONS: Record<string, React.ComponentType<any>> = {
  bio: User,
  skills: Zap,
  timeline: Clock,
  contact: MessageSquare,
};

interface AboutSection {
  section_type?: string;
  title?: string;
  content?: any;
  display_order?: number;
}

export default function About() {
  const aboutModules = import.meta.glob('../../content/about/*.json', { eager: true }) as Record<string, { default: AboutSection }>;
  const sections = Object.entries(aboutModules)
    .map(([path, mod]) => ({ ...mod.default, _key: path }))
    .sort((a, b) => (a.display_order ?? 999) - (b.display_order ?? 999));

  return (
    <main className="relative max-w-4xl mx-auto px-8 py-8 animate-fade-in">
    <div className="mb-7">
    <p className="font-mono text-[11px] tracking-widest text-cyan-500/70 uppercase mb-1.5">~/about</p>
    <h1 className="text-2xl font-semibold text-ghost-50 mb-1.5">About Me</h1>
    <p className="text-ghost-400 text-sm">Welcome to the sanctum.</p>
    </div>

    {sections.length === 0 ? (
      <div className="glass-panel p-8 text-center text-ghost-400 font-mono text-sm">
        No about sections yet. Use the Tina admin to add bio, skills, etc.
      </div>
    ) : (
      <div className="space-y-6">
        {sections.map((section) => {
          const Icon = SECTION_ICONS[section.section_type || 'bio'] || User;
          const displayTitle = section.title || section.section_type || 'Section';
          return (
            <div key={section._key} className="glass-panel p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <Icon size={16} />
                </div>
                <h2 className="font-mono text-xs tracking-widest text-cyan-500/70 uppercase">{displayTitle}</h2>
              </div>
              <div className="text-ghost-300 leading-relaxed">
                {typeof section.content === 'string' ? (
                  section.content
                    .trim()
                    .split(/\n\s*\n/)
                    .filter(Boolean)
                    .map((paragraph, i) => (
                      <p key={i} className="mb-3 last:mb-0">
                        {paragraph}
                      </p>
                    ))
                ) : (
                  <TinaMarkdown content={section.content} />
                )}
              </div>
            </div>
          );
        })}
      </div>
    )}
    </main>
  );
}
