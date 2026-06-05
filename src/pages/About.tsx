import { useState, useEffect } from 'react';
import { Loader2, Github, Mail, User, Zap, Clock, MessageSquare } from 'lucide-react';

const SECTION_ICONS = {
  bio: User,
  skills: Zap,
  timeline: Clock,
  contact: MessageSquare,
};

export default function About() {
  // Temporary static content until we set up local data
  const [loading] = useState(false);

  return (
    <main className="max-w-4xl mx-auto px-4 py-12 animate-fade-in">
    <div className="fixed inset-0 pointer-events-none">
    <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-100" />
    <div className="absolute inset-0 bg-glow-cyan" />
    </div>

    <div className="relative z-10">
    <div className="mb-10">
    <p className="section-heading">~/about</p>
    <h1 className="page-title mb-2">About Me</h1>
    <p className="text-ghost-400 text-sm">Welcome to the sanctum.</p>
    </div>

    {loading ? (
      <div className="flex items-center gap-3 text-ghost-400 font-mono text-sm py-16 justify-center">
      <Loader2 size={16} className="animate-spin text-cyan-400" />
      Loading...
      </div>
    ) : (
      <div className="space-y-6">
      <div className="glass-panel p-8">
      <h2 className="font-mono text-xs tracking-widest text-cyan-500/70 uppercase mb-4">Bio</h2>
      <p className="text-ghost-300 leading-relaxed">
      Self-hoster, hobbyist developer, and KDE enjoyer running CachyOS.
      </p>
      </div>
      </div>
    )}
    </div>
    </main>
  );
}
