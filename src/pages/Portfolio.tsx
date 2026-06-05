import { useEffect, useState } from 'react';
import { ExternalLink, Github, Loader2, Circle, Clock, CheckCircle2 } from 'lucide-react';
import { supabase, type Project } from '../lib/supabase';

const STATUS_CONFIG = {
  planned: {
    label: 'Planned',
    badge: 'badge-planned',
    icon: Circle,
    dot: 'bg-ghost-500',
  },
  'in-progress': {
    label: 'In Progress',
    badge: 'badge-in-progress',
    icon: Clock,
    dot: 'bg-warning-400',
  },
  completed: {
    label: 'Completed',
    badge: 'badge-completed',
    icon: CheckCircle2,
    dot: 'bg-success-400',
  },
} satisfies Record<string, { label: string; badge: string; icon: React.ElementType; dot: string }>;

type StatusFilter = 'all' | Project['status'];

export default function Portfolio() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<StatusFilter>('all');

  useEffect(() => {
    supabase
      .from('projects')
      .select('*')
      .order('display_order')
      .then(({ data, error: err }) => {
        if (err) setError(err.message);
        else setProjects(data ?? []);
        setLoading(false);
      });
  }, []);

  const visible = filter === 'all' ? projects : projects.filter(p => p.status === filter);

  const counts = {
    all: projects.length,
    planned: projects.filter(p => p.status === 'planned').length,
    'in-progress': projects.filter(p => p.status === 'in-progress').length,
    completed: projects.filter(p => p.status === 'completed').length,
  };

  return (
    <main className="max-w-6xl mx-auto px-4 py-12 animate-fade-in">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-100" />
        <div className="absolute inset-0 bg-glow-blue" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="mb-8">
          <p className="section-heading">~/portfolio</p>
          <h1 className="page-title mb-2">Portfolio & Projects</h1>
          <p className="text-ghost-400 text-sm max-w-xl">
            A living record of what I'm building and learning.
            Add new entries to the <span className="font-mono text-cyan-400">projects</span> table in Supabase.
          </p>
        </div>

        {/* Journey banner */}
        {!loading && projects.length > 0 && (
          <div className="glass-panel p-5 mb-8 flex flex-wrap gap-6">
            {(Object.keys(STATUS_CONFIG) as Project['status'][]).map(s => {
              const cfg = STATUS_CONFIG[s];
              const Icon = cfg.icon;
              return (
                <div key={s} className="flex items-center gap-2">
                  <Icon size={14} className={`${s === 'completed' ? 'text-success-400' : s === 'in-progress' ? 'text-warning-400' : 'text-ghost-500'}`} />
                  <span className="font-mono text-xs text-ghost-400">{cfg.label}:</span>
                  <span className={`font-mono text-sm font-medium ${s === 'completed' ? 'text-success-400' : s === 'in-progress' ? 'text-warning-400' : 'text-ghost-300'}`}>
                    {counts[s]}
                  </span>
                </div>
              );
            })}
            <div className="ml-auto hidden sm:flex items-center gap-2">
              <div className="h-1.5 w-40 bg-ghost-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 to-success-500 rounded-full transition-all duration-700"
                  style={{ width: `${projects.length ? (counts.completed / projects.length) * 100 : 0}%` }}
                />
              </div>
              <span className="font-mono text-xs text-ghost-400">
                {projects.length ? Math.round((counts.completed / projects.length) * 100) : 0}% done
              </span>
            </div>
          </div>
        )}

        {/* Filter tabs */}
        {!loading && (
          <div className="flex flex-wrap gap-2 mb-6">
            {(['all', 'in-progress', 'completed', 'planned'] as const).map(s => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`font-mono text-xs px-3 py-1.5 rounded-lg border transition-all duration-200 ${
                  filter === s
                    ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-400'
                    : 'bg-ghost-700/30 border-ghost-600 text-ghost-400 hover:text-ghost-200 hover:border-ghost-500'
                }`}
              >
                {s === 'all' ? 'All' : STATUS_CONFIG[s].label}
                <span className="ml-1.5 text-ghost-500">{counts[s]}</span>
              </button>
            ))}
          </div>
        )}

        {loading && (
          <div className="flex items-center gap-3 text-ghost-400 font-mono text-sm py-16 justify-center">
            <Loader2 size={16} className="animate-spin text-cyan-400" />
            Loading projects...
          </div>
        )}

        {error && (
          <div className="glass-panel border-error-500/30 p-6 text-error-400 font-mono text-sm">
            Error: {error}
          </div>
        )}

        {!loading && !error && projects.length === 0 && (
          <div className="glass-panel p-10 text-center text-ghost-400 font-mono text-sm">
            No projects yet. Add rows to the <span className="text-cyan-400">projects</span> table in Supabase.
          </div>
        )}

        {!loading && (
          <div className="grid md:grid-cols-2 gap-4">
            {visible.map(project => {
              const cfg = STATUS_CONFIG[project.status];
              const Icon = cfg.icon;
              return (
                <article key={project.id} className="group glass-panel-hover p-6 flex flex-col gap-4">
                  <div className="flex items-start justify-between gap-3">
                    <h2 className="font-mono text-sm font-medium text-ghost-100 group-hover:text-cyan-400 transition-colors duration-200 leading-snug">
                      {project.title}
                    </h2>
                    <span className={`flex items-center gap-1.5 ${cfg.badge} flex-shrink-0`}>
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
                      {project.started_at
                        ? `Started ${new Date(project.started_at).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })}`
                        : 'Not started'
                      }
                    </div>
                    <div className="flex items-center gap-2">
                      {project.github_url && (
                        <a
                          href={project.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-ghost-500 hover:text-ghost-200 transition-colors duration-200"
                          title="GitHub"
                        >
                          <Github size={14} />
                        </a>
                      )}
                      {project.live_url && (
                        <a
                          href={project.live_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-ghost-500 hover:text-cyan-400 transition-colors duration-200"
                          title="Live site"
                        >
                          <ExternalLink size={14} />
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
