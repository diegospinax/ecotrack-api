import { CreateCourseDto } from "@/application/dto/course/CreateCourseDto";
import { Course } from "@/domain/course/Course";

export interface CreateCourseUseCase {
    create(courseDto: CreateCourseDto): Promise<Course>;
}