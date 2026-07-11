/* eslint-disable react-refresh/only-export-components -- status helpers share the provider's domain */
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export type ServiceStatus = 'checking' | 'online' | 'down' | 'shielded';

// Probe targets only — never rendered as links.
// Only public services hosted by The-Trove are probed. Private/unbound services are
// reported as shielded rather than inferring their health from unrelated endpoints.
const PROBE_URLS: Record<string, string> = {
  SillyTavern: 'https://tavern.micksfoundry.org',
  FoundryVTT: 'https://game.micksfoundry.org',
};

export const SHIELDED_SERVICES = ['Vaultwarden', 'Plex', 'Pi-hole'];

const HORDE_WORKER = 'MickRocinanteWorker';
const HORDE_API = `https://aihorde.net/api/v2/workers?name=${HORDE_WORKER}`;

export interface HordeWorker {
  online: boolean;
  uptime: number;   // seconds
  served: number;   // requests_fulfilled
  kudos: number;    // kudos_rewards
}

interface StatusState {
  status: Record<string, ServiceStatus>;
  horde: HordeWorker | 'error' | 'notFound' | null;
  lastCheck: Date | null;
  troveStatus: ServiceStatus;
  crucibleStatus: ServiceStatus;
}

const StatusContext = createContext<StatusState>({
  status: {},
  horde: null,
  lastCheck: null,
  troveStatus: 'checking',
  crucibleStatus: 'checking',
});

function probe(url: string, timeout = 6000): Promise<boolean> {
  return new Promise((resolve) => {
    const ctrl = new AbortController();
    const t = setTimeout(() => { ctrl.abort(); resolve(false); }, timeout);
    fetch(url, { mode: 'no-cors', cache: 'no-store', signal: ctrl.signal })
      .then(() => { clearTimeout(t); resolve(true); })
      .catch(() => { clearTimeout(t); resolve(false); });
  });
}

export function StatusProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<Record<string, ServiceStatus>>({});
  const [horde, setHorde] = useState<StatusState['horde']>(null);
  const [lastCheck, setLastCheck] = useState<Date | null>(null);

  useEffect(() => {
    const checkAll = async () => {
      const probes = await Promise.all(
        Object.entries(PROBE_URLS).map(async ([name, url]) => [name, await probe(url)] as const),
      );
      setStatus(Object.fromEntries(probes.map(([name, ok]) => [name, ok ? 'online' : 'down'])));

      await fetch(HORDE_API, { cache: 'no-store' })
        .then((r) => {
          if (!r.ok) throw new Error(`AI Horde returned ${r.status}`);
          return r.json();
        })
        .then((data) => {
          const w = Array.isArray(data) ? data[0] : null;
          if (w) setHorde({ online: !!w.online, uptime: w.uptime || 0, served: w.requests_fulfilled || 0, kudos: w.kudos_rewards || 0 });
          else setHorde('notFound');
        })
        .catch(() => setHorde('error'));
      setLastCheck(new Date());
    };
    checkAll();
    const iv = setInterval(checkAll, 60000);
    return () => clearInterval(iv);
  }, []);

  const names = Object.keys(PROBE_URLS);
  const resolved = names.map((n) => status[n]).filter(Boolean);
  const troveStatus: ServiceStatus = resolved.includes('online')
    ? 'online'
    : resolved.length === names.length ? 'down' : 'checking';
  const crucibleStatus: ServiceStatus =
    horde === null ? 'checking' : typeof horde === 'object' && horde.online ? 'online' : 'down';

  return (
    <StatusContext.Provider value={{ status, horde, lastCheck, troveStatus, crucibleStatus }}>
      {children}
    </StatusContext.Provider>
  );
}

export const useStatus = () => useContext(StatusContext);

export function serviceStatus(name: string, status: Record<string, ServiceStatus>): ServiceStatus {
  if (SHIELDED_SERVICES.includes(name)) return 'shielded';
  return status[name] ?? 'checking';
}

export function statusColor(s: ServiceStatus): string {
  if (s === 'online') return '#4ade80';
  if (s === 'down') return '#f87171';
  if (s === 'shielded') return 'rgba(0,180,216,0.45)';
  return 'rgba(255,255,255,0.3)';
}

export function formatUptime(sec: number): string {
  const d = Math.floor(sec / 86400);
  const h = Math.floor((sec % 86400) / 3600);
  return d > 0 ? `${d}d ${h}h` : `${h}h`;
}
