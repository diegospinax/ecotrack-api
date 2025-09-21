import { Course } from "@/domain/course/Course";
import LessonId from "@/domain/course/lesson/value-objects/LessonId";
import PersonId from "@/domain/person/value-objects/PersonId";

export interface FindCourseUseCase {
    findAll(): Promise<Course[]>;
    findAllByPersonId(personId: PersonId): Promise<Course[]>;
    findAllByLessonId(lessonId: LessonId): Promise<Course[]>;
}