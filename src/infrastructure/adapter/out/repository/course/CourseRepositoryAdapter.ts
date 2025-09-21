import { Course } from "@/domain/course/Course";
import LessonId from "@/domain/course/lesson/value-objects/LessonId";
import { CourseRepository } from "@/domain/course/ports/CourseRepository";
import { CourseId } from "@/domain/course/value-objects/CourseId";
import PersonId from "@/domain/person/value-objects/PersonId";
import { AppDataSource } from "@/infrastructure/config/database.postgres";
import { CourseEntity } from "@/infrastructure/entities/course/CourseEntity";
import { Repository } from "typeorm";

export class CourseRepositoryAdapter implements CourseRepository {
    private courseRepository: Repository<CourseEntity>

    constructor() {
        this.courseRepository = AppDataSource.getRepository(CourseEntity);
    }

    public async create(course: Omit<Course, "id">): Promise<Course> {
        throw new Error("Method not implemented.");
    }

    public async findAll(): Promise<Course[]> {
        throw new Error("Method not implemented.");
    }

    public async findById(courseId: CourseId): Promise<Course> {
        throw new Error("Method not implemented.");
    }

    public async findAllByPersonId(personId: PersonId): Promise<Course[]> {
        throw new Error("Method not implemented.");
    }

    public async findAllByLessonId(lessonId: LessonId): Promise<Course[]> {
        throw new Error("Method not implemented.");
    }

    public async findByPersonIdAndLessonId(personId: PersonId): Promise<Course | null> {
        throw new Error("Method not implemented.");
    }

    public async updateStateToFinished(courseId: CourseId): Promise<void> {
        throw new Error("Method not implemented.");
    }
}
