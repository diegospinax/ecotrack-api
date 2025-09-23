
import { EcoCategoryEnum } from "@/domain/EcoCategoryEnum";
import { QuestionResponse } from "./question/QuestionResponse";

export class LessonResponse {
  constructor(
    public readonly id: number,
    public readonly title: string,
    public readonly description: string,
    public readonly type: EcoCategoryEnum,
    public readonly isActive: boolean,
    public readonly questions: QuestionResponse[],
  ) {}
}
