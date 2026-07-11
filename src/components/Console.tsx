import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStatus, serviceStatus, SHIELDED_SERVICES, formatUptime } from '../hooks/useStatus';

interface Line { text: string; dim: boolean; }

const PAGES = ['dashboard', 'services', 'systems', 'portfolio', 'about'];
const PROBED = ['SillyTavern', 'FoundryVTT'];

export default function Console() {
  const navigate = useNavigate();
  const { status, horde } = useStatus();
  const [lines, setLines] = useState<Line[]>([
    { text: '> the-sanctum v2 — access granted.', dim: false },
    { text: "> type 'help' for commands", dim: true },
  ]);
  const [input, setInput] = useState('');
  const boxRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const print = (add: Line[]) => {
    setLines((ls) => [...ls, ...add].slice(-14));
    requestAnimationFrame(() => {
      const el = boxRef.current;
      if (el) el.scrollTop = el.scrollHeight;
    });
  };

  const run = (raw: string) => {
    const cmd = raw.trim();
    print([{ text: `guest@sanctum:~$ ${cmd}`, dim: true }]);
    const [name, ...args] = cmd.split(/\s+/);
    switch (name) {
      case '':
        break;
      case 'help':
        print([{ text: 'help · status · horde · cd <page> · ls · whoami · clear', dim: false }]);
        break;
      case 'ls':
        print([{ text: PAGES.map((p) => `~/${p}`).join('  '), dim: false }]);
        break;
      case 'cd': {
        const target = (args[0] || '').replace(/^~?\//, '');
        if (PAGES.includes(target)) {
          navigate(target === 'dashboard' ? '/' : `/${target}`);
          print([{ text: `moved to ~/${target}`, dim: true }]);
        } else {
          print([{ text: `cd: no such node: ${args[0] || ''}`, dim: true }]);
        }
        break;
      }
      case 'status': {
        const rows = PROBED.map((n) => {
          const s = serviceStatus(n, status);
          return { text: `${n.toLowerCase()}: ${s}`, dim: s !== 'online' };
        });
        SHIELDED_SERVICES.forEach((n) => rows.push({ text: `${n.toLowerCase()}: shielded`, dim: true }));
        print(rows);
        break;
      }
      case 'horde': {
        if (!horde) print([{ text: 'checking…', dim: true }]);
        else if (horde === 'error' || horde === 'notFound') print([{ text: 'worker unavailable', dim: true }]);
        else print([{ text: `MickRocinanteWorker: ${horde.online ? 'online' : 'offline'} · ${horde.served.toLocaleString()} served · ${horde.kudos.toLocaleString()} kudos · up ${formatUptime(horde.uptime)}`, dim: false }]);
        break;
      }
      case 'whoami':
        print([{ text: 'guest — read-only access. the sanctum belongs to necromilias.', dim: false }]);
        break;
      case 'clear':
        setLines([]);
        break;
      case 'sudo':
        print([{ text: 'nice try.', dim: false }]);
        break;
      default:
        print([{ text: `command not found: ${name} — try 'help'`, dim: true }]);
    }
  };

  return (
    <div
      ref={boxRef}
      onClick={() => inputRef.current?.focus()}
      className="fixed left-20 md:left-56 right-3 md:right-4 bottom-3 md:bottom-4 z-30 bg-void-900/95 backdrop-blur-md border border-cyan-500/25 rounded-xl shadow-glow px-3 md:px-5 py-3 md:py-3.5 font-mono text-xs flex flex-col gap-1 cursor-text max-h-[150px] overflow-y-auto"
    >
      {lines.map((l, i) => (
        <span key={i} className={l.dim ? 'text-ghost-400 whitespace-pre-wrap break-words' : 'text-cyan-400 whitespace-pre-wrap break-words'}>
          {l.text}
        </span>
      ))}
      <div className="flex items-center gap-2">
        <span className="text-cyan-400 hidden sm:inline">guest@sanctum:~$</span>
        <span className="text-cyan-400 sm:hidden">$</span>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') { const v = input; setInput(''); run(v); }
          }}
          spellCheck={false}
          autoComplete="off"
          aria-label="terminal input"
          className="flex-1 bg-transparent border-none outline-none text-ghost-100 font-mono text-xs p-0 caret-cyan-400"
        />
      </div>
    </div>
  );
}
