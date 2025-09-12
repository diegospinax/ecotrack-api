import { QuestionRepository } from "@/domain/course/question/ports/QuestionRepository";
import { Question } from "@/domain/course/question/Questions";

export class UpdateQuestion{
    constructor(private repository: QuestionRepository){};

    async run(question: Question):Promise<void>{
        return await this.repository.updateQuestion(question);
    }
}