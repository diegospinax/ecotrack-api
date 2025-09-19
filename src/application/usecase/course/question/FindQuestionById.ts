import { QuestionRepository } from "@/domain/course/question/ports/QuestionRepository";
import { Question } from "@/domain/course/question/Questions";
import QuestionId from "@/domain/course/question/value-objects/QuestionId";

export class FindQuestionById {
    constructor(private repository: QuestionRepository){};

    async run(questionId: QuestionId):Promise<Question>{
        return await this.repository.findById(questionId);
    }
}