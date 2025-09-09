import LessonId from "../lesson/value-objects/LessonId";
import QuestionId from "./value-objects/QuestionId";
import QuestionText from "./value-objects/QuestionText";

export interface Question {
  id: QuestionId;
  question: QuestionText;
  lessonId: LessonId;
}
