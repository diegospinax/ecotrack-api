import { Question } from "../question/Questions";
import AnswerId from "./value-objects/AnswerId";
import AnswerIsCorrect from "./value-objects/AnswerIsCorrect";
import AnswerText from "./value-objects/AnswerText";

export interface Answer {
  id?: AnswerId;
  text: AnswerText;
  isCorrect: AnswerIsCorrect;
  question?: Question;
}
