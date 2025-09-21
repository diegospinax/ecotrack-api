import LessonDescription from "@/domain/course/lesson/value-objects/LessonDescription";
import LessonId from "@/domain/course/lesson/value-objects/LessonId";
import LessonIsActive from "@/domain/course/lesson/value-objects/LessonIsActive";
import LessonTitle from "@/domain/course/lesson/value-objects/LessonTitle";
import LessonType from "@/domain/course/lesson/value-objects/LessonType";
import { UpdateQuestionDto } from "./question/UpdateQuestionDto";

export class UpdateLessonDto {
    constructor(
        public readonly id: LessonId,
        public readonly title?: LessonTitle,
        public readonly description?: LessonDescription,
        public readonly type?: LessonType,
        public readonly isActive?: LessonIsActive,
        public readonly questions?: UpdateQuestionDto[],
    ) { }
}