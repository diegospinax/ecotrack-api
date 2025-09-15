import { CourseRepository } from "@/domain/course/ports/CourseRepository";
import { CourseId } from "@/domain/course/value-objects/CourseId";

export class DeleteCourse {
    constructor(private repository: CourseRepository) { }

    async run(courseId: CourseId): Promise<void> {
        return await this.repository.deleteCourse(courseId);
    }
}