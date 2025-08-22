import type { Lesson } from "../lessons/Lesson";
import type { Person } from "../person/Person";

export interface Course {
  id: number;
  person: Person;
  lesson: Lesson;
  isFinished: boolean;
}