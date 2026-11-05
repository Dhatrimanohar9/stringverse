import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import StringSection from './components/StringSection';
import StringBuilderSection from './components/StringBuilderSection';
import StringBufferSection from './components/StringBufferSection';
import CompareSection from './components/CompareSection';
import PlaygroundSection from './components/PlaygroundSection';
import ChallengesSection from './components/ChallengesSection';
import KnowledgeVaultSection from './components/KnowledgeVaultSection';
import Footer from './components/Footer';
import { playSound } from './utils/sound';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    // Initial loading transition
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1100);

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    playSound('click');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#050510] text-[#f1f5f9] selection:bg-violet-500/30 selection:text-white relative">
      {/* Initial loading screen */}
      <AnimatePresence>
        {loading && (
          <motion.div
            key="preloader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className="fixed inset-0 z-[100] bg-[#050510] flex flex-col items-center justify-center p-4"
          >
            <div className="relative flex flex-col items-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600 via-cyan-500 to-orange-500 flex items-center justify-center font-bold text-white text-2xl font-mono shadow-2xl shadow-violet-500/50 mb-6"
              >
                S
              </motion.div>

              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-3xl sm:text-4xl font-black tracking-tight mb-2"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                <span className="text-gradient-violet-cyan">STRING</span>
                <span className="text-[#f97316]">VERSE</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="text-xs uppercase tracking-widest text-slate-500 font-mono mb-8"
              >
                Initializing Java String Cosmos...
              </motion.p>

              {/* Glowing progress line */}
              <div className="w-48 h-1 bg-[#111133] rounded-full overflow-hidden">
                <motion.div
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{ repeat: Infinity, duration: 1, ease: 'easeInOut' }}
                  className="w-full h-full bg-gradient-to-r from-violet-500 via-cyan-400 to-orange-500"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main app navigation */}
      <Navbar />

      {/* Main content sections */}
      <main id="main-content">
        {/* Page 1: Cinematic Landing Page */}
        <HeroSection />

        {/* Page 2: The String Kingdom */}
        <StringSection />

        {/* Page 3: StringBuilder Workshop */}
        <StringBuilderSection />

        {/* Page 4: StringBuffer Control Centre */}
        <StringBufferSection />

        {/* Page 5: The Comparison Chamber */}
        <CompareSection />

        {/* Page 6: Code Playground */}
        <PlaygroundSection />

        {/* Page 7: Challenge Arena */}
        <ChallengesSection />

        {/* Page 8: Knowledge Vault */}
        <KnowledgeVaultSection />
      </main>

      {/* Page 8 Footer & Project Credits */}
      <Footer />

      {/* Floating Back to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            key="scroll-top-btn"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-40 p-3 rounded-xl bg-[#0d0d2b]/90 backdrop-blur-md border border-[#2d2d7a] text-slate-300 hover:text-white hover:border-violet-500 shadow-xl shadow-black/50 transition-all cursor-pointer group"
            aria-label="Scroll back to top of page"
            title="Scroll to top"
          >
            <ArrowUp size={18} className="group-hover:-translate-y-1 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
