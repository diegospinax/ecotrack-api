import { UpdateLessonDto } from "@/application/dto/course/lesson/UpdateLessonDto";

export interface UpdateLessonUseCase {
  update(lessonDto: UpdateLessonDto): Promise<void>
}


