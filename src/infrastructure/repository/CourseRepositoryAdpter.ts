import { Course } from "@/domain/course/Course";
import { CourseEntity } from "../entities/CourseEntity";
import { Repository } from "typeorm";
import { CourseRepository } from "@/domain/course/ports/CourseRepository";
import { AppDataSource } from "../config/database.postgres";
import { CourseId } from "@/domain/course/value-objects/CourseId";
import PersonId from "@/domain/person/value-objects/PersonId";
import LessonId from "@/domain/course/lesson/value-objects/LessonId";
import { CourseStatus } from "@/domain/course/value-objects/CourseStatus";

export class CourseRepositoryAdpter implements CourseRepository {
    private courseRepository: Repository<CourseEntity>

    constructor() {
        this.courseRepository = AppDataSource.getRepository(CourseEntity);
    }

    async createCourse(course: Course): Promise<Course> {
        try {
            const newCourse = await this.toEntity(course);
            const savedCourse = await this.courseRepository.save(newCourse);
            return this.toDomain(savedCourse);

        } catch (error) {

            console.error("Error creating course ", error);
            throw new Error("Error creating course");
        }
    }


    async findById(courseId: CourseId): Promise<Course> {
        try {
            const course = await this.courseRepository.findOne({
                where: { id_course: courseId.value },
            });

            if (!course) {
                throw new Error("Course not found");
            }

            return this.toDomain(course);

        } catch (error) {

            console.error("Error fetching course by id: ", error);
            throw new Error("Error fetching course by id");

        }
    }

    async updateCourse(course: Course): Promise<void> {
        try {

            const courseUpdate = await this.toEntity(course);
            await this.courseRepository.update(courseUpdate.id_course, courseUpdate);

        } catch (error) {

            console.error("Error updating course:", error);
            throw new Error("Error updating course");
        }
    }

    async deleteCourse(courseId: CourseId): Promise<void> {
        try {
            const result = await this.courseRepository.delete(courseId.value);

            if (result.affected === 0) {
                throw new Error("Course not found");
            }

        } catch (error) {

            console.error("Error deleting course:", error);
            throw new Error("Error deleting course");
        }
    }

    private toDomain(course: CourseEntity): Course {
        return {
            id: new CourseId(course.id_course),
            personId: new PersonId(course.id_Person),
            lessonId: new LessonId(course.id_lesson),
            status: new CourseStatus(course.status_course),
        };
    }

    private async toEntity(course: Course): Promise<CourseEntity> {
        const courseEntity = new CourseEntity();
        courseEntity.id_Person = course.personId.value;
        courseEntity.id_lesson = course.lessonId.value;
        courseEntity.status_course = course.status.value;
        return courseEntity;
    }

}
