import { LessonRepository } from "@/domain/course/lesson/ports/LessonRepository";
import LessonId from "@/domain/course/lesson/value-objects/LessonId";

export class DeleteLesson {
  constructor(private repository: LessonRepository) {}

  async run(lessonId: LessonId): Promise<void> {
    await this.repository.deleteLesson(lessonId);
  }
}
