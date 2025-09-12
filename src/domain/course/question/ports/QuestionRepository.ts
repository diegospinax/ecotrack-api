import { Question } from "../Questions";
import QuestionId from "../value-objects/QuestionId";

export interface QuestionRepository {
  createQuestion(question: Question): Promise<Question>;
  findById(questionId: QuestionId): Promise<Question>;
  updateQuestion(question: Question): Promise<void>;
  deleteQuestion(questionId: QuestionId): Promise<void>;
}
