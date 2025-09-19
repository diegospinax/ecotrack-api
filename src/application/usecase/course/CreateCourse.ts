import { Course } from "@/domain/course/Course";
import { CourseRepository } from "@/domain/course/ports/CourseRepository";

export class CreateCourse {
    constructor(private repository: CourseRepository) { }

    async run(course: Course): Promise<Course> {
        return await this.repository.createCourse(course);
    }

} 