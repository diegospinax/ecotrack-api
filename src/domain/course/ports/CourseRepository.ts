import PersonId from "@/domain/person/value-objects/PersonId";
import { Course } from "../Course";
import { CourseId } from "../value-objects/CourseId";
import LessonId from "../lesson/value-objects/LessonId";

export interface CourseRepository {
    create(course: Omit<Course, "id">): Promise<Course>;
    findAll(): Promise<Course[]>
    findById(courseId: CourseId): Promise<Course | null>;
    findAllByPersonId(personId: PersonId): Promise<Course[]>;
    findAllByLessonId(lessonId: LessonId): Promise<Course[]>;
    findByPersonIdAndLessonId(personId: PersonId, lessonId: LessonId): Promise<Course | null>;
    updateStateToFinished(courseId: CourseId): Promise<void>;
}
