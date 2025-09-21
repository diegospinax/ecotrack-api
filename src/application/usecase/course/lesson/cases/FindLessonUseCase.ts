import { Lesson } from "@/domain/course/lesson/Lesson";
import LessonId from "@/domain/course/lesson/value-objects/LessonId";
import LessonType from "@/domain/course/lesson/value-objects/LessonType";

export interface FindLessonUseCase {
    findAll(): Promise<Lesson[]>;
    findById(lessonId: LessonId): Promise<Lesson>;
    findAllByType(lessonType: LessonType): Promise<Lesson[]>;
}