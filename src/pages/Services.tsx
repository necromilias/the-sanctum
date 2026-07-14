import { useStatus, serviceStatus, statusColor, statusLabel } from '../hooks/useStatus';

interface Service {
  name: string;
  description?: string;
  category?: string;
  display_order?: number;
  is_active?: boolean;
}

export default function Services() {
  const { status } = useStatus();

  const serviceModules = import.meta.glob('../../content/services/*.json', { eager: true }) as Record<string, { default: Service }>;
  const services = Object.entries(serviceModules)
    .map(([path, mod]) => ({ ...mod.default, _key: path }))
    .filter((s) => s.name && s.is_active !== false)
    .sort((a, b) => (a.display_order ?? 999) - (b.display_order ?? 999));

  return (
    <main className="relative max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-6 md:py-8 animate-fade-in">
      <div className="mb-7">
        <p className="font-mono text-[11px] tracking-widest text-cyan-500/70 uppercase mb-1.5">~/services</p>
        <h1 className="text-2xl font-semibold text-ghost-50 mb-1.5">Featured Self-Hosted Services</h1>
        <p className="text-ghost-400 text-sm">A selected public view, not a complete operational inventory.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {services.length === 0 ? (
          <div className="col-span-full glass-panel p-8 text-center text-ghost-400 font-mono text-sm">
            No services yet. Use the Tina admin to add some.
          </div>
        ) : (
          services.map((svc) => {
            const s = serviceStatus(svc.name, status);
            return (
              <div key={svc._key} className="glass-panel p-5 flex flex-col gap-3 hover:border-cyan-500/40 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: statusColor(s) }} />
                    <h3 className="font-mono text-sm font-medium text-ghost-100">{svc.name}</h3>
                  </div>
                  <span className="font-mono text-[11px] px-2 py-0.5 rounded border border-ghost-600 text-ghost-400">
                    {svc.category}
                  </span>
                </div>

                <p className="text-xs text-ghost-400 leading-relaxed flex-1">{svc.description}</p>

                <div className="flex items-center justify-between pt-2.5 border-t border-ghost-700 font-mono text-[11px] text-ghost-500">
                  <span>host: the-trove</span>
                  <span>{statusLabel(s)}</span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </main>
  );
}
