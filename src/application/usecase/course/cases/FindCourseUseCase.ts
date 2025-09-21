import { Course } from "@/domain/course/Course";
import PersonId from "@/domain/person/value-objects/PersonId";

export interface FindCourseUseCase {
    findAll(): Promise<Course[]>;
    findAllByPersonId(personId: PersonId): Promise<Course[]>;
}