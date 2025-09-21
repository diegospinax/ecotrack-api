import { Lesson } from "../Lesson";
import LessonId from "../value-objects/LessonId";

export interface LessonRepository {
    create(lesson: Omit<Lesson, "id">): Promise<Lesson>;
    findById(lessonId: LessonId): Promise<Lesson | null>;
    findAll(): Promise<Lesson[]>;
    update(lesson: Lesson): Promise<void>;
    delete(lessonId: LessonId): Promise<void>;
}