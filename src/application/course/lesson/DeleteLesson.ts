import { LessonRepository } from "@/domain/course/lesson/ports/lessonRepository";
import LessonId from "@/domain/course/lesson/value-objects/LessonId";

export class DeleteLesson {
  constructor(private repository: LessonRepository) {}

  async run(id: number): Promise<void> {
    await this.repository.deleteLesson(new LessonId(id));
  }
}
