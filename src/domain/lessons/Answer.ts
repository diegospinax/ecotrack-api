import type { Question } from "./Question";

export interface Answer {
  id: number;
  question: Question;
  answer: string;
  isCorrect: boolean;
}