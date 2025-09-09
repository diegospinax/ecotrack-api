import { Lesson } from '../lesson';
import LessonId from '../value-objects/LessonId';

export interface LessonRepository{
    createLesson(lesson :Lesson) : Promise<Lesson>;
    findById(lessonId : LessonId):Promise<Lesson>;
    updateLesson(lesson: Lesson): Promise<void>;
    deleteLesson(lessonId :LessonId):Promise<void>;
}