import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, Zap } from 'lucide-react';
import { StringBuilderCharacter } from './Characters';
import { playSound } from '../utils/sound';

type Operation = 'append' | 'insert' | 'delete' | 'replace' | 'reverse' | 'length' | 'capacity';

interface OpResult {
  before: string;
  after: string;
  code: string;
  output: string;
}

// Apply a StringBuilder operation (simulation)
function applyOperation(
  text: string,
  op: Operation,
  arg1: string,
  arg2: string
): OpResult {
  const before = text;
  let after = text;
  let code = '';
  let output = '';

  switch (op) {
    case 'append': {
      after = text + arg1;
      code = `StringBuilder sb = new StringBuilder("${text}");\nsb.append("${arg1}");\nSystem.out.println(sb);`;
      output = after;
      break;
    }
    case 'insert': {
      const idx = Math.min(parseInt(arg2 || '0', 10), text.length);
      after = text.slice(0, idx) + arg1 + text.slice(idx);
      code = `StringBuilder sb = new StringBuilder("${text}");\nsb.insert(${idx}, "${arg1}");\nSystem.out.println(sb);`;
      output = after;
      break;
    }
    case 'delete': {
      const start = Math.min(parseInt(arg1 || '0', 10), text.length);
      const end = Math.min(parseInt(arg2 || '0', 10), text.length);
      after = text.slice(0, start) + text.slice(end);
      code = `StringBuilder sb = new StringBuilder("${text}");\nsb.delete(${start}, ${end});\nSystem.out.println(sb);`;
      output = after;
      break;
    }
    case 'replace': {
      const start = Math.min(parseInt(arg2 || '0', 10), text.length);
      const end = Math.min(start + arg1.length, text.length);
      after = text.slice(0, start) + arg1 + text.slice(end);
      code = `StringBuilder sb = new StringBuilder("${text}");\nsb.replace(${start}, ${start + arg1.length}, "${arg1}");\nSystem.out.println(sb);`;
      output = after;
      break;
    }
    case 'reverse': {
      after = text.split('').reverse().join('');
      code = `StringBuilder sb = new StringBuilder("${text}");\nsb.reverse();\nSystem.out.println(sb);`;
      output = after;
      break;
    }
    case 'length': {
      after = text; // length() doesn't modify
      code = `StringBuilder sb = new StringBuilder("${text}");\nSystem.out.println(sb.length());`;
      output = String(text.length);
      break;
    }
    case 'capacity': {
      after = text; // capacity() doesn't modify
      const cap = 16 + text.length; // approximation of default capacity behavior
      code = `StringBuilder sb = new StringBuilder();\nsb.append("${text}");\nSystem.out.println(sb.capacity());`;
      output = String(cap);
      break;
    }
  }

  return { before, after, code, output };
}

const OperationButton: React.FC<{
  op: Operation;
  active: boolean;
  onClick: () => void;
}> = ({ op, active, onClick }) => (
  <button
    onClick={onClick}
    className={`px-3 py-2 rounded-lg text-sm font-mono transition-all duration-200 cursor-pointer border ${
      active
        ? 'bg-orange-500/20 border-orange-500/60 text-orange-300 shadow-md shadow-orange-500/10'
        : 'bg-[#111133] border-[#1e1e4a] text-slate-400 hover:border-slate-500 hover:text-slate-200'
    }`}
    aria-pressed={active}
  >
    {op}()
  </button>
);

// Visual animation of mutable StringBuilder buffer
const MutableBufferViz: React.FC<{ before: string; after: string; show: boolean; op: Operation }> = ({
  before, after, show, op,
}) => {
  if (!show) return null;

  const isNonModifying = op === 'length' || op === 'capacity';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-3 mt-4"
      role="img"
      aria-label={`Visualization of StringBuilder modification: ${before} becomes ${after}`}
    >
      <div className="text-xs text-slate-500 uppercase tracking-wider">Same object — mutated in place</div>
      <div className="flex items-center gap-4 flex-wrap">
        {/* Before */}
        <div className="flex flex-col gap-1">
          <div className="text-xs text-slate-500">Before</div>
          <div className="flex">
            {before.split('').map((char, i) => (
              <motion.div
                key={`before-${i}`}
                initial={{ scale: 1 }}
                className="w-8 h-8 border border-orange-500/40 bg-orange-500/10 flex items-center justify-center font-mono text-orange-300 text-sm"
              >
                {char === ' ' ? '·' : char}
              </motion.div>
            ))}
          </div>
        </div>

        {!isNonModifying && (
          <>
            {/* Arrow */}
            <div className="text-orange-400 font-bold flex items-center gap-1">
              <Zap size={16} />
              <span className="text-xs">{op}()</span>
            </div>

            {/* After */}
            <div className="flex flex-col gap-1">
              <div className="text-xs text-slate-500">After (same object)</div>
              <div className="flex">
                {after.split('').map((char, i) => (
                  <motion.div
                    key={`after-${i}`}
                    initial={{ scale: 0.8, backgroundColor: 'rgba(249,115,22,0.3)' }}
                    animate={{ scale: 1, backgroundColor: 'rgba(249,115,22,0.1)' }}
                    transition={{ delay: i * 0.03 }}
                    className="w-8 h-8 border border-orange-500/60 flex items-center justify-center font-mono text-orange-200 text-sm"
                  >
                    {char === ' ' ? '·' : char}
                  </motion.div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      <div className="p-3 rounded-lg bg-orange-500/10 border border-orange-500/30 text-orange-300 text-sm flex items-start gap-2">
        <Zap size={14} className="mt-0.5 shrink-0" />
        <span>
          {isNonModifying
            ? `${op}() reads from the same object without modifying it.`
            : 'The same StringBuilder object was modified in place. No new object was created.'}
        </span>
      </div>
    </motion.div>
  );
};

const StringBuilderSection: React.FC = () => {
  const [inputText, setInputText] = useState('Java');
  const [currentText, setCurrentText] = useState('Java');
  const [op, setOp] = useState<Operation>('append');
  const [arg1, setArg1] = useState(' Programming');
  const [arg2, setArg2] = useState('0');
  const [result, setResult] = useState<OpResult | null>(null);
  const [hasRun, setHasRun] = useState(false);

  const operations: { op: Operation; color: string; argLabel?: string; arg2Label?: string }[] = [
    { op: 'append', color: 'orange', argLabel: 'Text to append' },
    { op: 'insert', color: 'amber', argLabel: 'Text to insert', arg2Label: 'At index' },
    { op: 'delete', color: 'red', argLabel: 'Start index', arg2Label: 'End index' },
    { op: 'replace', color: 'orange', argLabel: 'Replacement text', arg2Label: 'Start index' },
    { op: 'reverse', color: 'yellow', argLabel: undefined },
    { op: 'length', color: 'green', argLabel: undefined },
    { op: 'capacity', color: 'cyan', argLabel: undefined },
  ];

  const currentOpConfig = operations.find((o) => o.op === op)!;

  const handleRun = () => {
    playSound('run');
    const r = applyOperation(currentText, op, arg1, arg2);
    setResult(r);
    setHasRun(true);
    if (op !== 'length' && op !== 'capacity') {
      setCurrentText(r.after);
    }
  };

  const handleReset = () => {
    playSound('click');
    setCurrentText(inputText);
    setResult(null);
    setHasRun(false);
  };

  const handleInputChange = (val: string) => {
    setInputText(val);
    setCurrentText(val);
    setResult(null);
    setHasRun(false);
  };

  return (
    <section
      id="stringbuilder"
      className="relative py-20 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #080820 0%, #0d0d1a 100%)' }}
      aria-label="StringBuilder section: interactive mutable text workshop"
    >
      {/* Background accent */}
      <div
        className="absolute top-20 left-0 w-96 h-96 rounded-full opacity-5"
        style={{ background: 'radial-gradient(circle, #f97316, transparent)' }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row-reverse items-center gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex-1"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-3 h-3 rounded-full bg-orange-400" />
              <span className="text-orange-400 text-sm font-mono uppercase tracking-widest">Chapter 2</span>
            </div>

            <h2 className="text-4xl sm:text-5xl font-black mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              Meet <span className="text-gradient-orange">STRINGBUILDER</span>
              <br />
              <span className="text-2xl sm:text-3xl text-slate-300 font-semibold">The Fast Builder</span>
            </h2>

            <div className="section-divider mb-6" style={{ background: 'linear-gradient(90deg, #f97316, #fb923c)' }} />

            <div className="space-y-4 text-slate-400 text-base leading-relaxed">
              <p>
                <code className="text-orange-400 font-mono bg-[#1a0a00] px-1 rounded">StringBuilder</code> is{' '}
                <strong className="text-white">mutable</strong>. Its methods modify the internal character
                sequence of the same object, without creating new objects for each change.
              </p>
              <p>
                It is <strong className="text-white">not synchronized</strong>, which makes it faster than
                StringBuffer in single-threaded scenarios where concurrent access is not a concern.
              </p>
              <p>
                Use StringBuilder when you need to build or transform strings through many sequential
                operations within a single thread.
              </p>
            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { label: 'Mutability', value: 'Mutable', colorClass: 'text-orange-400' },
                { label: 'Synchronization', value: 'Not synchronized', colorClass: 'text-amber-400' },
                { label: 'Modification', value: 'Modifies same object', colorClass: 'text-orange-400' },
                { label: 'Typical Use', value: 'Single-threaded code', colorClass: 'text-yellow-400' },
              ].map(({ label, value, colorClass }) => (
                <div key={label} className="p-3 rounded-xl glass-card border border-[#1e1e4a]">
                  <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">{label}</div>
                  <div className={`text-sm font-semibold ${colorClass}`}>{value}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center gap-6"
          >
            <StringBuilderCharacter size={180} />
            <div className="text-center">
              <div className="text-orange-400 font-bold text-xl" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                STRINGBUILDER
              </div>
              <div className="text-slate-500 text-sm mt-1">Flexible · Fast · Mutable</div>
            </div>
          </motion.div>
        </div>

        {/* Interactive Workshop */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card rounded-2xl p-6 sm:p-8 border border-[#1e1e4a]"
        >
          <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
            <div>
              <h3 className="text-2xl font-bold text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                StringBuilder Workshop
              </h3>
              <p className="text-slate-500 text-sm mt-1">Build, modify, and transform strings interactively</p>
            </div>
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm text-slate-400 hover:text-slate-200 border border-[#1e1e4a] hover:border-slate-600 transition-all cursor-pointer"
              aria-label="Reset workshop"
            >
              <RotateCcw size={14} />
              Reset
            </button>
          </div>

          {/* Input text */}
          <div className="mb-6">
            <label className="text-sm text-slate-400 uppercase tracking-wider mb-2 block">
              Initial StringBuilder content
            </label>
            <input
              type="text"
              value={inputText}
              onChange={(e) => handleInputChange(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-[#050510] border border-[#1e1e4a] text-white font-mono text-sm focus:outline-none focus:border-orange-500/50 transition-colors"
              placeholder="Enter initial text..."
              aria-label="Initial StringBuilder text content"
              maxLength={80}
            />
          </div>

          {/* Current state */}
          <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/30 mb-6">
            <div className="text-xs text-orange-400 uppercase tracking-wider mb-2">Current StringBuilder content</div>
            <div className="font-mono text-orange-200 text-lg break-all">"{currentText}"</div>
            <div className="flex gap-4 mt-2 text-xs text-slate-500">
              <span>length: {currentText.length}</span>
              <span>capacity: ~{16 + currentText.length}</span>
            </div>
          </div>

          {/* Operation selector */}
          <div className="mb-6">
            <div className="text-sm text-slate-400 uppercase tracking-wider mb-3">Select operation</div>
            <div className="flex flex-wrap gap-2">
              {operations.map(({ op: o }) => (
                <OperationButton
                  key={o}
                  op={o}
                  active={op === o}
                  onClick={() => { setOp(o); setResult(null); setHasRun(false); playSound('click'); }}
                />
              ))}
            </div>
          </div>

          {/* Arguments */}
          {(currentOpConfig.argLabel || currentOpConfig.arg2Label) && (
            <div className="flex flex-wrap gap-4 mb-6">
              {currentOpConfig.argLabel && (
                <div className="flex-1 min-w-48">
                  <label className="text-sm text-slate-400 mb-2 block">{currentOpConfig.argLabel}</label>
                  <input
                    type="text"
                    value={arg1}
                    onChange={(e) => setArg1(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#050510] border border-[#1e1e4a] text-white font-mono text-sm focus:outline-none focus:border-orange-500/50 transition-colors"
                    maxLength={50}
                  />
                </div>
              )}
              {currentOpConfig.arg2Label && (
                <div className="flex-1 min-w-32">
                  <label className="text-sm text-slate-400 mb-2 block">{currentOpConfig.arg2Label}</label>
                  <input
                    type="number"
                    value={arg2}
                    onChange={(e) => setArg2(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#050510] border border-[#1e1e4a] text-white font-mono text-sm focus:outline-none focus:border-orange-500/50 transition-colors"
                    min={0}
                    max={currentText.length}
                  />
                </div>
              )}
            </div>
          )}

          {/* Run button */}
          <button
            onClick={handleRun}
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white transition-all cursor-pointer mb-4"
            style={{ background: 'linear-gradient(135deg, #ea580c, #f97316)', boxShadow: '0 0 20px rgba(249,115,22,0.3)' }}
            aria-label={`Run ${op} operation on StringBuilder`}
          >
            <Play size={18} />
            RUN {op.toUpperCase()}()
          </button>

          {/* Results */}
          <AnimatePresence>
            {hasRun && result && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                {/* Code */}
                <div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider mb-2">Generated Java code</div>
                  <pre className="code-block text-sm text-slate-200 overflow-x-auto">
                    <code>{result.code}</code>
                  </pre>
                </div>

                {/* Output */}
                <div className="flex items-center gap-3">
                  <div className="text-sm text-slate-500 font-mono">Output:</div>
                  <div className="font-mono text-green-400 bg-[#050510] border border-[#1e1e4a] px-3 py-1.5 rounded-lg text-sm">
                    {result.output}
                  </div>
                </div>

                {/* Visual buffer */}
                <MutableBufferViz
                  before={result.before}
                  after={result.after}
                  show={true}
                  op={op}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default StringBuilderSection;
