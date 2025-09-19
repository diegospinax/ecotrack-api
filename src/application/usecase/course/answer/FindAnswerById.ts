import { Answer } from "@/domain/course/answer/Answer";
import { AnswerRepository } from "@/domain/course/answer/ports/AnswerRepository";
import AnswerId from "@/domain/course/answer/value-objects/AnswerId";

export class FindAnswerById {
  constructor(private repository: AnswerRepository) {}

  async run(answerId: AnswerId): Promise<Answer> {
    return await this.repository.findById(answerId);
  }
}
