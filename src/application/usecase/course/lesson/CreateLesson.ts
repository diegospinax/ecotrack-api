import { Lesson } from "@/domain/course/lesson/Lesson";
import { LessonRepository } from "@/domain/course/lesson/ports/LessonRepository";
import { LessonTypeEnum } from "@/domain/course/lesson/LessonTypeEnum";
import LessonDescription from "@/domain/course/lesson/value-objects/LessonDescription";
import LessonId from "@/domain/course/lesson/value-objects/LessonId";
import LessonTitle from "@/domain/course/lesson/value-objects/LessonTitle";
import LessonType from "@/domain/course/lesson/value-objects/LessonType";

export class CreateLesson {
  constructor(private repository: LessonRepository) {}

  async run(lesson: Lesson): Promise<Lesson> {
    return await this.repository.createLesson(lesson);
  }
}
