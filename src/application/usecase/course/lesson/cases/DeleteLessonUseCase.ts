import LessonId from "@/domain/course/lesson/value-objects/LessonId";

export interface DeleteLessonUseCase {
  delete(lessonId: LessonId): Promise<void>
}

