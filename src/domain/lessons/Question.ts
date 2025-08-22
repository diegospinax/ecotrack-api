import type { Answer } from "./Answer";
import type { Lesson } from "./Lesson";

export interface Question {
  id: number;
  lesson: Lesson;
  question: string;
  answers: Answer[];
}