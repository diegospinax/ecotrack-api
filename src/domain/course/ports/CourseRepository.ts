import { Course } from "../Course";
import { CourseId } from "../value-objects/CourseId";

export interface CourseRepository {
    createCourse(course: Course): Promise<Course>;
    findById(courseId: CourseId): Promise<Course>;
    updateCourse(course: Course): Promise<void>;
    deleteCourse(courseId: CourseId): Promise<void>;
}
