import type { MCTriviaQuestion } from './constants';
import lightningThiefRaw from '../percyjackson1.md?raw';
import seaOfMonstersRaw from '../percyjackson2.md?raw';
import titansCurseRaw from '../percyjackson3.md?raw';
import battleOfLabyrinthRaw from '../percyjackson4.md?raw';
import lastOlympianRaw from '../percyjackson5.md?raw';

type PercySourceQuestion = {
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

const parsePercyTrivia = (raw: string): PercySourceQuestion[] => {
  const start = raw.indexOf('[');
  const end = raw.lastIndexOf(']');

  if (start === -1 || end === -1 || end <= start) {
    throw new Error('Unable to locate the Percy Jackson trivia JSON array.');
  }

  return JSON.parse(raw.slice(start, end + 1)) as PercySourceQuestion[];
};

const normalizeQuestion = (question: PercySourceQuestion, id: number): MCTriviaQuestion => ({
  id,
  question: question.question,
  options: question.options ?? (question.type === 'true_false' ? ['True', 'False'] : []),
  answer: question.correct_answer ?? question.answer ?? '',
  evidence: typeof question.evidence === 'string'
    ? question.evidence
    : question.evidence?.context
      ? `${question.evidence.context}${question.evidence.book ? ` - ${question.evidence.book}` : ''}${question.evidence.chapter ? `, ${question.evidence.chapter}` : ''}`
      : ''
});

const shuffle = <T,>(items: T[]): T[] => [...items].sort(() => Math.random() - 0.5);

export const PERCY_JACKSON_LIGHTNING_THIEF_TRIVIA: MCTriviaQuestion[] = parsePercyTrivia(lightningThiefRaw).map(normalizeQuestion);
export const PERCY_JACKSON_SEA_OF_MONSTERS_TRIVIA: MCTriviaQuestion[] = parsePercyTrivia(seaOfMonstersRaw).map(normalizeQuestion);
export const PERCY_JACKSON_TITANS_CURSE_TRIVIA: MCTriviaQuestion[] = parsePercyTrivia(titansCurseRaw).map(normalizeQuestion);
export const PERCY_JACKSON_BATTLE_OF_THE_LABYRINTH_TRIVIA: MCTriviaQuestion[] = parsePercyTrivia(battleOfLabyrinthRaw).map(normalizeQuestion);
export const PERCY_JACKSON_LAST_OLYMPIAN_TRIVIA: MCTriviaQuestion[] = parsePercyTrivia(lastOlympianRaw).map(normalizeQuestion);

export const PERCY_JACKSON_MIXED_TRIVIA: MCTriviaQuestion[] = shuffle([
  ...PERCY_JACKSON_LIGHTNING_THIEF_TRIVIA,
  ...PERCY_JACKSON_SEA_OF_MONSTERS_TRIVIA,
  ...PERCY_JACKSON_TITANS_CURSE_TRIVIA,
  ...PERCY_JACKSON_BATTLE_OF_THE_LABYRINTH_TRIVIA,
  ...PERCY_JACKSON_LAST_OLYMPIAN_TRIVIA,
]).slice(0, 20);
