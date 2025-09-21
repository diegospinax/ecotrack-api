import QuestionText from "@/domain/course/question/value-objects/QuestionText";
import { UpdateAnswerDto } from "./answer/UpdateAnswerDto";
import QuestionId from "@/domain/course/question/value-objects/QuestionId";

export class UpdateQuestionDto {
    constructor(
        public readonly id: QuestionId,
        public readonly question?: QuestionText,
        public readonly answers?: UpdateAnswerDto[]
    ) { }
}