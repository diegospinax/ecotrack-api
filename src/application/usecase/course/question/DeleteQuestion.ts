import { QuestionRepository } from "@/domain/course/question/ports/QuestionRepository";
import QuestionId from "@/domain/course/question/value-objects/QuestionId";

export class DeleteQuestion {
  constructor(private repository: QuestionRepository) {}

  async run(questionId: QuestionId): Promise<void> {
    return await this.repository.deleteQuestion(questionId);
  }
}
