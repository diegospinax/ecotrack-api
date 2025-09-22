import { LessonTypeEnum } from "@/domain/course/lesson/LessonTypeEnum";
import { CreateQuestionRequest, QuestionRequest, UpdateQuestionRequest } from "./question/QuestionRequest";

export class LessonRequest {
    constructor(
        public readonly id: number,
        public readonly title: string,
        public readonly description: string,
        public readonly type: LessonTypeEnum,
        public readonly questions: QuestionRequest[],
    ) { }
}

export type CreateLessonRequest = Omit<LessonRequest, 'id' | 'questions'> & {
    questions: CreateQuestionRequest[];
};

export type UpdateLessonRequest = Partial<Omit<CreateLessonRequest, 'questions'>> & {
    id: number,
    isActive?: boolean,
    questions?: UpdateQuestionRequest[]
};


