import { Answer } from "../answer/Answer";
import { Lesson } from "../lesson/Lesson";
import QuestionId from "./value-objects/QuestionId";
import QuestionText from "./value-objects/QuestionText";

export interface Question {
  id?: QuestionId;
  text: QuestionText;
  lesson?: Lesson;
  answers: Answer[];
}
