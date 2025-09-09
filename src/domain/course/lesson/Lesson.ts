import LessonDescription from "./value-objects/LessonDescription";
import LessonId from "./value-objects/LessonId";
import LessonTitle from "./value-objects/LessonTitle";
import LessonType from "./value-objects/LessonType";

export interface Lesson {
    id: LessonId;
    title: LessonTitle;
    description: LessonDescription;
    type: LessonType;
}