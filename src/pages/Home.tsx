import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Server, FolderGit2, User, ArrowRight, Cpu, HardDrive, Wifi } from 'lucide-react';
import { supabase } from '../lib/supabase';

const TYPING_LINES = [
  '> Initialising personal node...',
  '> Loading service registry...',
  '> Mounting portfolio...',
  '> System ready.',
];

function TypingAnimation() {
  const [lines, setLines] = useState<string[]>([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let lineIdx = 0;
    let charIdx = 0;
    let current = '';

    const tick = () => {
      if (lineIdx >= TYPING_LINES.length) {
        setDone(true);
        return;
      }
      const target = TYPING_LINES[lineIdx];
      if (charIdx <= target.length) {
        current = target.slice(0, charIdx);
        setLines(prev => {
          const next = [...prev];
          next[lineIdx] = current;
          return next;
        });
        charIdx++;
        setTimeout(tick, charIdx === 1 ? 300 : 28);
      } else {
        lineIdx++;
        charIdx = 0;
        setTimeout(tick, 180);
      }
    };

    const initial = setTimeout(tick, 400);
    return () => clearTimeout(initial);
  }, []);

  return (
    <div className="font-mono text-sm space-y-1 min-h-[6rem]">
      {lines.map((line, i) => (
        <div key={i} className={i < lines.length - 1 || done ? 'text-ghost-300' : 'text-cyan-300'}>
          {line}
          {i === lines.length - 1 && !done && (
            <span className="inline-block w-2 h-4 bg-cyan-400 ml-0.5 animate-cursor-blink align-middle" />
          )}
        </div>
      ))}
      {done && (
        <div className="text-success-400 animate-fade-in">
          {'> '}
          <span className="text-ghost-100">Access granted.</span>
          <span className="inline-block w-2 h-4 bg-cyan-400 ml-0.5 animate-cursor-blink align-middle" />
        </div>
      )}
    </div>
  );
}

const quickLinks = [
  {
    to: '/services',
    label: 'Services',
    description: 'Browse and launch self-hosted apps',
    icon: Server,
    accent: 'cyan',
  },
  {
    to: '/portfolio',
    label: 'Portfolio',
    description: 'Coding projects and learning journey',
    icon: FolderGit2,
    accent: 'blue',
  },
  {
    to: '/about',
    label: 'About',
    description: 'Who I am and what I build',
    icon: User,
    accent: 'teal',
  },
];

const accentMap: Record<string, string> = {
  cyan: 'border-cyan-500/30 hover:border-cyan-500/60 hover:shadow-glow group-hover:text-cyan-400',
  blue: 'border-blue-500/30 hover:border-blue-400/60 hover:shadow-[0_0_24px_rgba(41,82,240,0.25)]  group-hover:text-blue-300',
  teal: 'border-teal-500/30 hover:border-teal-400/60 hover:shadow-[0_0_24px_rgba(20,184,166,0.25)] group-hover:text-teal-400',
};
const iconAccentMap: Record<string, string> = {
  cyan: 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400',
  blue: 'bg-blue-500/10 border-blue-500/30 text-blue-300',
  teal: 'bg-teal-500/10 border-teal-500/30 text-teal-400',
};

interface Stats {
  services: number;
  projects: number;
}

export default function Home() {
  const [stats, setStats] = useState<Stats>({ services: 0, projects: 0 });

  useEffect(() => {
    Promise.all([
      supabase.from('services').select('id', { count: 'exact', head: true }).eq('is_active', true),
      supabase.from('projects').select('id', { count: 'exact', head: true }),
    ]).then(([svc, proj]) => {
      setStats({ services: svc.count ?? 0, projects: proj.count ?? 0 });
    });
  }, []);

  return (
    <main className="max-w-6xl mx-auto px-4 py-16 md:py-24 animate-fade-in">
      {/* Background glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-100" />
        <div className="absolute inset-0 bg-glow-cyan" />
        <div className="absolute inset-0 bg-glow-blue" />
      </div>

      <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
        {/* Left: identity + typing */}
        <div className="space-y-8">
          <div className="space-y-3">
            <p className="font-mono text-xs tracking-widest text-cyan-500/70 uppercase">
              Personal Node — Online
            </p>
            <h1 className="text-4xl md:text-5xl font-semibold text-ghost-50 leading-tight">
              Hello, I'm{' '}
              <span className="text-cyan-400 text-glow">
                a self-hoster
              </span>
              <br />& hobbyist dev.
            </h1>
            <p className="text-ghost-300 leading-relaxed max-w-md">
              Running CachyOS with KDE Plasma. Building my own infrastructure,
              owning my own data, and slowly learning to code.
            </p>
          </div>

          {/* Terminal card */}
          <div className="glass-panel overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-ghost-700 bg-void-800/50">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-error-500/70" />
                <span className="w-3 h-3 rounded-full bg-warning-500/70" />
                <span className="w-3 h-3 rounded-full bg-success-500/70" />
              </div>
              <span className="font-mono text-xs text-ghost-400 ml-1">bash — node@homelab</span>
            </div>
            <div className="p-5">
              <TypingAnimation />
            </div>
          </div>

          {/* System stats strip */}
          <div className="flex flex-wrap gap-4">
            {[
              { icon: Server,    label: 'Services',  value: stats.services.toString(), color: 'text-cyan-400' },
              { icon: FolderGit2, label: 'Projects', value: stats.projects.toString(), color: 'text-blue-300' },
              { icon: Cpu,       label: 'OS',        value: 'CachyOS',                color: 'text-teal-400' },
              { icon: HardDrive, label: 'DE',        value: 'KDE Plasma',             color: 'text-ghost-300' },
              { icon: Wifi,      label: 'Tunnels',   value: 'Cloudflare',             color: 'text-ghost-300' },
            ].map(({ icon: Icon, label, value, color }) => (
              <div key={label} className="flex items-center gap-2 font-mono text-xs text-ghost-400">
                <Icon size={12} className={color} />
                <span className="text-ghost-500">{label}:</span>
                <span className={color}>{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: quick-nav cards */}
        <div className="space-y-4">
          {quickLinks.map(({ to, label, description, icon: Icon, accent }) => (
            <Link
              key={to}
              to={to}
              className={`group glass-panel block p-5 transition-all duration-300 ${accentMap[accent]}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-lg border flex items-center justify-center flex-shrink-0 ${iconAccentMap[accent]}`}>
                    <Icon size={18} />
                  </div>
                  <div>
                    <p className="font-mono text-sm font-medium text-ghost-100 group-hover:text-inherit transition-colors duration-200">
                      ~/{label}
                    </p>
                    <p className="text-xs text-ghost-400 mt-0.5">{description}</p>
                  </div>
                </div>
                <ArrowRight size={16} className="text-ghost-500 group-hover:translate-x-1 transition-transform duration-200" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
