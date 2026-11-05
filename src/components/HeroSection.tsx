import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { StringCharacter, StringBuilderCharacter, StringBufferCharacter } from './Characters';
import { playSound } from '../utils/sound';

// Floating particle data (static deterministic values for pure rendering)
const PARTICLES = Array.from({ length: 30 }, (_, i) => {
  const colors = ['#7c3aed', '#06b6d4', '#f97316', '#10b981'];
  // Deterministic pseudo-random generation based on index
  const pseudoX = ((i * 37 + 13) % 100);
  const pseudoY = ((i * 41 + 29) % 100);
  const pseudoSize = ((i * 7) % 3) + 1.5;
  const pseudoDuration = ((i * 3) % 6) + 7;
  const pseudoDelay = ((i * 5) % 4);
  const color = colors[i % colors.length];

  return {
    id: i,
    x: pseudoX,
    y: pseudoY,
    size: pseudoSize,
    duration: pseudoDuration,
    delay: pseudoDelay,
    color,
  };
});

const ParticleField: React.FC = () => {
  return (
    <div className="particles-bg" aria-hidden="true">
      {PARTICLES.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            opacity: 0.4,
          }}
          animate={{
            y: [0, -40, 0],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};

// Animated grid lines background
const GridBackground: React.FC = () => (
  <div className="absolute inset-0 opacity-10" aria-hidden="true"
    style={{
      backgroundImage: `
        linear-gradient(rgba(124,58,237,0.3) 1px, transparent 1px),
        linear-gradient(90deg, rgba(124,58,237,0.3) 1px, transparent 1px)
      `,
      backgroundSize: '60px 60px',
    }}
  />
);

const HeroSection: React.FC = () => {
  const [entered, setEntered] = useState(false);

  const handleEnter = () => {
    playSound('transition');
    setEntered(true);
    setTimeout(() => {
      const stringSection = document.getElementById('string');
      if (stringSection) stringSection.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  const handleExplore = () => {
    playSound('click');
    const compareSection = document.getElementById('compare');
    if (compareSection) compareSection.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #050510 0%, #080820 50%, #0d0d2b 100%)' }}
      aria-label="STRINGVERSE hero section"
    >
      <GridBackground />
      <ParticleField />

      {/* Radial glow behind content */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-10 animate-pulse-glow"
        style={{ background: 'radial-gradient(circle, #7c3aed 0%, #06b6d4 40%, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
        {/* Wordmark */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mb-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-400 text-sm font-mono mb-6">
            <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
            Java OOP Exploration
          </div>

          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-none mb-2"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            <span className="block text-xl sm:text-2xl md:text-3xl text-slate-400 font-normal tracking-wide uppercase mb-3">Welcome to</span>
            <span className="text-gradient-violet-cyan">STRING</span>
            <span style={{ color: '#f97316' }}>VERSE</span>
          </h1>

          <p className="text-slate-400 text-lg sm:text-xl font-light tracking-widest uppercase mt-4">
            Every character has a story. Every string has a memory.
          </p>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
          className="text-slate-300 text-lg sm:text-xl max-w-2xl mx-auto mb-16 leading-relaxed"
        >
          Three Java classes. Three different personalities.{' '}
          <span className="text-white font-medium">One fascinating world of text.</span>
        </motion.p>

        {/* Characters */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
          className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16 mb-16"
        >
          {/* String */}
          <div className="flex flex-col items-center gap-3">
            <StringCharacter size={130} />
            <div className="text-center">
              <div className="text-cyan-400 font-bold text-lg" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                STRING
              </div>
              <div className="text-slate-500 text-sm">The Immutable One</div>
            </div>
          </div>

          {/* StringBuilder */}
          <div className="flex flex-col items-center gap-3">
            <StringBuilderCharacter size={130} />
            <div className="text-center">
              <div className="text-orange-400 font-bold text-lg" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                STRINGBUILDER
              </div>
              <div className="text-slate-500 text-sm">The Fast Builder</div>
            </div>
          </div>

          {/* StringBuffer */}
          <div className="flex flex-col items-center gap-3">
            <StringBufferCharacter size={130} />
            <div className="text-center">
              <div className="text-green-400 font-bold text-lg" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                STRINGBUFFER
              </div>
              <div className="text-slate-500 text-sm">The Synchronized Guardian</div>
            </div>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease: 'easeOut' }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <AnimatePresence>
            {!entered ? (
              <motion.button
                key="enter-btn"
                onClick={handleEnter}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="relative px-8 py-4 rounded-xl font-bold text-lg text-white overflow-hidden group cursor-pointer"
                style={{
                  background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
                  boxShadow: '0 0 30px rgba(124,58,237,0.4)',
                }}
                aria-label="Enter the STRINGVERSE interactive experience"
              >
                <span className="relative z-10 tracking-wide" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  ENTER THE STRINGVERSE
                </span>
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.button>
            ) : (
              <motion.div
                key="entering"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-violet-400 font-mono"
              >
                Entering the Stringverse...
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            onClick={handleExplore}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-4 rounded-xl font-semibold text-lg text-slate-300 border border-slate-600 hover:border-violet-500 hover:text-white transition-all duration-300 cursor-pointer"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            aria-label="Explore Java string concepts"
          >
            Explore the Concepts
          </motion.button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500"
        aria-hidden="true"
      >
        <span className="text-xs tracking-widest uppercase">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
