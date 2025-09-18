import PersonId from "../person/value-objects/PersonId";
import LessonId from "./lesson/value-objects/LessonId";
import { CourseId } from "./value-objects/CourseId";
import { CourseIsFinished } from "./value-objects/CourseIsFinished";

export interface Course{
    id: CourseId;
    personId: PersonId;
    lessonId: LessonId;
    isFinished: CourseIsFinished;
}