import React from 'react';
import { ArrowUp, Sparkles, Code, Shield } from 'lucide-react';
import { playSound } from '../utils/sound';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    playSound('click');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    playSound('click');
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative bg-[#04040d] border-t border-[#1e1e4a] text-slate-400 py-16 overflow-hidden">
      {/* Background glow accent */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-32 opacity-10 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at bottom, #7c3aed, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 via-cyan-500 to-orange-500 flex items-center justify-center font-bold text-white font-mono text-base shadow-lg shadow-violet-500/20">
                S
              </div>
              <span
                className="font-black text-2xl tracking-tight"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                <span className="text-gradient-violet-cyan">STRING</span>
                <span className="text-[#f97316]">VERSE</span>
              </span>
            </div>

            <p className="text-slate-400 text-sm max-w-md leading-relaxed italic">
              "Every character has a story. Every string has a memory."
            </p>

            <p className="text-slate-500 text-xs leading-relaxed max-w-md">
              STRINGVERSE — An interactive exploration of Java String, StringBuilder and StringBuffer.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4
              className="text-white text-sm font-semibold tracking-wider uppercase mb-4"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              The 3 Entities
            </h4>
            <ul className="space-y-2.5 text-xs font-mono">
              <li>
                <button
                  onClick={() => scrollToSection('string')}
                  className="hover:text-cyan-400 transition-colors flex items-center gap-2 cursor-pointer text-slate-400"
                >
                  <Sparkles size={12} className="text-cyan-400" />
                  String (Immutable)
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('stringbuilder')}
                  className="hover:text-orange-400 transition-colors flex items-center gap-2 cursor-pointer text-slate-400"
                >
                  <Code size={12} className="text-orange-400" />
                  StringBuilder (Mutable)
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('stringbuffer')}
                  className="hover:text-green-400 transition-colors flex items-center gap-2 cursor-pointer text-slate-400"
                >
                  <Shield size={12} className="text-green-400" />
                  StringBuffer (Synchronized)
                </button>
              </li>
            </ul>
          </div>

          {/* Interactive Modules */}
          <div>
            <h4
              className="text-white text-sm font-semibold tracking-wider uppercase mb-4"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              Interactive Hubs
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => scrollToSection('compare')}
                  className="hover:text-violet-400 transition-colors cursor-pointer text-slate-400"
                >
                  Comparison Chamber
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('playground')}
                  className="hover:text-violet-400 transition-colors cursor-pointer text-slate-400"
                >
                  Code Playground
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('challenges')}
                  className="hover:text-violet-400 transition-colors cursor-pointer text-slate-400"
                >
                  Challenge Arena (Quiz)
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('vault')}
                  className="hover:text-violet-400 transition-colors cursor-pointer text-slate-400"
                >
                  Knowledge Vault (Reference)
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-[#1e1e4a] to-transparent mb-8" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="space-y-1 text-center sm:text-left">
            <div>
              STRINGVERSE — An interactive exploration of Java String, StringBuilder and StringBuffer.
            </div>
            <div>
              Project credits: Created for educational purposes as an interactive Object-Oriented Programming visual learning environment.
            </div>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0d0d2b] hover:bg-[#161640] border border-[#1e1e4a] hover:border-violet-500/50 text-slate-300 hover:text-white transition-all text-xs cursor-pointer group shrink-0"
            aria-label="Back to top"
          >
            <span>Back to top</span>
            <ArrowUp size={14} className="group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
