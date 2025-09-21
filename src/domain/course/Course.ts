import { Person } from "../person/Person";
import { Lesson } from "./lesson/Lesson";
import { CourseId } from "./value-objects/CourseId";
import { CourseIsFinished } from "./value-objects/CourseIsFinished";

export interface Course{
    id: CourseId;
    person: Person;
    lesson: Lesson;
    isFinished: CourseIsFinished;
}