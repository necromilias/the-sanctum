import { Monitor, Server } from 'lucide-react';
import { useStatus, formatUptime } from '../hooks/useStatus';

const Tag = ({ children }: { children: string }) => (
  <span className="font-mono text-xs px-2 py-0.5 rounded bg-ghost-700/50 border border-ghost-600 text-ghost-300">{children}</span>
);

const SpecRow = ({ k, v }: { k: string; v: string }) => (
  <span><span className="text-cyan-500/70">{k}:</span> {v}</span>
);

export default function Systems() {
  const { horde } = useStatus();

  const hordeLine = !horde
    ? 'MickRocinanteWorker · checking…'
    : horde === 'error' ? 'MickRocinanteWorker · api unreachable'
    : horde === 'notFound' ? 'MickRocinanteWorker · worker not found'
    : `MickRocinanteWorker · ${horde.online ? 'online' : 'offline'} · ${horde.served.toLocaleString()} served · worker-reported uptime ${formatUptime(horde.uptime)}`;

  const kudosLine = horde && typeof horde === 'object' ? `${horde.kudos.toLocaleString()} earned` : '—';

  return (
    <main className="relative max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-6 md:py-8 animate-fade-in">
      <div className="mb-7">
        <p className="font-mono text-[11px] tracking-widest text-cyan-500/70 uppercase mb-1.5">~/systems</p>
        <h1 className="text-2xl font-semibold text-ghost-50 mb-1.5">Systems &amp; Hardware</h1>
        <p className="text-ghost-400 text-sm">The machines behind the sanctum.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-3">
        {/* The-Forge */}
        <div className="glass-panel p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Monitor size={20} />
              </div>
              <div>
                <h2 className="font-mono text-[15px] font-medium text-ghost-100">The-Forge</h2>
                <p className="text-xs text-ghost-400">Desktop workstation</p>
              </div>
            </div>
          </div>
          <p className="text-[13px] text-ghost-300 leading-relaxed flex-1">
            My CachyOS desktop and GPU workstation, contributing compute through AI Horde and running the WhisperX transcription workflow.
          </p>
          <div className="font-mono text-xs text-ghost-400 flex flex-col gap-1 bg-void-900/60 border border-ghost-700 rounded-lg px-3.5 py-3">
            <SpecRow k="os" v="CachyOS · KDE Plasma · Wayland" />
            <SpecRow k="cpu" v="Ryzen 7 3800X · 31 GiB RAM" />
            <SpecRow k="gpu" v="RTX 2080 Ti · 11 GiB" />
            <SpecRow k="horde" v={hordeLine} />
            <SpecRow k="kudos" v={kudosLine} />
            <SpecRow k="storage" v="2 TB + 1 TB NVMe" />
          </div>
          <div className="flex flex-wrap gap-1.5">
            <Tag>AI Horde</Tag><Tag>WhisperX</Tag><Tag>CachyOS</Tag>
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
          </div>
          <p className="text-[13px] text-ghost-300 leading-relaxed flex-1">
            The primary homelab server, hosting a collection of containerised services and pooled storage for the household.
          </p>
          <div className="font-mono text-xs text-ghost-400 flex flex-col gap-1 bg-void-900/60 border border-ghost-700 rounded-lg px-3.5 py-3">
            <SpecRow k="os" v="Ubuntu Server 26.04 LTS" />
            <SpecRow k="cpu" v="Intel i5-7400 · 16 GB RAM" />
            <SpecRow k="storage" v="approx. 20 TB pooled + 238.5 GB NVMe" />
            <SpecRow k="stack" v="Docker Compose · Cloudflare Tunnel" />
          </div>
          <div className="flex flex-wrap gap-1.5">
            <Tag>SillyTavern</Tag><Tag>FoundryVTT</Tag><Tag>Plex</Tag><Tag>Vaultwarden</Tag><Tag>Pi-hole</Tag>
          </div>
        </div>
      </div>

      <div className="glass-panel px-6 py-4 font-mono text-[13px] flex items-center gap-3 flex-wrap text-ghost-300">
        <span className="text-cyan-400">the-forge</span>
        <span className="text-ghost-500">──workloads──▶</span>
        <span className="text-cyan-400">AI Horde · WhisperX</span>
        <span className="text-ghost-600 mx-2">│</span>
        <span className="text-cyan-400">the-trove</span>
        <span className="text-ghost-500">──docker──▶</span>
        <span className="text-cyan-400">featured self-hosted services</span>
      </div>
    </main>
  );
}
