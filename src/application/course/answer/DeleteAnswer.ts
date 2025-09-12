import { AnswerRepository } from "@/domain/course/answer/ports/AnswerRepository";
import AnswerId from "@/domain/course/answer/value-objects/AnswerId";

export class DeleteAnswer {
  constructor(private repository: AnswerRepository) {}

  async run(answerId: AnswerId): Promise<void> {
    return await this.repository.deleteAnswer(answerId);
  }
}
