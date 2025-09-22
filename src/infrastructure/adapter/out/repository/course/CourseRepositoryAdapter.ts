import { Course } from "@/domain/course/Course";
import LessonId from "@/domain/course/lesson/value-objects/LessonId";
import { CourseRepository } from "@/domain/course/ports/CourseRepository";
import { CourseId } from "@/domain/course/value-objects/CourseId";
import PersonId from "@/domain/person/value-objects/PersonId";
import { AppDataSource } from "@/infrastructure/config/database.postgres";
import { CourseEntity } from "@/infrastructure/entities/course/CourseEntity";
import { mapEntityToCourseDomain } from "@/infrastructure/mapper/out/course-out-mapper";
import { mapLessonDomainToEntity } from "@/infrastructure/mapper/out/lesson-out-mapper";
import { mapPersonDomainToEntity } from "@/infrastructure/mapper/out/person-out-mapper";
import { Repository } from "typeorm";

export class CourseRepositoryAdapter implements CourseRepository {
    private courseRepository: Repository<CourseEntity>

    constructor() {
        this.courseRepository = AppDataSource.getRepository(CourseEntity);
    }

    public async create(course: Omit<Course, "id">): Promise<Course> {
        const entity = this.courseRepository.create({
            person: mapPersonDomainToEntity(course.person),
            lesson: mapLessonDomainToEntity(course.lesson),
            isFinished: course.isFinished.value
        });

        const savedCourse = await this.courseRepository.save(entity);

        return mapEntityToCourseDomain(savedCourse);
    }

    public async findAll(): Promise<Course[]> {
        const entities = await this.courseRepository.createQueryBuilder("course")
            .leftJoinAndSelect("course.person", "person")
            .leftJoinAndSelect("course.lesson", "lesson")
            .leftJoinAndSelect("lesson.questions", "question")
            .leftJoinAndSelect("question.answers", "answer")
            .where("person.isActive = :personActive", { personActive: true })
            .andWhere("lesson.isActive = :lessonActive", { lessonActive: true })
            .getMany();

        return entities.map(mapEntityToCourseDomain);
    }

    public async findById(courseId: CourseId): Promise<Course | null> {
        const entity = await this.courseRepository.createQueryBuilder("course")
            .leftJoinAndSelect("course.person", "person")
            .leftJoinAndSelect("course.lesson", "lesson")
            .leftJoinAndSelect("lesson.questions", "question")
            .leftJoinAndSelect("question.answers", "answer")
            .where("course.id = :id", { id: courseId.value })
            .getOne();

        return entity ? mapEntityToCourseDomain(entity) : null;
    }

    public async findAllByPersonId(personId: PersonId): Promise<Course[]> {
        const entities = await this.courseRepository.createQueryBuilder("course")
            .leftJoinAndSelect("course.person", "person")
            .leftJoinAndSelect("course.lesson", "lesson")
            .leftJoinAndSelect("lesson.questions", "question")
            .leftJoinAndSelect("question.answers", "answer")
            .where("person.id = :personId")
            .andWhere("person.isActive = :personActive")
            .andWhere("lesson.isActive = :lessonActive")
            .setParameters({ personId: personId.value, personActive: true, lessonActive: true })
            .getMany();

        return entities.map(mapEntityToCourseDomain);
    }

    public async findAllByLessonId(lessonId: LessonId): Promise<Course[]> {
        const entities = await this.courseRepository.createQueryBuilder("course")
            .leftJoinAndSelect("course.person", "person")
            .leftJoinAndSelect("course.lesson", "lesson")
            .leftJoinAndSelect("lesson.questions", "question")
            .leftJoinAndSelect("question.answers", "answer")
            .where("lesson.id = :lessonId")
            .andWhere("person.isActive = :personActive")
            .andWhere("lesson.isActive = :lessonActive")
            .setParameters({ lessonId: lessonId.value, personActive: true, lessonActive: true })
            .getMany();

        return entities.map(mapEntityToCourseDomain);
    }

    public async findByPersonIdAndLessonId(personId: PersonId, lessonId: LessonId): Promise<Course | null> {
        const entity = await this.courseRepository.createQueryBuilder("course")
            .leftJoinAndSelect("course.person", "person")
            .leftJoinAndSelect("course.lesson", "lesson")
            .leftJoinAndSelect("lesson.questions", "question")
            .leftJoinAndSelect("question.answers", "answer")
            .where("person.id = :personId", { personId: personId.value })
            .andWhere("lesson.id = :lessonId", { lessonId: lessonId.value })
            .getOne();

        return entity ? mapEntityToCourseDomain(entity) : null;
    }

    public async updateStateToFinished(courseId: CourseId): Promise<void> {
        await this.courseRepository.createQueryBuilder("course")
            .update({ isFinished: true })
            .where("id = :id", { id: courseId.value })
            .execute();
    }
}
