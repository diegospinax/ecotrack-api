import { Lesson } from "@/domain/course/lesson/Lesson";
import LessonId from "@/domain/course/lesson/value-objects/LessonId";

export interface FindLessonUseCase {
    findAll(): Promise<Lesson[]>;
    findById(lessonId: LessonId): Promise<Lesson>;
}