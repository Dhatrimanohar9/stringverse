// Type definitions for STRINGVERSE application

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  topic: string;
}

export interface CodeExample {
  id: string;
  title: string;
  description: string;
  code: string;
  output: string;
  explanation: string;
  category: 'string' | 'stringbuilder' | 'stringbuffer' | 'comparison';
}

export interface StringOperation {
  name: string;
  description: string;
  apply: (text: string, arg1?: string, arg2?: string | number, arg3?: string) => string;
  signature: string;
  exampleCode: (text: string, arg1?: string, arg2?: string | number, arg3?: string) => string;
}

export interface CharacterInfo {
  id: 'string' | 'stringbuilder' | 'stringbuffer';
  name: string;
  fullName: string;
  tagline: string;
  color: string;
  glowColor: string;
  textColor: string;
  borderColor: string;
  bgColor: string;
  features: {
    mutability: string;
    synchronization: string;
    modification: string;
    typicalUse: string;
  };
  strengths: string[];
  weaknesses: string[];
}

export type SoundType = 'click' | 'success' | 'error' | 'transition' | 'quiz-correct' | 'quiz-wrong';
