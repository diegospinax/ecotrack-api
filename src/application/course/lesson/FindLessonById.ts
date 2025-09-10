import { LessonRepository } from "@/domain/course/lesson/ports/lessonRepository";
import { Lesson } from "./../../../domain/course/lesson/Lesson";
import LessonId from "@/domain/course/lesson/value-objects/LessonId";

export class FindLessonById {
  constructor(private repository: LessonRepository) {}

  async run(lessonId: LessonId): Promise<Lesson> {
    return await this.repository.findById(lessonId);
  }
}
