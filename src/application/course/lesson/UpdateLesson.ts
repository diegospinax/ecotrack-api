import { Lesson } from "@/domain/course/lesson/Lesson";
import { LessonRepository } from "@/domain/course/lesson/ports/lessonRepository";

export class UpdateLesson {
  constructor(private repository: LessonRepository) {}

  async run(lesson: Lesson): Promise<void> {
    return await this.repository.updateLesson(lesson);
  }
}
