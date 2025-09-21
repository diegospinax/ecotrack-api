import LessonDescription from "@/domain/course/lesson/value-objects/LessonDescription";
import LessonTitle from "@/domain/course/lesson/value-objects/LessonTitle";
import LessonType from "@/domain/course/lesson/value-objects/LessonType";
import { CreateQuestionDto } from "./question/CreateQuestionDto";

export class CreateLessonDto {
    constructor(
        public readonly title: LessonTitle,
        public readonly description: LessonDescription,
        public readonly type: LessonType,
        public readonly questions: CreateQuestionDto[],
    ) { }
}