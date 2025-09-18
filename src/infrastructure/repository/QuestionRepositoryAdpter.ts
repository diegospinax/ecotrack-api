import { QuestionRepository } from "@/domain/course/question/ports/QuestionRepository";
import { QuestionEntity } from "../entities/QuestionEntity";
import { AppDataSource } from "../config/database.postgres";
import { Repository } from "typeorm";
import { Question } from "@/domain/course/question/Questions";
import QuestionId from "@/domain/course/question/value-objects/QuestionId";
import QuestionText from "@/domain/course/question/value-objects/QuestionText";
import LessonId from "@/domain/course/lesson/value-objects/LessonId";

export class QuestionRepositoryAdpter implements QuestionRepository {
    private questionRepository: Repository<QuestionEntity>

    constructor() {
        this.questionRepository = AppDataSource.getRepository(QuestionEntity);
    }

    async createQuestion(question: Question): Promise<Question> {
        try {
            const newQuestion = await this.toEntity(question);
            const savedQuestion = await this.questionRepository.save(newQuestion);
            return this.toDomain(savedQuestion);

        } catch (error) {

            console.error("Errror creating question", error);
            throw new Error("Error creating question");


        }
    }


    async findById(questionId: QuestionId): Promise<Question> {
        try {
            const question = await this.questionRepository.findOne({
                where: { id_question: questionId.value },

            });

            if (!question) {
                throw new Error("Question not found")
            }

            return this.toDomain(question);

        } catch (error) {

            console.error("Error fetching question by id: ", error);
            throw new Error("Error fetching question by id");

        }
    }

    async updateQuestion(question: Question): Promise<void> {
        try {
            const questionUpdate = await this.toEntity(question);
            await this.questionRepository.update(questionUpdate.id_question, questionUpdate);

        } catch (error) {

            console.error("Error update question: ", error);
            throw new Error("Error update question");

        }
    }

    async deleteQuestion(questionId: QuestionId): Promise<void> {
        try {
            const result = await this.questionRepository.delete(questionId.value);

            if (result.affected === 0) {
                throw new Error("Question not found");
            }

        } catch (error) {

            console.error("Error deleting question: ", error);
            throw new Error("Error deleting question");

        }
    }

    private toDomain(question: QuestionEntity): Question {
        return {
            id: new QuestionId(question.id_question),
            question: new QuestionText(question.text_question),
            lessonId: new LessonId(question.id_lesson),
        }
    }

    private async toEntity(question: Question): Promise<QuestionEntity> {
        const questionEntity = new QuestionEntity();
        questionEntity.text_question = question.question.value;
        questionEntity.id_lesson = question.lessonId.value;
        return questionEntity;
    }
}