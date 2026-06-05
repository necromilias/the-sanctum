import { NavLink, useLocation } from 'react-router-dom';
import { Terminal, Server, FolderGit2, User, Menu, X } from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { to: '/',          label: 'home',      icon: Terminal },
  { to: '/services',  label: 'services',  icon: Server },
  { to: '/portfolio', label: 'portfolio', icon: FolderGit2 },
  { to: '/about',     label: 'about',     icon: User },
];

export default function Nav() {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const crumb = navItems.find(n => n.to === location.pathname)?.label ?? 'home';

  return (
    <header className="sticky top-0 z-50 border-b border-ghost-700 bg-void-900/90 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">

        {/* Logo + breadcrumb */}
        <NavLink to="/" className="flex items-center gap-2 group">
          <div className="w-7 h-7 rounded-md bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center group-hover:border-cyan-500/60 transition-colors duration-200">
            <Terminal size={14} className="text-cyan-400" />
          </div>
          <span className="font-mono text-sm">
            <span className="text-ghost-400">~</span>
            <span className="text-ghost-400">/</span>
            <span className="text-cyan-400">{crumb}</span>
          </span>
        </NavLink>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) => isActive ? 'nav-link-active' : 'nav-link'}
            >
              <span className="flex items-center gap-1.5">
                <Icon size={13} />
                {label}
              </span>
            </NavLink>
          ))}
        </nav>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-ghost-300 hover:text-cyan-400 transition-colors p-1"
          onClick={() => setOpen(o => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile nav */}
      {open && (
        <div className="md:hidden border-t border-ghost-700 bg-void-900/95 backdrop-blur-md px-4 py-3 flex flex-col gap-1">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-lg font-mono text-sm transition-colors duration-200 ${
                  isActive
                    ? 'text-cyan-400 bg-cyan-500/10 border border-cyan-500/25'
                    : 'text-ghost-300 hover:text-cyan-400 hover:bg-ghost-700'
                }`
              }
            >
              <Icon size={14} />
              {label}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  );
}
