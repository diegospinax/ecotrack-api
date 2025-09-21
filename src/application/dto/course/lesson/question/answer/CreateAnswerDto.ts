import AnswerIsCorrect from "@/domain/course/answer/value-objects/AnswerIsCorrect";
import AnswerText from "@/domain/course/answer/value-objects/AnswerText";

export class CreateAnswerDto {
    constructor(
        public readonly text: AnswerText,
        public readonly isCorrect: AnswerIsCorrect
    ) { }
}