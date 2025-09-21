import { LessonRepository } from "@/domain/course/lesson/ports/LessonRepository";
import { DataSource, Repository } from "typeorm";
import { Lesson } from "@/domain/course/lesson/Lesson";
import LessonId from "@/domain/course/lesson/value-objects/LessonId";
import LessonTitle from "@/domain/course/lesson/value-objects/LessonTitle";
import LessonDescription from "@/domain/course/lesson/value-objects/LessonDescription";
import LessonType from "@/domain/course/lesson/value-objects/LessonType";
import { LessonEntity } from "@/infrastructure/entities/course/LessonEntity";
import { AppDataSource } from "@/infrastructure/config/database.postgres";
import { QuestionEntity } from "@/infrastructure/entities/course/QuestionEntity";
import { AnswerEntity } from "@/infrastructure/entities/course/AnswerEntity";
import { mapEntityToLessonDomain } from "@/infrastructure/mapper/out/lesson-out-mapper";

export class LessonRepositoryAdapter implements LessonRepository {
    private lessonRepository: Repository<LessonEntity>

    constructor(private datasource: DataSource) {
        this.lessonRepository = AppDataSource.getRepository(LessonEntity);
    }

    public async create(lesson: Omit<Lesson, "id">): Promise<Lesson> {
        return this.datasource.transaction(async (entityManager) => {
            const lessonEntity = entityManager.create(LessonEntity, {
                title: lesson.title.value,
                description: lesson.description.value,
                type: lesson.type.value,
                isActive: lesson.isActive.value,
                questions: lesson.questions.map(question => entityManager.create(QuestionEntity, {
                    question: question.text.value,
                    answers: question.answers.map(answer => entityManager.create(AnswerEntity, {
                        answer: answer.text.value,
                        isCorrect: answer.isCorrect.value
                    }))
                }))
            });

            const savedLesson = await entityManager.save(LessonEntity, lessonEntity);

            return mapEntityToLessonDomain(savedLesson);
        });
    }

    public async findAll(): Promise<Lesson[]> {
        const entities = await this.lessonRepository.find({
            where: {
                isActive: true
            }
        });
        return entities.map(mapEntityToLessonDomain);
    }

    public async findById(lessonId: LessonId): Promise<Lesson> {
        const entity = await this.lessonRepository.findOneByOrFail({
            id: lessonId.value
        });
        return mapEntityToLessonDomain(entity);
    }


    public async update(lesson: Lesson): Promise<void> {
        return this.datasource.transaction(async (entityManager) => {
            const lessonEntity = entityManager.create(LessonEntity, {
                title: lesson.title.value,
                description: lesson.description.value,
                type: lesson.type.value,
                isActive: lesson.isActive.value,
                questions: lesson.questions.map(question => entityManager.create(QuestionEntity, {
                    question: question.text.value,
                    answers: question.answers.map(answer => entityManager.create(AnswerEntity, {
                        answer: answer.text.value,
                        isCorrect: answer.isCorrect.value
                    }))
                }))
            });

            await entityManager.save(LessonEntity, lessonEntity);
        });
    }

    public async delete(lessonId: LessonId): Promise<void> {
        await this.lessonRepository
            .createQueryBuilder("lesson")
            .update({ isActive: false })
            .where("id = :lessonId", {lessonId: lessonId.value})
            .execute();
    }
}