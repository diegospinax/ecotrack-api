import QuestionId from "../question/value-objects/QuestionId";
import AnswerId from "./value-objects/AnswerId";
import AnswerValidation from "./value-objects/AnswerIsCorrect";
import AnswerText from "./value-objects/AnswerText";

export interface Answer {
  id: AnswerId;
  text: AnswerText;
  is_correct: AnswerValidation;
  questionId: QuestionId;
}
