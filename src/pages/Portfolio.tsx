import { Link } from 'react-router-dom';
import { Github, Circle, Clock, CheckCircle2 } from 'lucide-react';

const STATUS_CONFIG = {
  planned: { label: 'Planned', badge: 'badge-planned', icon: Circle },
  'in-progress': { label: 'In Progress', badge: 'badge-in-progress', icon: Clock },
  completed: { label: 'Completed', badge: 'badge-completed', icon: CheckCircle2 },
} as const;

const MACHINE_PROJECTS = ['The-Forge', 'The-Trove'];

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

function formatSince(iso?: string): string | null {
  if (!iso) return null;
  const d = new Date(iso);
  if (isNaN(d.getTime())) return null;
  return d.toLocaleString('en-US', { month: 'short', year: 'numeric' }).toLowerCase();
}

export default function Portfolio() {
  const projectModules = import.meta.glob('../../content/projects/*.json', { eager: true }) as Record<string, { default: Project }>;
  const projects = Object.entries(projectModules)
    .map(([path, mod]) => ({ ...mod.default, _key: path }))
    .sort((a, b) => (a.display_order ?? 999) - (b.display_order ?? 999));

  return (
    <main className="relative max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-6 md:py-8 animate-fade-in">
      <div className="mb-7">
        <p className="font-mono text-[11px] tracking-widest text-cyan-500/70 uppercase mb-1.5">~/portfolio</p>
        <h1 className="text-2xl font-semibold text-ghost-50 mb-1.5">Portfolio & Projects</h1>
        <p className="text-ghost-400 text-sm">A living record of what I'm building.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {projects.length === 0 ? (
          <div className="col-span-full glass-panel p-8 text-center text-ghost-400 font-mono text-sm">
            No projects yet. Use the Tina admin to add some.
          </div>
        ) : (
          projects.map((project) => {
            const status = (project.status || 'planned') as keyof typeof STATUS_CONFIG;
            const cfg = STATUS_CONFIG[status];
            const Icon = cfg.icon;
            const since = formatSince(project.started_at);

            return (
              <article key={project._key} className="glass-panel p-6 flex flex-col gap-3.5 hover:border-cyan-500/40 transition-all duration-300">
                <div className="flex items-start justify-between gap-3">
                  <h2 className="font-mono text-sm font-medium text-ghost-100">{project.title}</h2>
                  <span className={`flex items-center gap-1.5 whitespace-nowrap ${cfg.badge}`}>
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

                <div className="flex items-center justify-between pt-2.5 border-t border-ghost-700 font-mono text-[11px]">
                  <span className="text-ghost-500">{since ? `since ${since}` : ''}</span>
                  {project.github_url ? (
                    <a
                      href={project.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-ghost-500 hover:text-cyan-400 transition-colors"
                    >
                      <Github size={13} />
                      source
                    </a>
                  ) : MACHINE_PROJECTS.includes(project.title) ? (
                    <Link to="/systems" className="text-ghost-500 hover:text-cyan-400 transition-colors">
                      ~/systems →
                    </Link>
                  ) : null}
                </div>
              </article>
            );
          })
        )}
      </div>
    </main>
  );
}
