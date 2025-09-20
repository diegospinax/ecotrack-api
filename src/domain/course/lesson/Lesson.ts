import { Course } from "../Course";
import { Question } from "../question/Questions";
import LessonDescription from "./value-objects/LessonDescription";
import LessonId from "./value-objects/LessonId";
import LessonIsActive from "./value-objects/LessonIsActive";
import LessonTitle from "./value-objects/LessonTitle";
import LessonType from "./value-objects/LessonType";

export interface Lesson {
    id: LessonId;
    title: LessonTitle;
    description: LessonDescription;
    type: LessonType;
    isActive: LessonIsActive;
    questions?: Question[];
    courses?: Course[];
}