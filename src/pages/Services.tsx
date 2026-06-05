import { ExternalLink, Globe, Loader2 } from 'lucide-react';

export default function Services() {
  // Temporary static services
  const services = [
    {
      id: '1',
      name: "Example Service",
      description: "This is a placeholder. Add your real services later.",
      url: "https://example.com",
      icon_name: "Server",
      category: "General",
    }
  ];

  return (
    <main className="max-w-6xl mx-auto px-4 py-12 animate-fade-in">
    <div className="fixed inset-0 pointer-events-none">
    <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-100" />
    <div className="absolute inset-0 bg-glow-cyan" />
    </div>

    <div className="relative z-10">
    <div className="mb-10">
    <p className="section-heading">~/services</p>
    <h1 className="page-title mb-2">Self-Hosted Services</h1>
    <p className="text-ghost-400 text-sm">Services running on the-trove.</p>
    </div>

    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {services.map(svc => (
      <a
      key={svc.id}
      href={svc.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group glass-panel-hover p-5 flex flex-col gap-4"
      >
      <div className="flex items-start justify-between">
      <div className="w-10 h-10 rounded-lg border flex items-center justify-center flex-shrink-0 text-cyan-400">
      <Globe size={22} />
      </div>
      <ExternalLink size={14} className="text-ghost-500 group-hover:text-cyan-400 mt-1" />
      </div>

      <div className="flex-1">
      <h3 className="font-mono text-sm font-medium text-ghost-100 group-hover:text-cyan-400">
      {svc.name}
      </h3>
      <p className="text-xs text-ghost-400 mt-1 leading-relaxed">
      {svc.description}
      </p>
      </div>

      <div className="font-mono text-xs text-ghost-500 truncate">
      {svc.url.replace(/^https?:\/\//, '')}
      </div>
      </a>
    ))}
    </div>
    </div>
    </main>
  );
}
