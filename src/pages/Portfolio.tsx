import { useState } from 'react';
import { ExternalLink, Github, Circle, Clock, CheckCircle2 } from 'lucide-react';

const STATUS_CONFIG = {
  planned: { label: 'Planned', badge: 'badge-planned', icon: Circle, dot: 'bg-ghost-500' },
  'in-progress': { label: 'In Progress', badge: 'badge-in-progress', icon: Clock, dot: 'bg-warning-400' },
  completed: { label: 'Completed', badge: 'badge-completed', icon: CheckCircle2, dot: 'bg-success-400' },
};

export default function Portfolio() {
  // Temporary static projects until we load from local files
  const [projects] = useState([
    {
      id: '1',
      title: "the-sanctum",
      description: "Personal website and homelab hub built with React, Tailwind, and TinaCMS",
      technologies: ["React", "TypeScript", "Tailwind", "Vite"],
      status: "in-progress" as const,
      github_url: "https://github.com/necromilias/the-sanctum",
      live_url: null,
    }
  ]);

  const filter = 'all';

  return (
    <main className="max-w-6xl mx-auto px-4 py-12 animate-fade-in">
    <div className="fixed inset-0 pointer-events-none">
    <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-100" />
    <div className="absolute inset-0 bg-glow-blue" />
    </div>

    <div className="relative z-10">
    <div className="mb-8">
    <p className="section-heading">~/portfolio</p>
    <h1 className="page-title mb-2">Portfolio & Projects</h1>
    <p className="text-ghost-400 text-sm">A living record of what I'm building.</p>
    </div>

    <div className="grid md:grid-cols-2 gap-4">
    {projects.map(project => {
      const cfg = STATUS_CONFIG[project.status];
      const Icon = cfg.icon;

      return (
        <article key={project.id} className="glass-panel-hover p-6 flex flex-col gap-4">
        <div className="flex items-start justify-between gap-3">
        <h2 className="font-mono text-sm font-medium text-ghost-100">{project.title}</h2>
        <span className={`flex items-center gap-1.5 ${cfg.badge}`}>
        <Icon size={10} />
        {cfg.label}
        </span>
        </div>

        <p className="text-xs text-ghost-400 leading-relaxed flex-1">
        {project.description}
        </p>

        {project.technologies.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
          {project.technologies.map(tech => (
            <span key={tech} className="font-mono text-xs px-2 py-0.5 rounded bg-ghost-700/50 border border-ghost-600 text-ghost-300">
            {tech}
            </span>
          ))}
          </div>
        )}

        <div className="flex items-center justify-between pt-1 border-t border-ghost-700">
        <div className="flex items-center gap-1.5 font-mono text-xs text-ghost-500">
        <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
        In Progress
        </div>
        <div className="flex items-center gap-2">
        {project.github_url && (
          <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="text-ghost-500 hover:text-ghost-200">
          <Github size={14} />
          </a>
        )}
        </div>
        </div>
        </article>
      );
    })}
    </div>
    </div>
    </main>
  );
}
