import { Monitor, Server } from 'lucide-react';
import { useStatus, statusColor, formatUptime, type ServiceStatus } from '../hooks/useStatus';

const chip = (s: ServiceStatus) => {
  const c = statusColor(s);
  const label = s === 'online' ? 'online' : s === 'down' ? 'down' : 'checking';
  return (
    <span
      className="flex items-center gap-1.5 font-mono text-[11px] px-2 py-0.5 rounded border"
      style={{
        color: c,
        borderColor: s === 'online' ? 'rgba(74,222,128,0.4)' : s === 'down' ? 'rgba(248,113,113,0.4)' : 'rgba(255,255,255,0.15)',
        background: s === 'online' ? 'rgba(74,222,128,0.1)' : s === 'down' ? 'rgba(248,113,113,0.1)' : 'rgba(255,255,255,0.03)',
      }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: c }} />
      {label.toUpperCase()}
    </span>
  );
};

const Tag = ({ children }: { children: string }) => (
  <span className="font-mono text-xs px-2 py-0.5 rounded bg-ghost-700/50 border border-ghost-600 text-ghost-300">{children}</span>
);

const SpecRow = ({ k, v }: { k: string; v: string }) => (
  <span><span className="text-cyan-500/70">{k}:</span> {v}</span>
);

export default function Systems() {
  const { horde, troveStatus, crucibleStatus } = useStatus();

  const hordeLine = !horde
    ? 'MickRocinanteWorker · checking…'
    : horde === 'error' ? 'MickRocinanteWorker · api unreachable'
    : horde === 'notFound' ? 'MickRocinanteWorker · worker not found'
    : `MickRocinanteWorker · ${horde.served.toLocaleString()} served · up ${formatUptime(horde.uptime)}`;

  const kudosLine = horde && typeof horde === 'object' ? `${horde.kudos.toLocaleString()} earned` : '—';

  return (
    <main className="relative max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-6 md:py-8 animate-fade-in">
      <div className="mb-7">
        <p className="font-mono text-[11px] tracking-widest text-cyan-500/70 uppercase mb-1.5">~/systems</p>
        <h1 className="text-2xl font-semibold text-ghost-50 mb-1.5">Systems &amp; Hardware</h1>
        <p className="text-ghost-400 text-sm">The machines behind the sanctum.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-3">
        {/* The-Crucible */}
        <div className="glass-panel p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Monitor size={20} />
              </div>
              <div>
                <h2 className="font-mono text-[15px] font-medium text-ghost-100">The-Crucible</h2>
                <p className="text-xs text-ghost-400">Desktop workstation</p>
              </div>
            </div>
            {chip(crucibleStatus)}
          </div>
          <p className="text-[13px] text-ghost-300 leading-relaxed flex-1">
            The main workhorse where I develop my technical skills — and now its graphics card is enlisted with the AI Horde, contributing GPU compute to distributed AI generation.
          </p>
          <div className="font-mono text-xs text-ghost-400 flex flex-col gap-1 bg-void-900/60 border border-ghost-700 rounded-lg px-3.5 py-3">
            <SpecRow k="os" v="CachyOS (Arch Linux)" />
            <SpecRow k="cpu" v="Ryzen 7 3800X · 32 GB RAM" />
            <SpecRow k="gpu" v="RTX 2080 Ti → AI Horde worker" />
            <SpecRow k="horde" v={hordeLine} />
            <SpecRow k="kudos" v={kudosLine} />
            <SpecRow k="storage" v="3 TB NVMe" />
          </div>
          <div className="flex flex-wrap gap-1.5">
            <Tag>AI Horde</Tag><Tag>Arch Linux</Tag><Tag>SSH</Tag>
          </div>
        </div>

        {/* The-Trove */}
        <div className="glass-panel p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Server size={20} />
              </div>
              <div>
                <h2 className="font-mono text-[15px] font-medium text-ghost-100">The-Trove</h2>
                <p className="text-xs text-ghost-400">Homelab server</p>
              </div>
            </div>
            {chip(troveStatus)}
          </div>
          <p className="text-[13px] text-ghost-300 leading-relaxed flex-1">
            The anvil — where the work happens. Runs the Docker stack behind every service in the sanctum, now including SillyTavern for AI language exploration.
          </p>
          <div className="font-mono text-xs text-ghost-400 flex flex-col gap-1 bg-void-900/60 border border-ghost-700 rounded-lg px-3.5 py-3">
            <SpecRow k="os" v="Ubuntu Server" />
            <SpecRow k="cpu" v="Intel i5-7400 · 16 GB RAM" />
            <SpecRow k="storage" v="20 TB HDD + 240 GB NVMe" />
            <SpecRow k="stack" v="Docker · Dockge · Cloudflare" />
          </div>
          <div className="flex flex-wrap gap-1.5">
            <Tag>SillyTavern</Tag><Tag>FoundryVTT</Tag><Tag>Plex</Tag><Tag>Vaultwarden</Tag><Tag>Pi-hole</Tag>
          </div>
        </div>
      </div>

      <div className="glass-panel px-6 py-4 font-mono text-[13px] flex items-center gap-3 flex-wrap text-ghost-300">
        <span className="text-cyan-400">the-crucible</span>
        <span className="text-ghost-500">──gpu──▶</span>
        <span className="text-cyan-400">AI Horde</span>
        <span className="text-ghost-600 mx-2">│</span>
        <span className="text-cyan-400">the-trove</span>
        <span className="text-ghost-500">──docker──▶</span>
        <span className="text-cyan-400">sillytavern · foundry · plex · vaultwarden · pi-hole</span>
      </div>
    </main>
  );
}
