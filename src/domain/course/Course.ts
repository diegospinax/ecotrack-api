import PersonId from "../person/value-objects/PersonId";
import LessonId from "./lesson/value-objects/LessonId";
import { CourseId } from "./value-objects/CourseId";
import { CourseStatus } from "./value-objects/CourseStatus";

export interface Course{
    id: CourseId;
    personId: PersonId;
    lessonId: LessonId;
    status: CourseStatus;
}