import { Answer } from "@/domain/course/answer/Answer";
import { AnswerRepository } from "@/domain/course/answer/ports/AnswerRepository";

export class UpdateAnswer {
  constructor(private repository: AnswerRepository) {}

  async run(answer: Answer): Promise<void> {
    return await this.repository.updateAnswer(answer);
  }
}
