import LessonId from "@/domain/course/lesson/value-objects/LessonId";
import PersonId from "@/domain/person/value-objects/PersonId";

export class CreateCourseDto {
    constructor(
        public readonly personId: PersonId,
        public readonly lessonId: LessonId,
    ) {}
}