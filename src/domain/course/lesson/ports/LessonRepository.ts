import { Lesson } from "../Lesson";
import LessonId from "../value-objects/LessonId";
import LessonType from "../value-objects/LessonType";

export interface LessonRepository {
    create(lesson: Omit<Lesson, "id">): Promise<Lesson>;
    findAll(): Promise<Lesson[]>;
    findById(lessonId: LessonId): Promise<Lesson | null>;
    findAllByType(lessonType: LessonType): Promise<Lesson[]>
    update(lesson: Lesson): Promise<void>;
    delete(lessonId: LessonId): Promise<void>;
}