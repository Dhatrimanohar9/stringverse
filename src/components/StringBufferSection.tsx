import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Unlock, Play, Square, Info } from 'lucide-react';
import { StringBufferCharacter } from './Characters';
import { playSound } from '../utils/sound';

interface ThreadState {
  id: 'A' | 'B';
  status: 'idle' | 'waiting' | 'executing' | 'done';
  pendingText: string;
  color: string;
  borderColor: string;
}

interface LogEntry {
  id: number;
  time: number;
  thread: 'A' | 'B' | 'system';
  message: string;
  type: 'info' | 'lock' | 'unlock' | 'write' | 'system';
}

const StringBufferSection: React.FC = () => {
  const [bufferContent, setBufferContent] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [lockHolder, setLockHolder] = useState<'A' | 'B' | null>(null);
  const [threads, setThreads] = useState<ThreadState[]>([
    { id: 'A', status: 'idle', pendingText: ' Hello', color: 'text-cyan-400', borderColor: 'border-cyan-500' },
    { id: 'B', status: 'idle', pendingText: ' World', color: 'text-violet-400', borderColor: 'border-violet-500' },
  ]);
  const [log, setLog] = useState<LogEntry[]>([]);
  const [simComplete, setSimComplete] = useState(false);
  const logRef = useRef<HTMLDivElement>(null);
  const logId = useRef(0);

  // Auto-scroll log
  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [log]);

  const addLog = (thread: LogEntry['thread'], message: string, type: LogEntry['type']) => {
    logId.current++;
    setLog((prev) => [
      ...prev,
      { id: logId.current, time: Date.now(), thread, message, type },
    ]);
  };

  const setThreadStatus = (id: 'A' | 'B', status: ThreadState['status']) => {
    setThreads((prev) => prev.map((t) => (t.id === id ? { ...t, status } : t)));
  };

  const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

  const runSimulation = async () => {
    if (isRunning) return;
    playSound('run');
    setIsRunning(true);
    setSimComplete(false);
    setBufferContent('StringBuffer:');
    setLockHolder(null);
    setLog([]);
    setThreads((prev) => prev.map((t) => ({ ...t, status: 'idle' })));

    addLog('system', 'Simulation started. Shared StringBuffer created.', 'system');
    await sleep(500);

    // Both threads become active
    addLog('A', 'Thread A wants to call append(" Hello")', 'info');
    addLog('B', 'Thread B wants to call append(" World")', 'info');
    setThreadStatus('A', 'waiting');
    setThreadStatus('B', 'waiting');
    await sleep(800);

    // Thread A acquires lock
    addLog('A', 'Thread A acquires the synchronized lock on StringBuffer', 'lock');
    setLockHolder('A');
    setThreadStatus('A', 'executing');
    setThreadStatus('B', 'waiting');
    await sleep(1000);

    // Thread A executes
    addLog('A', 'Thread A executing: sb.append(" Hello")', 'write');
    setBufferContent('StringBuffer: Hello');
    await sleep(1200);

    // Thread A releases lock
    addLog('A', 'Thread A releases the synchronized lock', 'unlock');
    setLockHolder(null);
    setThreadStatus('A', 'done');
    await sleep(600);

    // Thread B acquires lock
    addLog('B', 'Thread B acquires the synchronized lock on StringBuffer', 'lock');
    setLockHolder('B');
    setThreadStatus('B', 'executing');
    await sleep(1000);

    // Thread B executes
    addLog('B', 'Thread B executing: sb.append(" World")', 'write');
    setBufferContent('StringBuffer: Hello World');
    await sleep(1200);

    // Thread B releases lock
    addLog('B', 'Thread B releases the synchronized lock', 'unlock');
    setLockHolder(null);
    setThreadStatus('B', 'done');
    await sleep(500);

    addLog('system', 'Final buffer content: "StringBuffer: Hello World"', 'system');
    setSimComplete(true);
    setIsRunning(false);
    playSound('success');
  };

  const resetSim = () => {
    playSound('click');
    setBufferContent('');
    setIsRunning(false);
    setLockHolder(null);
    setLog([]);
    setSimComplete(false);
    setThreads((prev) => prev.map((t) => ({ ...t, status: 'idle' })));
  };

  const getThreadStatusLabel = (status: ThreadState['status']) => {
    switch (status) {
      case 'idle': return 'Idle';
      case 'waiting': return 'Waiting for lock...';
      case 'executing': return 'Executing (holds lock)';
      case 'done': return 'Complete';
    }
  };

  const getLogStyle = (type: LogEntry['type']) => {
    switch (type) {
      case 'lock': return 'text-green-400';
      case 'unlock': return 'text-red-400';
      case 'write': return 'text-orange-400';
      case 'system': return 'text-slate-400 italic';
      default: return 'text-slate-300';
    }
  };

  return (
    <section
      id="stringbuffer"
      className="relative py-20 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0d0d1a 0%, #080820 100%)' }}
      aria-label="StringBuffer section: synchronized guardian and concurrency simulation"
    >
      {/* Background accent */}
      <div
        className="absolute top-20 right-0 w-96 h-96 rounded-full opacity-5"
        style={{ background: 'radial-gradient(circle, #10b981, transparent)' }}
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
              <div className="w-3 h-3 rounded-full bg-green-400" />
              <span className="text-green-400 text-sm font-mono uppercase tracking-widest">Chapter 3</span>
            </div>

            <h2 className="text-4xl sm:text-5xl font-black mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              Meet <span className="text-gradient-green">STRINGBUFFER</span>
              <br />
              <span className="text-2xl sm:text-3xl text-slate-300 font-semibold">The Synchronized Guardian</span>
            </h2>

            <div className="section-divider mb-6" style={{ background: 'linear-gradient(90deg, #10b981, #34d399)' }} />

            <div className="space-y-4 text-slate-400 text-base leading-relaxed">
              <p>
                <code className="text-green-400 font-mono bg-[#001a0a] px-1 rounded">StringBuffer</code> is{' '}
                <strong className="text-white">mutable</strong> like StringBuilder, but its methods are{' '}
                <strong className="text-white">synchronized</strong>. Only one thread can execute a given
                synchronized method on the same StringBuffer instance at a time.
              </p>
              <p>
                This protects individual method calls in multi-threaded environments, reducing the risk of
                data corruption when two threads attempt to modify the buffer concurrently.
              </p>
              <p>
                Synchronization introduces some overhead compared with StringBuilder. If you do not need
                concurrent access, StringBuilder is generally preferred.
              </p>
            </div>

            {/* Important note */}
            <div className="mt-4 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex gap-3">
              <Info size={16} className="text-amber-400 shrink-0 mt-0.5" />
              <div className="text-amber-300 text-sm">
                <strong>Educational note:</strong> Individual synchronized method calls are protected.
                However, a compound operation consisting of multiple method calls may still require
                external synchronization to be fully thread-safe.
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { label: 'Mutability', value: 'Mutable', colorClass: 'text-green-400' },
                { label: 'Synchronization', value: 'Synchronized methods', colorClass: 'text-emerald-400' },
                { label: 'Modification', value: 'Modifies same object', colorClass: 'text-green-400' },
                { label: 'Typical Use', value: 'Multi-threaded shared buffer', colorClass: 'text-teal-400' },
              ].map(({ label, value, colorClass }) => (
                <div key={label} className="p-3 rounded-xl glass-card border border-[#1e1e4a]">
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
            className="flex flex-col items-center gap-6"
          >
            <StringBufferCharacter size={180} showLock={lockHolder !== null} />
            <div className="text-center">
              <div className="text-green-400 font-bold text-xl" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                STRINGBUFFER
              </div>
              <div className="text-slate-500 text-sm mt-1">Armored · Synchronized · Guardian</div>
            </div>

            {/* Lock status */}
            <AnimatePresence>
              {lockHolder && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/20 border border-green-500/50 text-green-400 text-sm font-mono"
                >
                  <Lock size={14} />
                  Locked by Thread {lockHolder}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Concurrency Simulation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card rounded-2xl p-6 sm:p-8 border border-[#1e1e4a]"
        >
          <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
            <div>
              <h3 className="text-2xl font-bold text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                Concurrency Simulation
              </h3>
              <p className="text-slate-500 text-sm mt-1">
                Educational simulation — not a real Java runtime
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={runSimulation}
                disabled={isRunning}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm text-white transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ background: 'linear-gradient(135deg, #047857, #10b981)', boxShadow: isRunning ? 'none' : '0 0 20px rgba(16,185,129,0.3)' }}
                aria-label="Start concurrency simulation"
              >
                <Play size={16} />
                {isRunning ? 'Running...' : 'Start Simulation'}
              </button>
              <button
                onClick={resetSim}
                className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm text-slate-400 hover:text-slate-200 border border-[#1e1e4a] hover:border-slate-600 transition-all cursor-pointer"
                aria-label="Reset simulation"
              >
                <Square size={14} />
                Reset
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Thread A */}
            <div className={`p-4 rounded-xl border transition-all duration-300 ${
              threads[0].status === 'executing'
                ? 'border-cyan-500 bg-cyan-500/10'
                : threads[0].status === 'done'
                ? 'border-cyan-500/30 bg-cyan-500/5'
                : 'border-[#1e1e4a] bg-[#111133]'
            }`}
              role="region"
              aria-label="Thread A status"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="font-bold text-cyan-400" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  Thread A
                </div>
                {threads[0].status === 'executing' && (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full"
                  />
                )}
                {threads[0].status === 'done' && (
                  <div className="text-cyan-400 text-xs font-mono">✓ Done</div>
                )}
              </div>
              <div className="font-mono text-sm text-slate-300 bg-[#050510] rounded-lg p-2 mb-3">
                sb.append("{threads[0].pendingText}")
              </div>
              <div className="text-xs text-slate-500">
                Status: <span className={threads[0].status === 'executing' ? 'text-cyan-400' : 'text-slate-400'}>
                  {getThreadStatusLabel(threads[0].status)}
                </span>
              </div>
            </div>

            {/* Shared Buffer */}
            <div className="p-4 rounded-xl border border-green-500/40 bg-green-500/5"
              role="region"
              aria-label="Shared StringBuffer"
            >
              <div className="text-center">
                <div className="font-bold text-green-400 mb-3" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  Shared StringBuffer
                </div>

                {/* Lock indicator */}
                <div className="flex items-center justify-center mb-3">
                  <AnimatePresence mode="wait">
                    {lockHolder ? (
                      <motion.div
                        key="locked"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="flex items-center gap-2 text-green-400"
                      >
                        <Lock size={20} className="animate-lock-pulse" />
                        <span className="text-sm font-mono">LOCKED</span>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="unlocked"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="flex items-center gap-2 text-slate-500"
                      >
                        <Unlock size={20} />
                        <span className="text-sm font-mono">UNLOCKED</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Buffer content */}
                <div className="font-mono text-sm bg-[#050510] border border-green-500/30 rounded-lg p-3 text-green-300 min-h-12 flex items-center justify-center">
                  {bufferContent || <span className="text-slate-600">empty</span>}
                </div>
              </div>
            </div>

            {/* Thread B */}
            <div className={`p-4 rounded-xl border transition-all duration-300 ${
              threads[1].status === 'executing'
                ? 'border-violet-500 bg-violet-500/10'
                : threads[1].status === 'done'
                ? 'border-violet-500/30 bg-violet-500/5'
                : 'border-[#1e1e4a] bg-[#111133]'
            }`}
              role="region"
              aria-label="Thread B status"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="font-bold text-violet-400" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  Thread B
                </div>
                {threads[1].status === 'executing' && (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-4 h-4 border-2 border-violet-400 border-t-transparent rounded-full"
                  />
                )}
                {threads[1].status === 'done' && (
                  <div className="text-violet-400 text-xs font-mono">✓ Done</div>
                )}
              </div>
              <div className="font-mono text-sm text-slate-300 bg-[#050510] rounded-lg p-2 mb-3">
                sb.append("{threads[1].pendingText}")
              </div>
              <div className="text-xs text-slate-500">
                Status: <span className={threads[1].status === 'executing' ? 'text-violet-400' : 'text-slate-400'}>
                  {getThreadStatusLabel(threads[1].status)}
                </span>
              </div>
            </div>
          </div>

          {/* Event log */}
          <div className="mt-6">
            <div className="text-xs text-slate-500 uppercase tracking-wider mb-2">Event Log</div>
            <div
              ref={logRef}
              className="bg-[#050510] border border-[#1e1e4a] rounded-xl p-4 h-48 overflow-y-auto font-mono text-xs space-y-1"
              role="log"
              aria-label="Simulation event log"
              aria-live="polite"
            >
              {log.length === 0 ? (
                <div className="text-slate-600">Press "Start Simulation" to begin...</div>
              ) : (
                log.map((entry) => (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`flex gap-2 ${getLogStyle(entry.type)}`}
                  >
                    <span className="text-slate-600 shrink-0">
                      {entry.thread === 'system' ? '[SYS]' : `[THR-${entry.thread}]`}
                    </span>
                    <span>
                      {entry.type === 'lock' && <Lock size={10} className="inline mr-1" />}
                      {entry.type === 'unlock' && <Unlock size={10} className="inline mr-1" />}
                      {entry.message}
                    </span>
                  </motion.div>
                ))
              )}
            </div>
          </div>

          {/* Completion result */}
          <AnimatePresence>
            {simComplete && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 rounded-xl bg-green-500/10 border border-green-500/40"
              >
                <div className="text-green-400 font-bold mb-2">Simulation complete</div>
                <div className="font-mono text-green-300 text-sm">
                  Final StringBuffer: "{bufferContent}"
                </div>
                <p className="text-slate-400 text-sm mt-2">
                  The synchronized lock ensured Thread A's append() completed before Thread B
                  acquired the lock. Each individual method call was protected from concurrent interference.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default StringBufferSection;
