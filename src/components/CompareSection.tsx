import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { StringCharacter, StringBuilderCharacter, StringBufferCharacter } from './Characters';
import { playSound } from '../utils/sound';

type ClassId = 'string' | 'stringbuilder' | 'stringbuffer';

interface Feature {
  name: string;
  string: string;
  stringbuilder: string;
  stringbuffer: string;
  string_good: boolean;
  stringbuilder_good: boolean;
  stringbuffer_good: boolean;
}

const features: Feature[] = [
  {
    name: 'Mutability',
    string: 'Immutable',
    stringbuilder: 'Mutable',
    stringbuffer: 'Mutable',
    string_good: false,
    stringbuilder_good: true,
    stringbuffer_good: true,
  },
  {
    name: 'Synchronized Methods',
    string: 'N/A (immutable)',
    stringbuilder: 'No',
    stringbuffer: 'Yes',
    string_good: false,
    stringbuilder_good: false,
    stringbuffer_good: true,
  },
  {
    name: 'Creates New Objects',
    string: 'Yes, on each operation',
    stringbuilder: 'No, modifies in place',
    stringbuffer: 'No, modifies in place',
    string_good: false,
    stringbuilder_good: true,
    stringbuffer_good: true,
  },
  {
    name: 'Multi-threaded Safety',
    string: 'Safe (by nature)',
    stringbuilder: 'Not safe alone',
    stringbuffer: 'Individual methods safe',
    string_good: true,
    stringbuilder_good: false,
    stringbuffer_good: true,
  },
  {
    name: 'Typical Performance',
    string: 'Fast for fixed text',
    stringbuilder: 'Fast for modifications',
    stringbuffer: 'Moderate (sync overhead)',
    string_good: true,
    stringbuilder_good: true,
    stringbuffer_good: false,
  },
  {
    name: 'Typical Use Case',
    string: 'Fixed or rarely changing text',
    stringbuilder: 'Frequent mods, single thread',
    stringbuffer: 'Shared mutable buffer, multi-thread',
    string_good: true,
    stringbuilder_good: true,
    stringbuffer_good: true,
  },
];

const useCases: Record<ClassId, { title: string; cases: string[]; avoid: string[] }> = {
  string: {
    title: 'When to use String',
    cases: [
      'Storing constant or configuration values',
      'Keys in Maps and Sets',
      'String literals and compile-time constants',
      'Values that must not be accidentally modified',
      'Sharing across threads without synchronization',
    ],
    avoid: [
      'Concatenating inside a large loop (creates many objects)',
      'Building a large string from many parts',
    ],
  },
  stringbuilder: {
    title: 'When to use StringBuilder',
    cases: [
      'Building strings from many pieces in a loop',
      'Reversing or transforming a string in place',
      'Parsing and constructing text in single-threaded code',
      'When you need mutable text without synchronization overhead',
    ],
    avoid: [
      'Sharing between multiple threads without additional synchronization',
    ],
  },
  stringbuffer: {
    title: 'When to use StringBuffer',
    cases: [
      'A mutable character buffer shared between multiple threads',
      'When individual method calls on the buffer need to be synchronized',
      'Legacy code that already relies on StringBuffer',
    ],
    avoid: [
      'Single-threaded code (use StringBuilder instead, without sync overhead)',
      'Compound multi-step operations that require external synchronization anyway',
    ],
  },
};

const CompareSection: React.FC = () => {
  const [selected, setSelected] = useState<ClassId | null>(null);

  const handleSelect = (id: ClassId) => {
    playSound('click');
    setSelected(selected === id ? null : id);
  };

  const characterConfig = [
    {
      id: 'string' as ClassId,
      label: 'String',
      activeClass: 'border-cyan-500 bg-cyan-500/10 shadow-lg shadow-cyan-500/20',
      textClass: 'text-cyan-400',
      Component: StringCharacter,
    },
    {
      id: 'stringbuilder' as ClassId,
      label: 'StringBuilder',
      activeClass: 'border-orange-500 bg-orange-500/10 shadow-lg shadow-orange-500/20',
      textClass: 'text-orange-400',
      Component: StringBuilderCharacter,
    },
    {
      id: 'stringbuffer' as ClassId,
      label: 'StringBuffer',
      activeClass: 'border-green-500 bg-green-500/10 shadow-lg shadow-green-500/20',
      textClass: 'text-green-400',
      Component: StringBufferCharacter,
    },
  ];

  return (
    <section
      id="compare"
      className="relative py-20 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #080820 0%, #050510 100%)' }}
      aria-label="Comparison chamber: String vs StringBuilder vs StringBuffer"
    >
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, #7c3aed 0%, transparent 60%)`,
        }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-400 text-sm font-mono mb-6">
            <span className="w-2 h-2 rounded-full bg-violet-400" />
            Chapter 4
          </div>
          <h2 className="text-4xl sm:text-5xl font-black mb-4 text-gradient-full"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            The Comparison Chamber
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Select a class to see its strengths, weaknesses, and ideal use cases.
          </p>
        </motion.div>

        {/* Character selector */}
        <div className="flex flex-col sm:flex-row justify-center gap-6 mb-12">
          {characterConfig.map(({ id, label, activeClass, textClass, Component }) => (
            <motion.button
              key={id}
              onClick={() => handleSelect(id)}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
              className={`flex flex-col items-center gap-4 p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer min-w-48 ${
                selected === id
                  ? activeClass
                  : 'border-[#1e1e4a] bg-[#111133] hover:border-[#2d2d7a]'
              }`}
              aria-pressed={selected === id}
              aria-label={`Select ${label} to see details`}
            >
              <Component size={100} animate={selected === id} />
              <div className="text-center">
                <div className={`font-bold text-lg ${textClass}`} style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  {label}
                </div>
                <div className="text-slate-500 text-xs mt-1">
                  {id === 'string' ? 'Immutable' : id === 'stringbuilder' ? 'Mutable · Fast' : 'Mutable · Synchronized'}
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Use case detail */}
        <AnimatePresence mode="wait">
          {selected && (
            <motion.div
              key={selected}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="glass-card rounded-2xl p-6 sm:p-8 border border-[#1e1e4a] mb-12"
            >
              <h3 className="text-xl font-bold text-white mb-6" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                {useCases[selected].title}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <div className="flex items-center gap-2 text-green-400 font-semibold mb-3">
                    <Check size={16} />
                    Good for:
                  </div>
                  <ul className="space-y-2">
                    {useCases[selected].cases.map((c, i) => (
                      <li key={i} className="flex items-start gap-2 text-slate-300 text-sm">
                        <Check size={14} className="text-green-500 mt-0.5 shrink-0" />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-red-400 font-semibold mb-3">
                    <X size={16} />
                    Consider alternatives when:
                  </div>
                  <ul className="space-y-2">
                    {useCases[selected].avoid.map((a, i) => (
                      <li key={i} className="flex items-start gap-2 text-slate-400 text-sm">
                        <X size={14} className="text-red-500 mt-0.5 shrink-0" />
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Comparison table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card rounded-2xl border border-[#1e1e4a] overflow-hidden"
        >
          <div className="p-6 border-b border-[#1e1e4a]">
            <h3 className="text-xl font-bold text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              Feature Comparison
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm" aria-label="Feature comparison table for String, StringBuilder, and StringBuffer">
              <thead>
                <tr className="border-b border-[#1e1e4a]">
                  <th className="text-left p-4 text-slate-500 font-medium w-1/4">Feature</th>
                  <th className="p-4 text-cyan-400 font-bold text-center">String</th>
                  <th className="p-4 text-orange-400 font-bold text-center">StringBuilder</th>
                  <th className="p-4 text-green-400 font-bold text-center">StringBuffer</th>
                </tr>
              </thead>
              <tbody>
                {features.map((feature, i) => (
                  <motion.tr
                    key={feature.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="border-b border-[#111133] hover:bg-white/2 transition-colors"
                  >
                    <td className="p-4 font-semibold text-slate-300">{feature.name}</td>
                    <td className="p-4 text-center">
                      <span className={feature.string_good ? 'text-cyan-400 font-semibold' : 'text-slate-400'}>
                        {feature.string}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <span className={feature.stringbuilder_good ? 'text-orange-400 font-semibold' : 'text-slate-400'}>
                        {feature.stringbuilder}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <span className={feature.stringbuffer_good ? 'text-green-400 font-semibold' : 'text-slate-400'}>
                        {feature.stringbuffer}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Final takeaway */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 p-6 rounded-2xl border border-violet-500/30 bg-violet-500/5 text-center"
        >
          <div className="text-violet-400 text-sm font-mono uppercase tracking-widest mb-3">
            The Verdict
          </div>
          <p className="text-slate-200 text-lg leading-relaxed max-w-3xl mx-auto">
            Choose <strong className="text-cyan-400">String</strong> when your text should remain unchanged.
            Choose <strong className="text-orange-400">StringBuilder</strong> when you need efficient mutable
            text in ordinary single-threaded code.
            Choose <strong className="text-green-400">StringBuffer</strong> when synchronized method access
            to shared mutable text is needed.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CompareSection;
