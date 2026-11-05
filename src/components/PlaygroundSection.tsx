import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, ChevronLeft, ChevronRight, Code2, Terminal, Info } from 'lucide-react';
import { codeExamples } from '../data/codeExamples';
import type { CodeExample } from '../types';
import { playSound } from '../utils/sound';

// Simple Java syntax highlighter
const highlightJava = (code: string): React.ReactNode => {
  const lines = code.split('\n');
  return lines.map((line, lineIdx) => {
    const tokens: React.ReactNode[] = [];
    let remaining = line;
    let key = 0;

    // Parse line into tokens
    while (remaining.length > 0) {
      // Comment
      if (remaining.startsWith('//')) {
        tokens.push(<span key={key++} className="text-slate-500 italic">{remaining}</span>);
        remaining = '';
        continue;
      }
      // String literal
      const strMatch = remaining.match(/^"([^"\\]|\\.)*"/);
      if (strMatch) {
        tokens.push(<span key={key++} className="text-green-400">{strMatch[0]}</span>);
        remaining = remaining.slice(strMatch[0].length);
        continue;
      }
      // Keywords/types
      const kwMatch = remaining.match(/^(String|StringBuilder|StringBuffer|System|out|println|concat|equals|append|insert|delete|replace|reverse|length|capacity|toString|new|true|false|null)\b/);
      if (kwMatch) {
        const kw = kwMatch[0];
        const isType = ['String', 'StringBuilder', 'StringBuffer', 'System'].includes(kw);
        tokens.push(
          <span key={key++} className={isType ? 'text-cyan-400 font-medium' : 'text-blue-400'}>
            {kw}
          </span>
        );
        remaining = remaining.slice(kw.length);
        continue;
      }
      // Number
      const numMatch = remaining.match(/^\d+/);
      if (numMatch) {
        tokens.push(<span key={key++} className="text-orange-400">{numMatch[0]}</span>);
        remaining = remaining.slice(numMatch[0].length);
        continue;
      }
      // Single char
      tokens.push(<span key={key++} className="text-slate-200">{remaining[0]}</span>);
      remaining = remaining.slice(1);
    }

    return (
      <div key={lineIdx} className="flex">
        <span className="select-none text-slate-600 w-8 shrink-0 text-xs leading-6">
          {String(lineIdx + 1).padStart(2, '0')}
        </span>
        <span className="leading-6 flex-1 flex flex-wrap">{tokens}</span>
      </div>
    );
  });
};

// Output lines renderer
const OutputDisplay: React.FC<{ output: string }> = ({ output }) => {
  const lines = output.split('\n');
  return (
    <div className="font-mono text-sm space-y-0.5">
      {lines.map((line, i) => (
        <div key={i} className="text-green-400">{line}</div>
      ))}
    </div>
  );
};

const CategoryBadge: React.FC<{ category: CodeExample['category'] }> = ({ category }) => {
  const config = {
    string: { label: 'String', color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30' },
    stringbuilder: { label: 'StringBuilder', color: 'text-orange-400 bg-orange-500/10 border-orange-500/30' },
    stringbuffer: { label: 'StringBuffer', color: 'text-green-400 bg-green-500/10 border-green-500/30' },
    comparison: { label: 'Comparison', color: 'text-violet-400 bg-violet-500/10 border-violet-500/30' },
  };
  const { label, color } = config[category];
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-mono border ${color}`}>
      {label}
    </span>
  );
};

const PlaygroundSection: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [hasRun, setHasRun] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const example = codeExamples[selectedIndex];

  const handleRun = () => {
    playSound('run');
    setHasRun(true);
  };

  const handleReset = () => {
    playSound('click');
    setHasRun(false);
    setShowExplanation(false);
  };

  const handlePrev = () => {
    playSound('click');
    setSelectedIndex((prev) => (prev - 1 + codeExamples.length) % codeExamples.length);
    setHasRun(false);
    setShowExplanation(false);
  };

  const handleNext = () => {
    playSound('click');
    setSelectedIndex((prev) => (prev + 1) % codeExamples.length);
    setHasRun(false);
    setShowExplanation(false);
  };

  const handleSelectExample = (i: number) => {
    playSound('click');
    setSelectedIndex(i);
    setHasRun(false);
    setShowExplanation(false);
  };

  return (
    <section
      id="playground"
      className="relative py-20 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #050510 0%, #080820 100%)' }}
      aria-label="Code playground: Java simulation examples"
    >
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 30% 50%, #7c3aed 0%, transparent 50%)`,
        }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-400 text-sm font-mono mb-6">
            <Code2 size={14} />
            Chapter 5
          </div>
          <h2 className="text-4xl sm:text-5xl font-black mb-4 text-gradient-violet-cyan"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Code Playground
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Explore Java execution simulations. These are educational demonstrations with
            predetermined accurate outputs — not a live Java compiler.
          </p>
        </motion.div>

        {/* Disclaimer */}
        <div className="mb-6 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3">
          <Info size={16} className="text-amber-400 shrink-0 mt-0.5" />
          <p className="text-amber-300 text-sm">
            <strong>Visual Java simulation:</strong> These examples show accurate Java behavior with
            predetermined outputs. The execution is simulated in the browser for educational purposes.
          </p>
        </div>

        {/* Example selector */}
        <div className="flex flex-wrap gap-2 mb-6">
          {codeExamples.map((ex, i) => (
            <button
              key={ex.id}
              onClick={() => handleSelectExample(i)}
              className={`px-3 py-1.5 rounded-lg text-sm transition-all cursor-pointer border ${
                i === selectedIndex
                  ? 'bg-violet-500/20 border-violet-500/50 text-violet-300'
                  : 'bg-[#111133] border-[#1e1e4a] text-slate-400 hover:border-slate-600'
              }`}
              aria-pressed={i === selectedIndex}
            >
              {ex.title.split('—')[0].trim()}
            </button>
          ))}
        </div>

        {/* Main playground */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card rounded-2xl border border-[#1e1e4a] overflow-hidden"
        >
          {/* Playground header bar */}
          <div className="flex items-center justify-between p-4 border-b border-[#1e1e4a] bg-[#080820]">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5" aria-hidden="true">
                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <div className="w-3 h-3 rounded-full bg-green-500/70" />
              </div>
              <div className="text-slate-400 text-xs font-mono">Main.java</div>
            </div>

            <div className="flex items-center gap-2">
              <CategoryBadge category={example.category} />
              <button onClick={handlePrev} className="p-1.5 text-slate-500 hover:text-slate-300 transition-colors cursor-pointer" aria-label="Previous example">
                <ChevronLeft size={16} />
              </button>
              <span className="text-slate-500 text-xs font-mono">{selectedIndex + 1}/{codeExamples.length}</span>
              <button onClick={handleNext} className="p-1.5 text-slate-500 hover:text-slate-300 transition-colors cursor-pointer" aria-label="Next example">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Code editor panel */}
            <div className="border-r border-[#1e1e4a]">
              <div className="p-3 border-b border-[#111133] bg-[#060614] flex items-center gap-2">
                <Code2 size={14} className="text-slate-500" />
                <span className="text-slate-500 text-xs uppercase tracking-wider">Code</span>
              </div>

              <div className="p-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="mb-4"
                  >
                    <div className="mb-3">
                      <h3 className="text-white font-semibold text-sm" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                        {example.title}
                      </h3>
                      <p className="text-slate-500 text-xs mt-1">{example.description}</p>
                    </div>

                    {/* Code display */}
                    <div
                      className="bg-[#030308] rounded-xl border border-[#111133] p-4 font-mono text-sm overflow-x-auto"
                      role="region"
                      aria-label="Java code example"
                    >
                      {highlightJava(example.code)}
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Controls */}
                <div className="flex gap-2">
                  <button
                    onClick={handleRun}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm text-white transition-all cursor-pointer"
                    style={{
                      background: 'linear-gradient(135deg, #5b21b6, #7c3aed)',
                      boxShadow: hasRun ? 'none' : '0 0 15px rgba(124,58,237,0.4)',
                    }}
                    aria-label="Run simulation"
                  >
                    <Play size={14} />
                    RUN
                  </button>
                  <button
                    onClick={handleReset}
                    className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm text-slate-400 hover:text-slate-200 border border-[#1e1e4a] hover:border-slate-600 transition-all cursor-pointer"
                    aria-label="Reset playground"
                  >
                    <RotateCcw size={14} />
                    Reset
                  </button>
                </div>
              </div>
            </div>

            {/* Output + Explanation panel */}
            <div>
              <div className="p-3 border-b border-[#111133] bg-[#060614] flex items-center gap-2">
                <Terminal size={14} className="text-slate-500" />
                <span className="text-slate-500 text-xs uppercase tracking-wider">Output</span>
              </div>

              <div className="p-4 space-y-4">
                {/* Output */}
                <div className="bg-[#030308] rounded-xl border border-[#111133] p-4 min-h-24">
                  <AnimatePresence mode="wait">
                    {hasRun ? (
                      <motion.div
                        key="output"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        <div className="text-xs text-slate-500 uppercase tracking-wider mb-2 font-mono">
                          stdout
                        </div>
                        <OutputDisplay output={example.output} />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="waiting"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-slate-600 text-sm font-mono"
                      >
                        Press RUN to execute...
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Explanation toggle */}
                <AnimatePresence>
                  {hasRun && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <button
                        onClick={() => { setShowExplanation(!showExplanation); playSound('click'); }}
                        className="flex items-center gap-2 text-sm text-violet-400 hover:text-violet-300 transition-colors cursor-pointer"
                        aria-expanded={showExplanation}
                        aria-controls="explanation-panel"
                      >
                        <Info size={14} />
                        {showExplanation ? 'Hide' : 'Show'} explanation
                      </button>

                      <AnimatePresence>
                        {showExplanation && (
                          <motion.div
                            id="explanation-panel"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-3 p-4 rounded-xl bg-violet-500/10 border border-violet-500/30 text-slate-300 text-sm leading-relaxed overflow-hidden"
                          >
                            {example.explanation}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PlaygroundSection;
