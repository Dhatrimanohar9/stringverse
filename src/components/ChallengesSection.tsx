import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, ChevronRight, Trophy, RotateCcw, Zap } from 'lucide-react';
import { quizQuestions } from '../data/quizQuestions';
import { playSound } from '../utils/sound';

type AnswerState = 'unanswered' | 'correct' | 'wrong';

interface QuizState {
  currentQ: number;
  selected: number | null;
  answerState: AnswerState;
  score: number;
  finished: boolean;
  answers: (number | null)[];
}

const initialState: QuizState = {
  currentQ: 0,
  selected: null,
  answerState: 'unanswered',
  score: 0,
  finished: false,
  answers: [],
};

// Progress bar
const ProgressBar: React.FC<{ current: number; total: number }> = ({ current, total }) => (
  <div className="w-full bg-[#111133] rounded-full h-2 overflow-hidden" aria-label={`Question ${current} of ${total}`}>
    <motion.div
      className="h-full rounded-full"
      style={{ background: 'linear-gradient(90deg, #7c3aed, #06b6d4)' }}
      initial={{ width: 0 }}
      animate={{ width: `${(current / total) * 100}%` }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    />
  </div>
);

// Score ring
const ScoreRing: React.FC<{ score: number; total: number }> = ({ score, total }) => {
  const percentage = Math.round((score / total) * 100);
  const circumference = 2 * Math.PI * 54;
  const offset = circumference - (percentage / 100) * circumference;

  const color = percentage >= 80 ? '#10b981' : percentage >= 60 ? '#f59e0b' : '#ef4444';
  const label = percentage >= 80 ? 'Excellent!' : percentage >= 60 ? 'Good work!' : 'Keep studying!';

  return (
    <div className="flex flex-col items-center gap-4">
      <svg width="140" height="140" viewBox="0 0 120 120" aria-label={`Score: ${score} out of ${total}`}>
        {/* Background ring */}
        <circle cx="60" cy="60" r="54" fill="none" stroke="#1e1e4a" strokeWidth="8" />
        {/* Score ring */}
        <motion.circle
          cx="60"
          cy="60"
          r="54"
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }}
          transform="rotate(-90 60 60)"
          filter={`drop-shadow(0 0 8px ${color}80)`}
        />
        {/* Score text */}
        <text x="60" y="52" textAnchor="middle" fontSize="28" fontWeight="bold" fill="white" fontFamily="Space Grotesk, sans-serif">
          {score}/{total}
        </text>
        <text x="60" y="72" textAnchor="middle" fontSize="12" fill="#94a3b8">
          {percentage}%
        </text>
      </svg>
      <div className="text-xl font-bold" style={{ color, fontFamily: 'Space Grotesk, sans-serif' }}>
        {label}
      </div>
    </div>
  );
};

const ChallengesSection: React.FC = () => {
  const [state, setState] = useState<QuizState>(initialState);
  const [showExplanation, setShowExplanation] = useState(false);

  const question = quizQuestions[state.currentQ];
  const total = quizQuestions.length;

  const handleAnswer = useCallback((optionIdx: number) => {
    if (state.answerState !== 'unanswered') return;

    const isCorrect = optionIdx === question.correctIndex;
    const answerState: AnswerState = isCorrect ? 'correct' : 'wrong';

    playSound(isCorrect ? 'quiz-correct' : 'quiz-wrong');

    setState((prev) => ({
      ...prev,
      selected: optionIdx,
      answerState,
      score: isCorrect ? prev.score + 1 : prev.score,
      answers: [...prev.answers, optionIdx],
    }));

    setShowExplanation(true);
  }, [state.answerState, question.correctIndex]);

  const handleNext = useCallback(() => {
    playSound('click');
    setShowExplanation(false);

    if (state.currentQ >= total - 1) {
      setState((prev) => ({ ...prev, finished: true }));
      playSound('success');
    } else {
      setState((prev) => ({
        ...prev,
        currentQ: prev.currentQ + 1,
        selected: null,
        answerState: 'unanswered',
      }));
    }
  }, [state.currentQ, total]);

  const handleReplay = () => {
    playSound('transition');
    setState(initialState);
    setShowExplanation(false);
  };

  const getOptionStyle = (idx: number): string => {
    if (state.answerState === 'unanswered') {
      return 'border-[#1e1e4a] bg-[#111133] text-slate-300 hover:border-violet-500/50 hover:bg-violet-500/10';
    }
    if (idx === question.correctIndex) {
      return 'border-green-500 bg-green-500/15 text-green-300';
    }
    if (idx === state.selected && state.answerState === 'wrong') {
      return 'border-red-500 bg-red-500/15 text-red-300';
    }
    return 'border-[#1e1e4a] bg-[#0a0a1a] text-slate-500 opacity-60';
  };

  return (
    <section
      id="challenges"
      className="relative py-20 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #080820 0%, #050510 100%)' }}
      aria-label="Challenge arena: Java string quiz"
    >
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 70% 50%, #f59e0b 0%, transparent 50%)`,
        }}
        aria-hidden="true"
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 text-sm font-mono mb-6">
            <Zap size={14} />
            Chapter 6
          </div>
          <h2 className="text-4xl sm:text-5xl font-black mb-4"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            <span className="text-gradient-full">Challenge</span>{' '}
            <span className="text-orange-400">Arena</span>
          </h2>
          <p className="text-slate-400">
            Test your knowledge of Java Strings. {total} questions await.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {state.finished ? (
            /* Results screen */
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass-card rounded-2xl p-8 border border-[#1e1e4a] text-center space-y-8"
            >
              <div className="flex items-center justify-center gap-3">
                <Trophy size={28} className="text-yellow-400" />
                <h3 className="text-2xl font-bold text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  Challenge Complete!
                </h3>
              </div>

              <ScoreRing score={state.score} total={total} />

              {/* Answer review */}
              <div className="text-left space-y-2 max-h-64 overflow-y-auto pr-1">
                {quizQuestions.map((q, i) => {
                  const isCorrect = state.answers[i] === q.correctIndex;
                  return (
                    <div key={q.id} className={`flex items-start gap-3 p-3 rounded-lg ${
                      isCorrect ? 'bg-green-500/10' : 'bg-red-500/10'
                    }`}>
                      {isCorrect
                        ? <Check size={16} className="text-green-400 mt-0.5 shrink-0" />
                        : <X size={16} className="text-red-400 mt-0.5 shrink-0" />
                      }
                      <div>
                        <div className="text-slate-300 text-sm font-medium">Q{i + 1}: {q.topic}</div>
                        {!isCorrect && (
                          <div className="text-slate-500 text-xs mt-1">
                            Correct: {q.options[q.correctIndex]}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <button
                onClick={handleReplay}
                className="flex items-center gap-2 mx-auto px-8 py-3 rounded-xl font-bold text-white transition-all cursor-pointer"
                style={{ background: 'linear-gradient(135deg, #7c3aed, #06b6d4)' }}
                aria-label="Play the quiz again"
              >
                <RotateCcw size={18} />
                Play Again
              </button>
            </motion.div>
          ) : (
            /* Quiz card */
            <motion.div
              key={`q-${state.currentQ}`}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Progress */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500 font-mono">
                    Question {state.currentQ + 1} of {total}
                  </span>
                  <span className="text-violet-400 font-mono">
                    Score: {state.score}
                  </span>
                </div>
                <ProgressBar current={state.currentQ + 1} total={total} />
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-600 font-mono uppercase tracking-wider">
                    {question.topic}
                  </span>
                </div>
              </div>

              {/* Question card */}
              <div className="glass-card rounded-2xl p-6 border border-[#1e1e4a]">
                <div
                  className="text-white text-lg font-semibold mb-6 leading-relaxed whitespace-pre-line"
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                  {question.question}
                </div>

                {/* Options */}
                <div className="space-y-3" role="list" aria-label="Answer options">
                  {question.options.map((option, idx) => (
                    <motion.button
                      key={idx}
                      onClick={() => handleAnswer(idx)}
                      whileHover={state.answerState === 'unanswered' ? { x: 4 } : {}}
                      whileTap={state.answerState === 'unanswered' ? { scale: 0.99 } : {}}
                      disabled={state.answerState !== 'unanswered'}
                      className={`w-full text-left px-5 py-4 rounded-xl border-2 transition-all duration-200 flex items-center gap-3 cursor-pointer disabled:cursor-default ${getOptionStyle(idx)}`}
                      aria-label={`Option ${idx + 1}: ${option}`}
                      role="listitem"
                    >
                      {/* Option indicator */}
                      <div className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 font-mono text-xs font-bold ${
                        state.answerState !== 'unanswered' && idx === question.correctIndex
                          ? 'border-green-400 bg-green-400 text-black'
                          : state.selected === idx && state.answerState === 'wrong'
                          ? 'border-red-400 bg-red-400 text-black'
                          : 'border-current'
                      }`}>
                        {state.answerState !== 'unanswered' && idx === question.correctIndex
                          ? <Check size={12} />
                          : state.selected === idx && state.answerState === 'wrong'
                          ? <X size={12} />
                          : String.fromCharCode(65 + idx)
                        }
                      </div>
                      <span className="text-sm leading-snug">{option}</span>
                    </motion.button>
                  ))}
                </div>

                {/* Explanation */}
                <AnimatePresence>
                  {showExplanation && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-6 overflow-hidden"
                    >
                      <div className={`p-4 rounded-xl border ${
                        state.answerState === 'correct'
                          ? 'bg-green-500/10 border-green-500/40'
                          : 'bg-red-500/10 border-red-500/40'
                      }`}>
                        <div className="flex items-center gap-2 font-bold text-sm mb-2">
                          {state.answerState === 'correct'
                            ? <><Check size={14} className="text-green-400" /><span className="text-green-400">Correct!</span></>
                            : <><X size={14} className="text-red-400" /><span className="text-red-400">Not quite</span></>
                          }
                        </div>
                        <p className="text-slate-300 text-sm leading-relaxed">{question.explanation}</p>
                      </div>

                      <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        onClick={handleNext}
                        className="mt-4 flex items-center gap-2 ml-auto px-6 py-3 rounded-xl font-bold text-sm text-white transition-all cursor-pointer"
                        style={{ background: 'linear-gradient(135deg, #5b21b6, #7c3aed)' }}
                        aria-label={state.currentQ >= total - 1 ? 'See results' : 'Next question'}
                      >
                        {state.currentQ >= total - 1 ? (
                          <><Trophy size={16} />See Results</>
                        ) : (
                          <>Next Question<ChevronRight size={16} /></>
                        )}
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Score tracker dots */}
              <div className="flex justify-center gap-2 flex-wrap">
                {quizQuestions.map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      i < state.currentQ
                        ? state.answers[i] === quizQuestions[i].correctIndex
                          ? 'bg-green-500'
                          : 'bg-red-500'
                        : i === state.currentQ
                        ? 'bg-violet-500'
                        : 'bg-[#1e1e4a]'
                    }`}
                    aria-label={`Question ${i + 1}: ${i < state.currentQ ? (state.answers[i] === quizQuestions[i].correctIndex ? 'correct' : 'wrong') : i === state.currentQ ? 'current' : 'upcoming'}`}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ChallengesSection;
