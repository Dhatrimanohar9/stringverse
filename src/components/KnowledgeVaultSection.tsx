import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Code2, AlertCircle, HelpCircle, Lightbulb, ChevronDown, ChevronUp } from 'lucide-react';
import { playSound } from '../utils/sound';

interface Section {
  id: string;
  icon: React.ReactNode;
  title: string;
  content: React.ReactNode;
}

const MethodCard: React.FC<{ name: string; signature: string; description: string; example: string }> = ({
  name, signature, description, example
}) => (
  <div className="p-4 rounded-xl border border-[#1e1e4a] bg-[#080820] hover:border-[#2d2d7a] transition-colors">
    <div className="font-mono text-cyan-400 font-bold text-sm mb-1">{name}</div>
    <div className="font-mono text-slate-500 text-xs mb-2">{signature}</div>
    <p className="text-slate-400 text-sm mb-3 leading-relaxed">{description}</p>
    <div className="bg-[#030308] rounded-lg p-2 font-mono text-xs text-slate-300">{example}</div>
  </div>
);

const AccordionItem: React.FC<{
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}> = ({ question, answer, isOpen, onToggle }) => (
  <div className="border border-[#1e1e4a] rounded-xl overflow-hidden hover:border-[#2d2d7a] transition-colors">
    <button
      onClick={onToggle}
      className="w-full text-left p-4 flex items-center justify-between gap-4 cursor-pointer"
      aria-expanded={isOpen}
    >
      <span className="text-slate-200 font-medium text-sm">{question}</span>
      {isOpen ? <ChevronUp size={16} className="text-violet-400 shrink-0" /> : <ChevronDown size={16} className="text-slate-500 shrink-0" />}
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: 'auto' }}
          exit={{ height: 0 }}
          className="overflow-hidden"
        >
          <div className="px-4 pb-4 text-slate-400 text-sm leading-relaxed border-t border-[#111133] pt-4">
            {answer}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const KnowledgeVaultSection: React.FC = () => {
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<string>('definitions');

  const handleTabChange = (id: string) => {
    playSound('click');
    setActiveTab(id);
  };

  const stringMethods = [
    {
      name: 'concat()',
      signature: 'String concat(String str)',
      description: 'Returns a new String that is the concatenation of this string and the argument. The original String is not modified.',
      example: '"Hello".concat(" World") // "Hello World"',
    },
    {
      name: 'equals()',
      signature: 'boolean equals(Object obj)',
      description: 'Compares the character content of this String to the specified object. Returns true if the contents are identical.',
      example: '"java".equals("java") // true',
    },
    {
      name: 'toUpperCase()',
      signature: 'String toUpperCase()',
      description: 'Returns a new String with all characters converted to uppercase. Original is unchanged.',
      example: '"hello".toUpperCase() // "HELLO"',
    },
    {
      name: 'substring()',
      signature: 'String substring(int begin, int end)',
      description: 'Returns a new String that is a substring of this string, from begin (inclusive) to end (exclusive).',
      example: '"hello".substring(1, 3) // "el"',
    },
    {
      name: 'length()',
      signature: 'int length()',
      description: 'Returns the number of characters in the String.',
      example: '"Java".length() // 4',
    },
    {
      name: 'replace()',
      signature: 'String replace(CharSequence target, CharSequence replacement)',
      description: 'Returns a new String with all occurrences of target replaced by replacement.',
      example: '"hello".replace("l", "r") // "herro"',
    },
  ];

  const sbMethods = [
    {
      name: 'append()',
      signature: 'StringBuilder append(String s)',
      description: 'Appends the string argument to this sequence. Modifies the existing object in place.',
      example: 'sb.append("text") // modifies sb',
    },
    {
      name: 'insert()',
      signature: 'StringBuilder insert(int offset, String s)',
      description: 'Inserts the string into this character sequence at the given offset.',
      example: 'sb.insert(2, "X") // inserts X at index 2',
    },
    {
      name: 'delete()',
      signature: 'StringBuilder delete(int start, int end)',
      description: 'Removes the characters from start (inclusive) to end (exclusive).',
      example: 'sb.delete(0, 3) // removes first 3 chars',
    },
    {
      name: 'reverse()',
      signature: 'StringBuilder reverse()',
      description: 'Reverses the character sequence in place.',
      example: 'sb.reverse() // "abc" → "cba"',
    },
    {
      name: 'replace()',
      signature: 'StringBuilder replace(int start, int end, String str)',
      description: 'Replaces characters from start (inclusive) to end (exclusive) with the given string.',
      example: 'sb.replace(0, 2, "XY")',
    },
    {
      name: 'capacity()',
      signature: 'int capacity()',
      description: 'Returns the current capacity of the internal buffer. Default is 16; grows automatically.',
      example: 'new StringBuilder().capacity() // 16',
    },
  ];

  const interviewQAs = [
    {
      q: 'Why is String immutable in Java?',
      a: 'String is designed as an immutable class for security, caching, and thread safety. Because String objects cannot be changed, they can be safely shared between threads without synchronization, used reliably as Map keys, and stored in the String pool to reduce memory usage.',
    },
    {
      q: 'What is the String pool in Java?',
      a: 'The String pool (also called the String intern pool) is a special region of heap memory where string literals are stored. When you create a string literal, Java checks the pool first. If the same value exists, the existing reference is returned instead of creating a new object. This saves memory but only applies to literals, not strings created with new String().',
    },
    {
      q: 'When would you use StringBuffer over StringBuilder?',
      a: 'Use StringBuffer when a mutable character buffer needs to be shared between multiple threads and individual method calls on the buffer need to be synchronized. If your code is single-threaded, StringBuilder is generally preferred because it avoids the overhead of synchronization.',
    },
    {
      q: 'Does StringBuffer guarantee complete thread safety for all operations?',
      a: 'StringBuffer synchronizes individual method calls, so each individual operation is protected. However, if you need to perform a compound operation safely (for example, check a condition, then modify the buffer based on that condition), the compound sequence of steps is not automatically atomic. External synchronization may still be needed for such compound operations.',
    },
    {
      q: 'What is the difference between == and equals() for Strings?',
      a: '== compares object references — it checks whether both variables point to the exact same object in memory. equals() compares the content of the two String objects — it returns true if both contain the same sequence of characters. Always use equals() to compare String values in Java.',
    },
    {
      q: 'What happens to discarded String objects?',
      a: 'String objects that are no longer referenced become eligible for garbage collection. Java\'s garbage collector will eventually reclaim their memory. String literals may remain in the String pool for the lifetime of the application, but objects created with new String() can be collected normally.',
    },
  ];

  const commonMistakes = [
    {
      title: 'Forgetting to assign concat() result',
      bad: 'name.concat(" Smith"); // result discarded',
      good: 'name = name.concat(" Smith"); // correct',
      note: 'String methods always return new objects. The original is never modified.',
    },
    {
      title: 'Using == to compare String content',
      bad: 'if (a == b) // compares references, not content',
      good: 'if (a.equals(b)) // compares content correctly',
      note: 'Use equals() whenever you want to compare String values.',
    },
    {
      title: 'Using StringBuilder in concurrent code without care',
      bad: '// Thread A and B both call sb.append() — not synchronized',
      good: '// Use StringBuffer, or synchronize externally',
      note: 'StringBuilder is not synchronized. For shared use across threads, prefer StringBuffer or external synchronization.',
    },
    {
      title: 'Claiming StringBuffer is always "thread-safe" for all operations',
      bad: '// Assuming compound operations are automatically safe',
      good: '// Understand that only individual method calls are synchronized',
      note: 'StringBuffer protects individual method calls. Multi-step compound operations may still need external synchronization.',
    },
  ];

  const sections: Section[] = [
    {
      id: 'definitions',
      icon: <BookOpen size={16} />,
      title: 'Definitions',
      content: (
        <div className="space-y-6">
          {[
            {
              term: 'String',
              colorClass: 'text-cyan-400',
              def: 'An immutable sequence of characters in Java. Once a String object is created, its content cannot be altered. All String methods that appear to modify a string actually return a new String object.',
            },
            {
              term: 'StringBuilder',
              colorClass: 'text-orange-400',
              def: 'A mutable sequence of characters. StringBuilder methods modify the existing internal buffer in place. It is not synchronized, making it fast for use in single-threaded scenarios requiring frequent string manipulation.',
            },
            {
              term: 'StringBuffer',
              colorClass: 'text-green-400',
              def: 'A mutable sequence of characters with synchronized methods. Individual method calls are protected against concurrent access from multiple threads. It is otherwise similar to StringBuilder in functionality.',
            },
            {
              term: 'Immutability',
              colorClass: 'text-violet-400',
              def: 'The property of an object whose state cannot be changed after it is created. String objects are immutable. Reassigning a String variable only changes which object the variable points to — the original object remains unchanged.',
            },
            {
              term: 'Synchronization',
              colorClass: 'text-emerald-400',
              def: 'A mechanism that ensures only one thread can execute a synchronized method on the same object at a time. StringBuffer uses synchronization to protect individual method calls in multi-threaded environments.',
            },
          ].map(({ term, colorClass, def }) => (
            <div key={term} className="p-5 rounded-xl border border-[#1e1e4a] bg-[#080820]">
              <div className={`${colorClass} font-bold font-mono text-lg mb-2`}>{term}</div>
              <p className="text-slate-400 text-sm leading-relaxed">{def}</p>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: 'string-methods',
      icon: <Code2 size={16} />,
      title: 'String Methods',
      content: (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {stringMethods.map((m) => <MethodCard key={m.name} {...m} />)}
        </div>
      ),
    },
    {
      id: 'sb-methods',
      icon: <Code2 size={16} />,
      title: 'Builder Methods',
      content: (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {sbMethods.map((m) => <MethodCard key={m.name} {...m} />)}
        </div>
      ),
    },
    {
      id: 'mistakes',
      icon: <AlertCircle size={16} />,
      title: 'Common Mistakes',
      content: (
        <div className="space-y-4">
          {commonMistakes.map((mistake, i) => (
            <div key={i} className="p-5 rounded-xl border border-[#1e1e4a] bg-[#080820]">
              <div className="text-white font-semibold mb-3 flex items-center gap-2">
                <AlertCircle size={14} className="text-red-400 shrink-0" />
                {mistake.title}
              </div>
              <div className="space-y-2">
                <div>
                  <div className="text-xs text-red-400 uppercase tracking-wider mb-1">Avoid</div>
                  <code className="text-red-300 text-xs bg-red-500/10 rounded px-2 py-1 block font-mono">
                    {mistake.bad}
                  </code>
                </div>
                <div>
                  <div className="text-xs text-green-400 uppercase tracking-wider mb-1">Better</div>
                  <code className="text-green-300 text-xs bg-green-500/10 rounded px-2 py-1 block font-mono">
                    {mistake.good}
                  </code>
                </div>
                <p className="text-slate-500 text-xs">{mistake.note}</p>
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: 'interview',
      icon: <HelpCircle size={16} />,
      title: 'Interview Q&A',
      content: (
        <div className="space-y-3">
          {interviewQAs.map((item, i) => (
            <AccordionItem
              key={i}
              question={item.q}
              answer={item.a}
              isOpen={openAccordion === i}
              onToggle={() => { setOpenAccordion(openAccordion === i ? null : i); playSound('click'); }}
            />
          ))}
        </div>
      ),
    },
    {
      id: 'quickrev',
      icon: <Lightbulb size={16} />,
      title: 'Quick Revision',
      content: (
        <div className="space-y-6">
          {[
            {
              title: 'String — Key Points',
              cardClass: 'border-cyan-500/30 bg-cyan-500/5',
              titleClass: 'text-cyan-400',
              bulletClass: 'text-cyan-400',
              points: [
                'Immutable: content cannot change after creation',
                'Methods return new String objects',
                'Safe to share across threads (by virtue of immutability)',
                'Use equals() for content comparison, not ==',
                'Ideal for fixed values, constants, and Map keys',
              ],
            },
            {
              title: 'StringBuilder — Key Points',
              cardClass: 'border-orange-500/30 bg-orange-500/5',
              titleClass: 'text-orange-400',
              bulletClass: 'text-orange-400',
              points: [
                'Mutable: modifies its internal character sequence',
                'Not synchronized — do not share between threads without care',
                'Faster than StringBuffer for single-threaded use',
                'Default capacity is 16 characters; grows automatically',
                'Ideal for building strings from many pieces in a loop',
              ],
            },
            {
              title: 'StringBuffer — Key Points',
              cardClass: 'border-green-500/30 bg-green-500/5',
              titleClass: 'text-green-400',
              bulletClass: 'text-green-400',
              points: [
                'Mutable: same functionality as StringBuilder',
                'Synchronized methods: each individual call is protected',
                'Synchronization adds some overhead',
                'Useful for a shared mutable buffer in multi-threaded code',
                'Compound multi-step operations may still need external sync',
              ],
            },
          ].map(({ title, cardClass, titleClass, bulletClass, points }) => (
            <div key={title} className={`p-5 rounded-xl border ${cardClass}`}>
              <div className={`${titleClass} font-bold mb-3`} style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                {title}
              </div>
              <ul className="space-y-2">
                {points.map((p, i) => (
                  <li key={i} className="flex items-start gap-2 text-slate-300 text-sm">
                    <span className={`${bulletClass} mt-1 shrink-0`}>→</span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Final takeaway */}
          <div className="p-6 rounded-2xl border border-violet-500/40 bg-gradient-to-r from-violet-500/10 to-cyan-500/5 text-center">
            <div className="text-violet-400 font-mono text-xs uppercase tracking-widest mb-3">
              Final Takeaway
            </div>
            <p className="text-slate-200 leading-relaxed">
              Choose <strong className="text-cyan-400">String</strong> when your text should remain unchanged.
              Choose <strong className="text-orange-400">StringBuilder</strong> when you need efficient mutable
              text in ordinary single-threaded code.
              Choose <strong className="text-green-400">StringBuffer</strong> when synchronized method access
              to shared mutable text is needed.
            </p>
          </div>
        </div>
      ),
    },
  ];

  const activeSection = sections.find((s) => s.id === activeTab)!;

  return (
    <section
      id="vault"
      className="relative py-20 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #050510 0%, #080820 100%)' }}
      aria-label="Knowledge vault: Java String reference guide"
    >
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 80%, #06b6d4 0%, transparent 50%)`,
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
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-sm font-mono mb-6">
            <BookOpen size={14} />
            Chapter 7
          </div>
          <h2 className="text-4xl sm:text-5xl font-black mb-4 text-gradient-violet-cyan"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Knowledge Vault
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Definitions, methods, common mistakes, interview prep, and quick revision notes.
          </p>
        </motion.div>

        {/* Tab navigation */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => handleTabChange(section.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer border ${
                activeTab === section.id
                  ? 'bg-violet-500/20 border-violet-500/50 text-violet-300'
                  : 'bg-[#111133] border-[#1e1e4a] text-slate-400 hover:border-slate-600 hover:text-slate-200'
              }`}
              aria-pressed={activeTab === section.id}
            >
              {section.icon}
              {section.title}
            </button>
          ))}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="glass-card rounded-2xl p-6 sm:p-8 border border-[#1e1e4a]"
          >
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              {activeSection.icon}
              {activeSection.title}
            </h3>
            {activeSection.content}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default KnowledgeVaultSection;
