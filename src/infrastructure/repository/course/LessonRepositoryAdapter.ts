import { LessonRepository } from "@/domain/course/lesson/ports/LessonRepository";
import { Repository } from "typeorm";
import { Lesson } from "@/domain/course/lesson/Lesson";
import LessonId from "@/domain/course/lesson/value-objects/LessonId";
import LessonTitle from "@/domain/course/lesson/value-objects/LessonTitle";
import LessonDescription from "@/domain/course/lesson/value-objects/LessonDescription";
import LessonType from "@/domain/course/lesson/value-objects/LessonType";
import { LessonEntity } from "@/infrastructure/entities/course/LessonEntity";
import { AppDataSource } from "@/infrastructure/config/database.postgres";

export class LessonRepositoryAdapter implements LessonRepository {
    private lessonRepository: Repository<LessonEntity>

    constructor() {
        this.lessonRepository = AppDataSource.getRepository(LessonEntity);
    }

    async createLesson(lesson: Lesson): Promise<Lesson> {
        try {
            const newLesson = await this.toEntity(lesson);
            const savedLesson = await this.lessonRepository.save(newLesson);
            return this.toDomain(savedLesson);

        } catch (error) {

            console.error("Error creating lesson: ", error);
            throw new Error("Error creating lesson");

        }
    }


    async findById(lessonId: LessonId): Promise<Lesson> {
        try {

            const lesson = await this.lessonRepository.findOne({
                where: { id_lesson: lessonId.value },
            });

            if (!lesson) {
                throw new Error("Lesson not found");
            }

            return this.toDomain(lesson);

        } catch (error) {

            console.error("Error fetching lesson by id: ", error);
            throw new Error("Error fetching lesson by id");
        }
    }


    async updateLesson(lesson: Lesson): Promise<void> {
        try {

            const lessonUpdate = await this.toEntity(lesson);
            await this.lessonRepository.update(lessonUpdate.id_lesson, lessonUpdate);

        } catch (error) {

            console.error("Error updating lesson: ", error);
            throw new Error("Error updating lesson");

        }
    }

    async deleteLesson(lessonId: LessonId): Promise<void> {
        try {

            const result = await this.lessonRepository.delete(lessonId.value);

            if (result.affected === 0) {
                throw new Error("Lesson not found");
            }

        } catch (error) {

            console.error("Error deleting lesson: ", error);
            throw new Error("Error deleting lesson");

        }
    }

    private toDomain(lesson: LessonEntity): Lesson {
        return {
            id: new LessonId(lesson.id_lesson),
            title: new LessonTitle(lesson.title_lesson),
            description: new LessonDescription(lesson.description_lesson),
            type: new LessonType(lesson.type_lesson),

        }
    }

    private async toEntity(lesson: Lesson): Promise<LessonEntity> {
        const lessonEntity = new LessonEntity();
        lessonEntity.title_lesson = lesson.title.value;
        lessonEntity.description_lesson = lesson.description.value;
        lessonEntity.type_lesson = lesson.type.value;
        return lessonEntity;

    }

}