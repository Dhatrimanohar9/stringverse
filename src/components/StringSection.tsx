import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, ArrowRight } from 'lucide-react';
import { StringCharacter } from './Characters';
import { playSound } from '../utils/sound';

// Syntax highlighted code block component
const CodeBlock: React.FC<{ code: string; highlight?: number[] }> = ({ code, highlight = [] }) => {
  const lines = code.split('\n');
  return (
    <pre className="code-block text-sm overflow-x-auto" role="region" aria-label="Java code example">
      {lines.map((line, i) => (
        <div
          key={i}
          className={`${highlight.includes(i) ? 'bg-violet-500/15 -mx-4 px-4 rounded' : ''}`}
        >
          <span className="text-slate-600 select-none mr-4 text-xs">{String(i + 1).padStart(2, '0')}</span>
          <JavaHighlight code={line} />
        </div>
      ))}
    </pre>
  );
};

// Simple Java syntax highlighter
const JavaHighlight: React.FC<{ code: string }> = ({ code }) => {
  const keywords = ['String', 'System', 'out', 'println', 'concat', 'equals', 'new', 'null', 'true', 'false'];
  const parts = code.split(/(".*?"|\/\/.*$|\b\w+\b)/g);

  return (
    <>
      {parts.map((part, i) => {
        if (!part) return null;
        if (part.startsWith('"') && part.endsWith('"')) {
          return <span key={i} className="text-green-400">{part}</span>;
        }
        if (part.startsWith('//')) {
          return <span key={i} className="text-slate-500 italic">{part}</span>;
        }
        if (keywords.includes(part)) {
          return <span key={i} className="text-cyan-400 font-medium">{part}</span>;
        }
        if (/^\d+$/.test(part)) {
          return <span key={i} className="text-orange-400">{part}</span>;
        }
        return <span key={i} className="text-slate-200">{part}</span>;
      })}
    </>
  );
};

// Visual animation of String object in memory
const StringMemoryViz: React.FC<{ experiment: 1 | 2; ran: boolean }> = ({ experiment, ran }) => {
  if (!ran) {
    return (
      <div className="flex items-center justify-center h-32 text-slate-500 text-sm">
        Click RUN to see the memory visualization
      </div>
    );
  }

  if (experiment === 1) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-4"
        role="img"
        aria-label="Memory diagram showing name variable pointing to Java string, with discarded Java Programming string"
      >
        <div className="flex items-start gap-6 justify-center flex-wrap">
          {/* Variable */}
          <div className="flex flex-col items-center gap-2">
            <div className="text-xs text-slate-400 uppercase tracking-wider">Variable</div>
            <div className="px-4 py-2 rounded-lg border border-cyan-500/40 bg-cyan-500/10 text-cyan-400 font-mono text-sm">
              name
            </div>
          </div>

          {/* Arrow pointing to original */}
          <div className="flex items-center mt-7">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 60 }}
              className="h-0.5 bg-cyan-500"
            />
            <ArrowRight size={16} className="text-cyan-500 -ml-1" />
          </div>

          {/* Original String */}
          <div className="flex flex-col items-center gap-2">
            <div className="text-xs text-slate-400 uppercase tracking-wider">String Object</div>
            <div className="px-4 py-2 rounded-lg border border-cyan-400 bg-[#0d1f3c] text-cyan-300 font-mono text-sm shadow-lg shadow-cyan-500/20">
              "Java"
            </div>
            <div className="text-xs text-green-400">← still referenced</div>
          </div>

          {/* Discarded object */}
          <div className="flex flex-col items-center gap-2 opacity-40">
            <div className="text-xs text-slate-400 uppercase tracking-wider">Discarded</div>
            <div className="px-4 py-2 rounded-lg border border-dashed border-red-500/50 bg-red-500/5 text-red-400 font-mono text-sm line-through">
              "Java Programming"
            </div>
            <div className="text-xs text-red-400">not assigned → lost</div>
          </div>
        </div>

        <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 text-sm">
          <strong>Output:</strong> <span className="font-mono">Java</span>
          <span className="text-slate-400 ml-2">— the original is unchanged</span>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4"
      role="img"
      aria-label="Memory diagram showing name variable reassigned to new Java Programming string"
    >
      <div className="flex items-start gap-6 justify-center flex-wrap">
        {/* Variable */}
        <div className="flex flex-col items-center gap-2">
          <div className="text-xs text-slate-400 uppercase tracking-wider">Variable</div>
          <div className="px-4 py-2 rounded-lg border border-cyan-500/40 bg-cyan-500/10 text-cyan-400 font-mono text-sm">
            name
          </div>
        </div>

        {/* Arrow — now pointing to new string */}
        <div className="flex items-center mt-7">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 60 }}
            className="h-0.5 bg-violet-500"
          />
          <ArrowRight size={16} className="text-violet-500 -ml-1" />
        </div>

        {/* New String */}
        <div className="flex flex-col items-center gap-2">
          <div className="text-xs text-slate-400 uppercase tracking-wider">New String Object</div>
          <div className="px-4 py-2 rounded-lg border border-violet-400 bg-[#1a0a3c] text-violet-300 font-mono text-sm shadow-lg shadow-violet-500/20">
            "Java Programming"
          </div>
          <div className="text-xs text-violet-400">← now referenced</div>
        </div>

        {/* Old object */}
        <div className="flex flex-col items-center gap-2 opacity-40">
          <div className="text-xs text-slate-400 uppercase tracking-wider">Original</div>
          <div className="px-4 py-2 rounded-lg border border-dashed border-slate-600 bg-slate-900 text-slate-500 font-mono text-sm">
            "Java"
          </div>
          <div className="text-xs text-slate-500">unreferenced → GC</div>
        </div>
      </div>

      <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/30 text-green-300 text-sm">
        <strong>Output:</strong> <span className="font-mono">Java Programming</span>
        <span className="text-slate-400 ml-2">— variable now refers to new object</span>
      </div>
    </motion.div>
  );
};

// == vs equals() demo
const EqualsDemoSection: React.FC = () => {
  const [demo, setDemo] = useState<'none' | 'equal' | 'reference'>('none');

  const handleDemo = (type: 'equal' | 'reference') => {
    playSound('click');
    setDemo(type);
  };

  return (
    <div className="mt-10 space-y-4">
      <h3 className="text-xl font-bold text-slate-200" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
        == vs equals() — What's the Difference?
      </h3>
      <p className="text-slate-400">
        These two operators ask very different questions about String objects.
      </p>

      <div className="flex gap-3 flex-wrap">
        <button
          onClick={() => handleDemo('equal')}
          className={`px-4 py-2 rounded-lg text-sm font-mono transition-all cursor-pointer ${
            demo === 'equal'
              ? 'bg-cyan-500/20 border border-cyan-500/50 text-cyan-300'
              : 'bg-[#111133] border border-[#1e1e4a] text-slate-400 hover:border-cyan-500/40'
          }`}
        >
          Test equals()
        </button>
        <button
          onClick={() => handleDemo('reference')}
          className={`px-4 py-2 rounded-lg text-sm font-mono transition-all cursor-pointer ${
            demo === 'reference'
              ? 'bg-violet-500/20 border border-violet-500/50 text-violet-300'
              : 'bg-[#111133] border border-[#1e1e4a] text-slate-400 hover:border-violet-500/40'
          }`}
        >
          Test ==
        </button>
      </div>

      <AnimatePresence mode="wait">
        {demo === 'equal' && (
          <motion.div
            key="equals"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-3"
          >
            <CodeBlock code={`String a = new String("hello");\nString b = new String("hello");\nSystem.out.println(a.equals(b)); // true`} />
            <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/30">
              <div className="text-green-400 font-bold mb-1">Output: true</div>
              <div className="text-slate-400 text-sm">
                equals() compares the <strong className="text-white">content</strong> of both String objects.
                Both contain the same characters "hello", so equals() returns true regardless of whether
                they are the same object in memory.
              </div>
            </div>
          </motion.div>
        )}

        {demo === 'reference' && (
          <motion.div
            key="reference"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-3"
          >
            <CodeBlock code={`String a = new String("hello");\nString b = new String("hello");\nSystem.out.println(a == b); // false`} />
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30">
              <div className="text-red-400 font-bold mb-1">Output: false</div>
              <div className="text-slate-400 text-sm">
                == compares <strong className="text-white">object references</strong> (memory addresses).
                Since a and b were created with new String(), they are two separate objects in memory,
                even though they contain the same content. == returns false. Always use equals() to
                compare String values.
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const StringSection: React.FC = () => {
  const [exp1Ran, setExp1Ran] = useState(false);
  const [exp2Ran, setExp2Ran] = useState(false);
  const [activeExp, setActiveExp] = useState<1 | 2>(1);

  const runExperiment = (n: 1 | 2) => {
    playSound('run');
    if (n === 1) setExp1Ran(true);
    else setExp2Ran(true);
  };

  const reset = () => {
    playSound('click');
    setExp1Ran(false);
    setExp2Ran(false);
    setActiveExp(1);
  };

  return (
    <section
      id="string"
      className="relative py-20 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #050510 0%, #080820 100%)' }}
      aria-label="String section: immutability exploration"
    >
      {/* Background accent */}
      <div
        className="absolute top-20 right-0 w-96 h-96 rounded-full opacity-5"
        style={{ background: 'radial-gradient(circle, #60a5fa, transparent)' }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row items-center gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex-1"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-3 h-3 rounded-full bg-cyan-400" />
              <span className="text-cyan-400 text-sm font-mono uppercase tracking-widest">Chapter 1</span>
            </div>

            <h2 className="text-4xl sm:text-5xl font-black mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              Meet <span className="text-gradient-violet-cyan">STRING</span>
              <br />
              <span className="text-2xl sm:text-3xl text-slate-300 font-semibold">The Immutable One</span>
            </h2>

            <div className="section-divider mb-6" />

            <div className="space-y-4 text-slate-400 text-base leading-relaxed">
              <p>
                In Java, a <code className="text-cyan-400 font-mono bg-[#0d1f3c] px-1 rounded">String</code> object is{' '}
                <strong className="text-white">immutable</strong>. Once created, the sequence of characters it
                contains cannot be altered.
              </p>
              <p>
                Methods like <code className="text-cyan-400 font-mono bg-[#0d1f3c] px-1 rounded">concat()</code>,{' '}
                <code className="text-cyan-400 font-mono bg-[#0d1f3c] px-1 rounded">toUpperCase()</code>, and{' '}
                <code className="text-cyan-400 font-mono bg-[#0d1f3c] px-1 rounded">replace()</code> all return
                a <em>new</em> String object containing the result. They never change the original object.
              </p>
              <p>
                A String <em>variable</em> can be reassigned to point to a different String object — but the
                original String object itself is never modified.
              </p>
            </div>

            {/* Key facts */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { label: 'Mutability', value: 'Immutable', colorClass: 'text-cyan-400' },
                { label: 'Thread Safe?', value: 'By nature (immutable)', colorClass: 'text-green-400' },
                { label: 'Pool', value: 'String Pool (interning)', colorClass: 'text-violet-400' },
                { label: 'Package', value: 'java.lang', colorClass: 'text-orange-400' },
              ].map(({ label, value, colorClass }) => (
                <div
                  key={label}
                  className="p-3 rounded-xl glass-card border border-[#1e1e4a]"
                >
                  <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">{label}</div>
                  <div className={`text-sm font-semibold ${colorClass}`}>{value}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col items-center gap-6"
          >
            <StringCharacter size={180} />
            <div className="text-center">
              <div className="text-cyan-400 font-bold text-xl" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                STRING
              </div>
              <div className="text-slate-500 text-sm mt-1">Crystal · Immutable · Eternal</div>
            </div>
          </motion.div>
        </div>

        {/* Experiments */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card rounded-2xl p-6 sm:p-8 border border-[#1e1e4a]"
        >
          <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
            <h3 className="text-2xl font-bold text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              Interactive Experiment
            </h3>
            <div className="flex gap-2">
              {([1, 2] as const).map((n) => (
                <button
                  key={n}
                  onClick={() => { setActiveExp(n); playSound('click'); }}
                  className={`px-4 py-1.5 rounded-lg text-sm font-mono transition-all cursor-pointer ${
                    activeExp === n
                      ? 'bg-cyan-500/20 border border-cyan-500/50 text-cyan-300'
                      : 'bg-[#111133] border border-[#1e1e4a] text-slate-400 hover:border-cyan-500/30'
                  }`}
                  aria-pressed={activeExp === n}
                >
                  Experiment {n}
                </button>
              ))}
              <button
                onClick={reset}
                className="p-1.5 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-white/5 transition-all cursor-pointer"
                aria-label="Reset experiments"
                title="Reset"
              >
                <RotateCcw size={16} />
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {activeExp === 1 ? (
              <motion.div
                key="exp1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-4"
              >
                <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 text-sm">
                  <strong>Experiment 1:</strong> What happens when you call concat() without assigning the result?
                </div>

                <CodeBlock
                  code={`String name = "Java";\nname.concat(" Programming"); // result NOT assigned\nSystem.out.println(name);`}
                  highlight={exp1Ran ? [1] : []}
                />

                <div className="flex items-center gap-4">
                  <button
                    onClick={() => runExperiment(1)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-white transition-all cursor-pointer"
                    style={{ background: 'linear-gradient(135deg, #0e7490, #0891b2)' }}
                    aria-label="Run experiment 1"
                  >
                    <Play size={16} />
                    RUN
                  </button>
                  {exp1Ran && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="font-mono text-sm text-slate-300 bg-[#050510] border border-[#1e1e4a] px-4 py-2 rounded-lg"
                    >
                      Output: <span className="text-green-400">Java</span>
                    </motion.div>
                  )}
                </div>

                <StringMemoryViz experiment={1} ran={exp1Ran} />
              </motion.div>
            ) : (
              <motion.div
                key="exp2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/30 text-green-300 text-sm">
                  <strong>Experiment 2:</strong> What happens when you assign the result back to the variable?
                </div>

                <CodeBlock
                  code={`String name = "Java";\nname = name.concat(" Programming"); // result IS assigned\nSystem.out.println(name);`}
                  highlight={exp2Ran ? [1] : []}
                />

                <div className="flex items-center gap-4">
                  <button
                    onClick={() => runExperiment(2)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-white transition-all cursor-pointer"
                    style={{ background: 'linear-gradient(135deg, #0e7490, #0891b2)' }}
                    aria-label="Run experiment 2"
                  >
                    <Play size={16} />
                    RUN
                  </button>
                  {exp2Ran && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="font-mono text-sm text-slate-300 bg-[#050510] border border-[#1e1e4a] px-4 py-2 rounded-lg"
                    >
                      Output: <span className="text-green-400">Java Programming</span>
                    </motion.div>
                  )}
                </div>

                <StringMemoryViz experiment={2} ran={exp2Ran} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* equals() vs == */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card rounded-2xl p-6 sm:p-8 border border-[#1e1e4a] mt-8"
        >
          <EqualsDemoSection />
        </motion.div>
      </div>
    </section>
  );
};

export default StringSection;
