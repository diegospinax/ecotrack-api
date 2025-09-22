import { Lesson } from "@/domain/course/lesson/Lesson";
import { LessonRepository } from "@/domain/course/lesson/ports/LessonRepository";
import LessonId from "@/domain/course/lesson/value-objects/LessonId";
import LessonType from "@/domain/course/lesson/value-objects/LessonType";
import { AppDataSource } from "@/infrastructure/config/database.postgres";
import { AnswerEntity } from "@/infrastructure/entities/course/AnswerEntity";
import { LessonEntity } from "@/infrastructure/entities/course/LessonEntity";
import { QuestionEntity } from "@/infrastructure/entities/course/QuestionEntity";
import { mapEntityToLessonDomain } from "@/infrastructure/mapper/out/lesson-out-mapper";
import { DataSource, Repository } from "typeorm";

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
            });

            const savedLesson = await entityManager.save(LessonEntity, lessonEntity);

            const questionEntities: QuestionEntity[] = lesson.questions.map(question => entityManager.create(QuestionEntity, {
                question: question.text.value,
                lesson: savedLesson,
                answers: 
                    question.answers.map(answer => entityManager.create(AnswerEntity, {
                        answer: answer.text.value,
                        isCorrect: answer.isCorrect.value
                    }))
            }));

            savedLesson.questions = await entityManager.save(QuestionEntity, questionEntities);

            return mapEntityToLessonDomain(savedLesson);
        });
    }

    public async findAll(): Promise<Lesson[]> {
        const entities = await this.lessonRepository.createQueryBuilder("lesson")
            .leftJoinAndSelect("lesson.questions", "question")
            .leftJoinAndSelect("question.answers", "answer")
            .where("lesson.isActive = :isActive", { isActive: true })
            .getMany();
        return entities.map(mapEntityToLessonDomain);
    }

    public async findById(lessonId: LessonId): Promise<Lesson | null> {
        const entity = await this.lessonRepository.createQueryBuilder("lesson")
            .leftJoinAndSelect("lesson.questions", "question")
            .leftJoinAndSelect("question.answers", "answer")
            .where("lesson.id = :id", { id: lessonId.value })
            .getOne();
        return entity ? mapEntityToLessonDomain(entity) : null;
    }

    public async findAllByType(lessonType: LessonType): Promise<Lesson[]> {
        const entities = await this.lessonRepository.createQueryBuilder("lesson")
            .leftJoinAndSelect("lesson.questions", "question")
            .leftJoinAndSelect("question.answers", "answer")
            .where("lesson.type = :type", { type: lessonType.value })
            .andWhere("lesson.isActive = :isActive", { isActive: true })
            .getMany();
        return entities.map(mapEntityToLessonDomain);
    }

    public async update(lesson: Lesson): Promise<void> {
        return this.datasource.transaction(async (entityManager) => {
            const lessonEntity = entityManager.create(LessonEntity, {
                id: lesson.id.value,
                title: lesson.title.value,
                description: lesson.description.value,
                type: lesson.type.value,
                isActive: lesson.isActive.value,
            });

            const savedLesson = await entityManager.save(LessonEntity, lessonEntity);

            const questionEntities: QuestionEntity[] = lesson.questions.map(question => entityManager.create(QuestionEntity, {
                id: question.id!.value,
                question: question.text.value,
                lesson: savedLesson,
                answers: 
                    question.answers.map(answer => entityManager.create(AnswerEntity, {
                        id: answer.id!.value,
                        answer: answer.text.value,
                        isCorrect: answer.isCorrect.value
                    }))
                
            }));

            await entityManager.save(QuestionEntity, questionEntities);
        });
    }

    public async delete(lessonId: LessonId): Promise<void> {
        await this.lessonRepository
            .createQueryBuilder("lesson")
            .update({ isActive: false })
            .where("id = :lessonId", { lessonId: lessonId.value })
            .execute();
    }
}