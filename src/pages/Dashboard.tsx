import { Link } from 'react-router-dom';
import { useStatus, serviceStatus, statusColor, formatUptime } from '../hooks/useStatus';

interface Service {
  name: string;
  description?: string;
  category?: string;
  display_order?: number;
  is_active?: boolean;
}

export default function Dashboard() {
  const { status, horde, lastCheck, troveStatus, crucibleStatus } = useStatus();

  const serviceModules = import.meta.glob('../../content/services/*.json', { eager: true }) as Record<string, { default: Service }>;
  const services = Object.entries(serviceModules)
    .map(([path, mod]) => ({ ...mod.default, _key: path }))
    .filter((s) => s.name && s.is_active !== false)
    .sort((a, b) => (a.display_order ?? 999) - (b.display_order ?? 999));

  const hordeSummary = !horde
    ? 'checking…'
    : horde === 'error' ? 'api unreachable'
    : horde === 'notFound' ? 'worker not found'
    : `${horde.served.toLocaleString()} served · up ${formatUptime(horde.uptime)}`;

  const badge = (s: ReturnType<typeof serviceStatus>, label: string) => (
    <span className="flex items-center gap-1.5 font-mono text-[11px]" style={{ color: statusColor(s) }}>
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: statusColor(s) }} />
      {label.toUpperCase()}
    </span>
  );

  return (
    <main className="relative max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-6 md:py-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-6">
        <div>
          <p className="font-mono text-[11px] tracking-widest text-cyan-500/70 uppercase mb-1.5">Personal node — online</p>
          <h1 className="text-2xl font-semibold text-ghost-50">Sanctum status</h1>
        </div>
        <span className="font-mono text-xs text-ghost-400">
          2 nodes · {services.length} services · {lastCheck ? `checked ${lastCheck.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}` : 'checking…'}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
        <Link to="/systems" className="block glass-panel p-5 hover:border-cyan-500/40 transition-all">
          <div className="flex items-center justify-between mb-2.5">
            <span className="font-mono text-sm text-ghost-100">the-crucible</span>
            {badge(crucibleStatus, crucibleStatus)}
          </div>
          <div className="font-mono text-xs text-ghost-400 flex flex-col gap-0.5">
            <span>cachyos · workstation</span>
            <span className="text-cyan-400">gpu → AI Horde · {hordeSummary}</span>
          </div>
        </Link>
        <Link to="/systems" className="block glass-panel p-5 hover:border-cyan-500/40 transition-all">
          <div className="flex items-center justify-between mb-2.5">
            <span className="font-mono text-sm text-ghost-100">the-trove</span>
            {badge(troveStatus, troveStatus)}
          </div>
          <div className="font-mono text-xs text-ghost-400 flex flex-col gap-0.5">
            <span>ubuntu server · docker host</span>
            <span className="text-cyan-400">{services.length} services configured</span>
          </div>
        </Link>
      </div>

      <div className="glass-panel overflow-hidden">
        <div className="px-5 py-3 border-b border-ghost-700 flex items-center justify-between">
          <span className="font-mono text-[11px] tracking-widest text-cyan-500/70 uppercase">Services</span>
          <Link to="/services" className="font-mono text-[11px] text-ghost-400 hover:text-cyan-400">view all →</Link>
        </div>
        {services.map((svc) => {
          const s = serviceStatus(svc.name, status);
          return (
            <div key={svc._key} className="flex items-center gap-4 px-5 py-3 border-b border-ghost-700 last:border-b-0 hover:bg-cyan-500/5 transition-colors">
              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: statusColor(s) }} />
              <span className="font-mono text-[13px] text-ghost-100 w-32 flex-shrink-0">{svc.name}</span>
              <span className="hidden sm:block text-xs text-ghost-400 flex-1 truncate">{svc.description}</span>
              <span className="hidden sm:inline font-mono text-[11px] text-ghost-500">the-trove</span>
            </div>
          );
        })}
      </div>
    </main>
  );
}
