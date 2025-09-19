import { Answer } from "@/domain/course/answer/Answer";
import { AnswerRepository } from "@/domain/course/answer/ports/AnswerRepository";

export class CreateAnswer {
  constructor(private repository: AnswerRepository) {}

  async run(asnwer: Answer): Promise<Answer> {
    return await this.repository.createAnswer(asnwer);
  }
}
