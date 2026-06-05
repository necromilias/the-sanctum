import { ExternalLink, Server, Film, Shield, KeyRound, Globe } from 'lucide-react';

interface Service {
  name: string;
  description?: string;
  url: string;
  icon_name?: string;
  category?: string;
  display_order?: number;
  is_active?: boolean;
}

const iconMap: Record<string, React.ComponentType<any>> = {
  Server,
  Film,
  Shield,
  KeyRound,
  Globe,
  // Add more Lucide icon names here as you use them in services
};

export default function Services() {
  const serviceModules = import.meta.glob('../../content/services/*.json', { eager: true }) as Record<string, { default: Service }>;
  const services = Object.entries(serviceModules)
    .map(([path, mod]) => ({ ...mod.default, _key: path }))
    .filter((s) => s.is_active !== false)
    .sort((a, b) => (a.display_order ?? 999) - (b.display_order ?? 999));

  const getIcon = (name?: string) => iconMap[name || 'Server'] || Server;

  return (
    <main className="max-w-6xl mx-auto px-4 py-12 animate-fade-in">
    <div className="fixed inset-0 pointer-events-none">
    <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-100" />
    <div className="absolute inset-0 bg-glow-cyan" />
    </div>

    <div className="relative z-10">
    <div className="mb-10">
    <p className="section-heading">~/services</p>
    <h1 className="page-title mb-2">Self-Hosted Services</h1>
    <p className="text-ghost-400 text-sm">Services running in the sanctum.</p>
    </div>

    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {services.length === 0 ? (
      <div className="col-span-full glass-panel p-8 text-center text-ghost-400 font-mono text-sm">
        No services yet. Use the Tina admin to add some.
      </div>
    ) : (
      services.map((svc) => {
        const Icon = getIcon(svc.icon_name);
        return (
          <a
            key={svc._key}
            href={svc.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group glass-panel-hover p-5 flex flex-col gap-4"
          >
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-lg border flex items-center justify-center flex-shrink-0 text-cyan-400">
                <Icon size={22} />
              </div>
              <ExternalLink size={14} className="text-ghost-500 group-hover:text-cyan-400 mt-1" />
            </div>

            <div className="flex-1">
              <h3 className="font-mono text-sm font-medium text-ghost-100 group-hover:text-cyan-400">
                {svc.name}
              </h3>
              <p className="text-xs text-ghost-400 mt-1 leading-relaxed">
                {svc.description}
              </p>
            </div>

            <div className="font-mono text-xs text-ghost-500 truncate">
              {svc.url.replace(/^https?:\/\//, '')}
            </div>
          </a>
        );
      })
    )}
    </div>
    </div>
    </main>
  );
}
