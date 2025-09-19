import LessonId from "@/domain/course/lesson/value-objects/LessonId";
import { QuestionRepository } from "@/domain/course/question/ports/QuestionRepository";
import { Question } from "@/domain/course/question/Questions";
import QuestionId from "@/domain/course/question/value-objects/QuestionId";
import QuestionText from "@/domain/course/question/value-objects/QuestionText";

export class CreateQuestion {
  constructor(private repository: QuestionRepository) {}

  async run(question: Question): Promise<Question> {
    return await this.repository.createQuestion(question);
  }
}
