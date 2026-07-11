import { NavLink } from 'react-router-dom';
import { Terminal } from 'lucide-react';

const navItems = [
  { to: '/', label: '~/dashboard' },
  { to: '/services', label: '~/services' },
  { to: '/systems', label: '~/systems' },
  { to: '/portfolio', label: '~/portfolio' },
  { to: '/about', label: '~/about' },
];

export default function Sidebar() {
  return (
    <aside className="w-16 md:w-52 flex-shrink-0 border-r border-ghost-700 bg-void-900/90 sticky top-0 h-screen p-2 md:p-3 pt-5 flex flex-col gap-6 z-20">
      <NavLink to="/" aria-label="The Sanctum dashboard" className="flex items-center justify-center md:justify-start gap-2 md:px-2">
        <div className="w-7 h-7 rounded-md bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center flex-shrink-0">
          <Terminal size={14} className="text-cyan-400" />
        </div>
        <span className="hidden md:inline font-mono text-[13px] text-ghost-100">the-sanctum</span>
      </NavLink>

      <nav className="flex flex-col gap-0.5 font-mono text-[13px]">
        {navItems.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            aria-label={label.replace('~/', '')}
            className={({ isActive }) =>
              isActive
                ? 'text-cyan-400 bg-cyan-500/10 border border-cyan-500/25 rounded-lg px-1 md:px-3 py-2 text-center md:text-left'
                : 'text-ghost-300 border border-transparent px-1 md:px-3 py-2 rounded-lg text-center md:text-left transition-colors duration-200 hover:text-cyan-400'
            }
          >
            <span className="md:hidden">{label.slice(2, 3)}</span>
            <span className="hidden md:inline">{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto font-mono text-[11px] text-ghost-500 md:px-2 text-center md:text-left">
        <span className="hidden md:inline">node@homelab ~ </span><span className="text-cyan-500/60">■</span>
      </div>
    </aside>
  );
}
