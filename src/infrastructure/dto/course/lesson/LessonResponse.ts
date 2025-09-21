import { LessonTypeEnum } from "@/domain/course/lesson/LessonTypeEnum";
import { QuestionResponse } from "./question/QuestionResponse";

export class LessonResponse {
  constructor(
    public readonly id: number,
    public readonly title: string,
    public readonly description: string,
    public readonly type: LessonTypeEnum,
    public readonly isActive: boolean,
    public readonly questions: QuestionResponse[],
  ) {}
}
