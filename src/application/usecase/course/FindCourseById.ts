import { Course } from "@/domain/course/Course";
import { CourseRepository } from "@/domain/course/ports/CourseRepository";
import { CourseId } from "@/domain/course/value-objects/CourseId";

export class FindCourseById {
    constructor(private repository: CourseRepository) { }

    async run(courseId: CourseId): Promise<Course> {
        return await this.repository.findById(courseId);
    }
}