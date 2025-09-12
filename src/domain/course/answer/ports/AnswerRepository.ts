import { Answer } from "../Answer";
import AnswerId from "../value-objects/AnswerId";

export interface AnswerRepository {
  createAnswer(answere: Answer): Promise<Answer>;
  findById(answerId: AnswerId): Promise<Answer>;
  updateAnswer(answer: Answer): Promise<void>;
  deleteAnswer(answerId: AnswerId): Promise<void>;
}
