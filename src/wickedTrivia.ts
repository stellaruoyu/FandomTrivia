import type { MCTriviaQuestion } from './constants';
import wickedPart1Raw from '../wicked1.md?raw';
import wickedPart2Raw from '../wicked2.md?raw';

type WickedSourceQuestion = {
  type?: string;
  question: string;
  options?: string[];
  correct_answer?: string;
  answer?: string;
  evidence?: {
    type?: string;
    book?: string;
    chapter?: string;
    context?: string;
  } | string;
};

const parseWickedTrivia = (raw: string): WickedSourceQuestion[] => {
  const start = raw.indexOf('[');
  const end = raw.lastIndexOf(']');

  if (start === -1 || end === -1 || end <= start) {
    throw new Error('Unable to locate the trivia JSON array in Wicked markdown.');
  }

  return JSON.parse(raw.slice(start, end + 1)) as WickedSourceQuestion[];
};

const normalizeQuestion = (question: WickedSourceQuestion, id: number): MCTriviaQuestion => ({
  id,
  question: question.question,
  options: question.options ?? (question.type === 'true_false' ? ['True', 'False'] : []),
  answer: question.correct_answer ?? question.answer ?? '',
  evidence: typeof question.evidence === 'string'
    ? question.evidence
    : question.evidence?.context
      ? `${question.evidence.context}${question.evidence.chapter ? ` - ${question.evidence.chapter}` : ''}`
      : ''
});

export const WICKED_PART_1_TRIVIA: MCTriviaQuestion[] = parseWickedTrivia(wickedPart1Raw).map(normalizeQuestion);
export const WICKED_PART_2_TRIVIA: MCTriviaQuestion[] = parseWickedTrivia(wickedPart2Raw).map(normalizeQuestion);

export const WICKED_MIXED_TRIVIA: MCTriviaQuestion[] = [
  ...WICKED_PART_1_TRIVIA,
  ...WICKED_PART_2_TRIVIA,
].sort(() => Math.random() - 0.5).slice(0, 20);
