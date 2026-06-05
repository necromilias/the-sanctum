import { Link } from 'react-router-dom';
import { Server, FolderGit2, User, ArrowRight, Cpu, HardDrive, Wifi } from 'lucide-react';

const quickLinks = [
  {
    to: '/services',
    label: 'Services',
    description: 'Browse self-hosted apps',
    icon: Server,
  },
{
  to: '/portfolio',
  label: 'Portfolio',
  description: 'My projects & learning',
  icon: FolderGit2,
},
{
  to: '/about',
  label: 'About',
  description: 'Who I am',
  icon: User,
},
];

export default function Home() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-16 md:py-24 animate-fade-in">
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
    <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-100" />
    <div className="absolute inset-0 bg-glow-cyan" />
    <div className="absolute inset-0 bg-glow-blue" />
    </div>

    <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
    <div className="space-y-8">
    <div className="space-y-3">
    <p className="font-mono text-xs tracking-widest text-cyan-500/70 uppercase">
    Personal Node — Online
    </p>
    <h1 className="text-4xl md:text-5xl font-semibold text-ghost-50 leading-tight">
    Welcome to <span className="text-cyan-400">the-sanctum</span>
    </h1>
    <p className="text-ghost-300 leading-relaxed max-w-md">
    My personal homelab hub. Self-hosted services, projects, and notes from the crucible.
    </p>
    </div>

    <div className="glass-panel p-6 font-mono text-sm">
    <div className="text-cyan-400">&gt; System online.</div>
    <div className="text-ghost-400">&gt; Access granted.</div>
    </div>
    </div>

    <div className="space-y-4">
    {quickLinks.map(({ to, label, description, icon: Icon }) => (
      <Link
      key={to}
      to={to}
      className="group glass-panel block p-5 hover:border-cyan-500/40 transition-all"
      >
      <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
      <div className="w-10 h-10 rounded-lg border border-cyan-500/30 flex items-center justify-center text-cyan-400">
      <Icon size={18} />
      </div>
      <div>
      <p className="font-mono text-sm font-medium">~/{label}</p>
      <p className="text-xs text-ghost-400">{description}</p>
      </div>
      </div>
      <ArrowRight size={16} className="text-ghost-500 group-hover:text-cyan-400" />
      </div>
      </Link>
    ))}
    </div>
    </div>
    </main>
  );
}
