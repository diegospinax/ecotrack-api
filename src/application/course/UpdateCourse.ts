import { Course } from "@/domain/course/Course";
import { CourseRepository } from "@/domain/course/ports/CourseRepository";

export class UpdateCourse {
    constructor(private repository: CourseRepository) { }

    async run(course: Course): Promise<void> {
        return await this.repository.updateCourse(course);
    }
}