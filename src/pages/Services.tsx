import { useEffect, useState } from 'react';
import {
  Server, Film, Cloud, Lock, Activity, GitBranch, Globe,
  Database, Shield, Radio, Terminal, Cpu, HardDrive, Wifi,
  Monitor, Code, Package, Layers, Rss, Camera, Music,
  BookOpen, LayoutDashboard, ExternalLink, Loader2,
} from 'lucide-react';
import { supabase, type Service } from '../lib/supabase';

// Map icon name strings from DB to Lucide components
const ICON_MAP: Record<string, React.ElementType> = {
  Server, Film, Cloud, Lock, Activity, GitBranch, Globe,
  Database, Shield, Radio, Terminal, Cpu, HardDrive, Wifi,
  Monitor, Code, Package, Layers, Rss, Camera, Music,
  BookOpen, LayoutDashboard,
  Container: Package,
};

function ServiceIcon({ name }: { name: string }) {
  const Icon = ICON_MAP[name] ?? Server;
  return <Icon size={22} />;
}

const CATEGORY_ORDER = [
  'Media', 'Productivity', 'Development', 'Network',
  'Infrastructure', 'Security', 'General',
];

function groupByCategory(services: Service[]): Record<string, Service[]> {
  return services.reduce<Record<string, Service[]>>((acc, svc) => {
    (acc[svc.category] ??= []).push(svc);
    return acc;
  }, {});
}

function sortedCategories(groups: Record<string, Service[]>): string[] {
  const cats = Object.keys(groups);
  return [
    ...CATEGORY_ORDER.filter(c => cats.includes(c)),
    ...cats.filter(c => !CATEGORY_ORDER.includes(c)),
  ];
}

const CATEGORY_ACCENTS: Record<string, string> = {
  Media:          'text-blue-300  bg-blue-500/10  border-blue-500/30',
  Productivity:   'text-teal-400  bg-teal-500/10  border-teal-500/30',
  Development:    'text-cyan-400  bg-cyan-500/10  border-cyan-500/30',
  Network:        'text-warning-400 bg-warning-500/10 border-warning-500/30',
  Infrastructure: 'text-ghost-200 bg-ghost-700/40  border-ghost-600',
  Security:       'text-success-400 bg-success-500/10 border-success-500/30',
  General:        'text-ghost-300 bg-ghost-700/30  border-ghost-600',
};

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    supabase
      .from('services')
      .select('*')
      .eq('is_active', true)
      .order('display_order')
      .then(({ data, error: err }) => {
        if (err) setError(err.message);
        else setServices(data ?? []);
        setLoading(false);
      });
  }, []);

  const groups = groupByCategory(services);
  const categories = sortedCategories(groups);

  return (
    <main className="max-w-6xl mx-auto px-4 py-12 animate-fade-in">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-100" />
        <div className="absolute inset-0 bg-glow-cyan" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="mb-10">
          <p className="section-heading">~/services</p>
          <h1 className="page-title mb-2">Self-Hosted Services</h1>
          <p className="text-ghost-400 text-sm max-w-xl">
            All services run at home, exposed securely via Cloudflare Tunnels.
            Update entries directly in the Supabase dashboard.
          </p>
        </div>

        {loading && (
          <div className="flex items-center gap-3 text-ghost-400 font-mono text-sm py-16 justify-center">
            <Loader2 size={16} className="animate-spin text-cyan-400" />
            Loading services...
          </div>
        )}

        {error && (
          <div className="glass-panel border-error-500/30 p-6 text-error-400 font-mono text-sm">
            Error: {error}
          </div>
        )}

        {!loading && !error && services.length === 0 && (
          <div className="glass-panel p-10 text-center text-ghost-400 font-mono text-sm">
            No active services found. Add rows to the <span className="text-cyan-400">services</span> table in Supabase.
          </div>
        )}

        {!loading && categories.map(cat => (
          <section key={cat} className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <span className={`badge ${CATEGORY_ACCENTS[cat] ?? CATEGORY_ACCENTS.General}`}>
                {cat}
              </span>
              <div className="flex-1 h-px bg-ghost-700" />
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {groups[cat].map(svc => (
                <a
                  key={svc.id}
                  href={svc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group glass-panel-hover p-5 flex flex-col gap-4"
                >
                  <div className="flex items-start justify-between">
                    <div className={`w-10 h-10 rounded-lg border flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${CATEGORY_ACCENTS[cat] ?? CATEGORY_ACCENTS.General}`}>
                      <ServiceIcon name={svc.icon_name} />
                    </div>
                    <ExternalLink
                      size={14}
                      className="text-ghost-500 group-hover:text-cyan-400 transition-colors duration-200 mt-1"
                    />
                  </div>

                  <div className="flex-1">
                    <h3 className="font-mono text-sm font-medium text-ghost-100 group-hover:text-cyan-400 transition-colors duration-200">
                      {svc.name}
                    </h3>
                    {svc.description && (
                      <p className="text-xs text-ghost-400 mt-1 leading-relaxed line-clamp-2">
                        {svc.description}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5 font-mono text-xs text-ghost-500 group-hover:text-cyan-500/70 transition-colors duration-200 truncate">
                    <Globe size={11} />
                    <span className="truncate">{svc.url.replace(/^https?:\/\//, '')}</span>
                  </div>
                </a>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
