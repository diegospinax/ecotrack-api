import { CreateLessonDto } from "@/application/dto/course/lesson/CreateLessonDto";
import { Lesson } from "@/domain/course/lesson/Lesson";

export interface CreateLessonUseCase {
  create(lessonDto: CreateLessonDto): Promise<Lesson>
}

