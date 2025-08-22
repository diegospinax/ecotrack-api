import type { ActionType } from "../types";
import type { Question } from "./Question";

export interface Lesson {
  id: number;
  title: string;
  description: string;
  type: ActionType;
  questions: Question[]
}