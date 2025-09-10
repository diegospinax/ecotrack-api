import { LessonRepository } from "@/domain/course/lesson/ports/lessonRepository";
import { Lesson } from "./../../../domain/course/lesson/Lesson";
import LessonId from "@/domain/course/lesson/value-objects/LessonId";

export class LessonFindById {
  constructor(private repository: LessonRepository) {}

  async run(id: number): Promise<Lesson> {
    return this.repository.findById(new LessonId(id));
  }
}
