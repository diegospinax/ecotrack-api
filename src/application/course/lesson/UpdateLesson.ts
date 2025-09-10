import { Lesson } from "@/domain/course/lesson/Lesson";
import { LessonRepository } from "@/domain/course/lesson/ports/lessonRepository";
import { Type } from "@/domain/course/lesson/Type";
import LessonDescription from "@/domain/course/lesson/value-objects/LessonDescription";
import LessonId from "@/domain/course/lesson/value-objects/LessonId";
import LessonTitle from "@/domain/course/lesson/value-objects/LessonTitle";
import LessonType from "@/domain/course/lesson/value-objects/LessonType";

export class UpdateLesson {
  constructor(private repository: LessonRepository) {}

  async run(
    id: number,
    title: string,
    description: string,
    type: Type
  ): Promise<void> {
    const lesson: Lesson = {
      id: new LessonId(id),
      title: new LessonTitle(title),
      description: new LessonDescription(description),
      type: new LessonType(type),
    };
    return this.repository.updateLesson(lesson);
  }
}
