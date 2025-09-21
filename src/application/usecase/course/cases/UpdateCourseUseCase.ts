import { CourseId } from "@/domain/course/value-objects/CourseId";

export interface UpdateCourseUseCase {
    updateStateToFinished(courseId: CourseId): Promise<void>;
}