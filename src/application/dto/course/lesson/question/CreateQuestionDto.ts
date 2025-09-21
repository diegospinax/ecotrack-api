import QuestionText from "@/domain/course/question/value-objects/QuestionText";
import { CreateAnswerDto } from "./answer/CreateAnswerDto";

export class CreateQuestionDto {
    constructor(
        public readonly question: QuestionText,
        public readonly answers: CreateAnswerDto[]
    ) {}
}