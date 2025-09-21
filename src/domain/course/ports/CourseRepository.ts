import PersonId from "@/domain/person/value-objects/PersonId";
import { Course } from "../Course";
import { CourseId } from "../value-objects/CourseId";

export interface CourseRepository {
    create(course: Omit<Course, "id">): Promise<Course>;
    findAll(): Promise<Course[]>
    findById(courseId: CourseId): Promise<Course>;
    findAllByPersonId(personId: PersonId): Promise<Course[]>
    findByPersonIdAndLessonId(personId: PersonId): Promise<Course | null>
    updateStateToFinished(courseId: CourseId): Promise<void>
}
