import { Github, ExternalLink, Circle, Clock, CheckCircle2 } from 'lucide-react';

const STATUS_CONFIG = {
  planned: { label: 'Planned', badge: 'badge-planned', icon: Circle, dot: 'bg-ghost-500' },
  'in-progress': { label: 'In Progress', badge: 'badge-in-progress', icon: Clock, dot: 'bg-warning-400' },
  completed: { label: 'Completed', badge: 'badge-completed', icon: CheckCircle2, dot: 'bg-success-400' },
} as const;

interface Project {
  title: string;
  description?: string;
  technologies?: string[];
  live_url?: string;
  github_url?: string;
  status?: 'planned' | 'in-progress' | 'completed';
  started_at?: string;
  display_order?: number;
}

export default function Portfolio() {
  const projectModules = import.meta.glob('../../content/projects/*.json', { eager: true }) as Record<string, { default: Project }>;
  const projects = Object.entries(projectModules)
    .map(([path, mod]) => ({ ...mod.default, _key: path }))
    .sort((a, b) => (a.display_order ?? 999) - (b.display_order ?? 999));

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
    {projects.length === 0 ? (
      <div className="col-span-full glass-panel p-8 text-center text-ghost-400 font-mono text-sm">
        No projects yet. Use the Tina admin to add some.
      </div>
    ) : (
      projects.map((project) => {
        const status = (project.status || 'planned') as keyof typeof STATUS_CONFIG;
        const cfg = STATUS_CONFIG[status];
        const Icon = cfg.icon;

        return (
          <article key={project._key} className="glass-panel-hover p-6 flex flex-col gap-4">
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

            {project.technologies && project.technologies.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {project.technologies.map((tech) => (
                  <span key={tech} className="font-mono text-xs px-2 py-0.5 rounded bg-ghost-700/50 border border-ghost-600 text-ghost-300">
                    {tech}
                  </span>
                ))}
              </div>
            )}

            <div className="flex items-center justify-between pt-1 border-t border-ghost-700">
              <div className="flex items-center gap-1.5 font-mono text-xs text-ghost-500">
                <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                {cfg.label}
              </div>
              <div className="flex items-center gap-2">
                {project.github_url && (
                  <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="text-ghost-500 hover:text-ghost-200" title="GitHub">
                    <Github size={14} />
                  </a>
                )}
                {project.live_url && (
                  <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="text-ghost-500 hover:text-ghost-200" title="Live site">
                    <ExternalLink size={14} />
                  </a>
                )}
              </div>
            </div>
          </article>
        );
      })
    )}
    </div>
    </div>
    </main>
  );
}
