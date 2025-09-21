import AnswerId from "@/domain/course/answer/value-objects/AnswerId";
import AnswerIsCorrect from "@/domain/course/answer/value-objects/AnswerIsCorrect";
import AnswerText from "@/domain/course/answer/value-objects/AnswerText";

export class UpdateAnswerDto {
    constructor(
        public readonly id: AnswerId,
        public readonly text?: AnswerText,
        public readonly isCorrect?: AnswerIsCorrect
    ) { }
}