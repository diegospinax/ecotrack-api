import { Answer } from "@/domain/course/answer/Answer";
import AnswerId from "@/domain/course/answer/value-objects/AnswerId";
import AnswerText from "@/domain/course/answer/value-objects/AnswerText";
import AnswerValidation from "@/domain/course/answer/value-objects/AnswerValidation";
import QuestionId from "@/domain/course/question/value-objects/QuestionId";
import { Repository } from "typeorm";
import { AnswerRepository } from "@/domain/course/answer/ports/AnswerRepository";
import { AppDataSource } from "@/infrastructure/config/database.postgres";
import { AnswerEntity } from "@/infrastructure/entities/course/AnswerEntity";

export class AnswerRepositoryAdapter implements AnswerRepository {
    private answerRepository: Repository<AnswerEntity>

    constructor() {
        this.answerRepository = AppDataSource.getRepository(AnswerEntity);
    }

    async createAnswer(answer: Answer): Promise<Answer> {
        try {
            const newAnswer = await this.toEntity(answer);
            const savedAnswer = await this.answerRepository.save(newAnswer);
            return this.toDomain(savedAnswer);

        } catch (error) {

            console.error("Error creating answer ", error);
            throw new Error("Error creating answer");
        }
    }


    async findById(answerId: AnswerId): Promise<Answer> {
        try {
            const answer = await this.answerRepository.findOne({
                where: { id_answer: answerId.value },
            });

            if (!answer) {
                throw new Error("Answer not found");
            }

            return this.toDomain(answer);

        } catch (error) {

            console.error("Error fetching answer by id: ", error);
            throw new Error("Error fetching answer by id");

        }
    }

    async updateAnswer(answer: Answer): Promise<void> {
        try {

            const answerUpdate = await this.toEntity(answer);
            await this.answerRepository.update(answerUpdate.id_answer, answerUpdate);

        } catch (error) {

            console.error("Error updating answer:", error);
            throw new Error("Error updating answer");
        }
    }

    async deleteAnswer(answerId: AnswerId): Promise<void> {
        try {
            const result = await this.answerRepository.delete(answerId.value);

            if (result.affected === 0) {
                throw new Error("Answer not found");
            }

        } catch (error) {

            console.error("Error deleting answer:", error);
            throw new Error("Error deleting answer");
        }
    }

    private toDomain(answer: AnswerEntity): Answer {
        return {
            id: new AnswerId(answer.id_answer),
            text: new AnswerText(answer.text_answer),
            is_correct: new AnswerValidation(answer.validation_answer),
            questionId: new QuestionId(answer.id_question),
        }
    }

    private async toEntity(answer: Answer): Promise<AnswerEntity> {
        const answerEntity = new AnswerEntity();
        answerEntity.text_answer = answer.text.value;
        answerEntity.validation_answer = answer.is_correct.value;
        answerEntity.id_question = answer.questionId.value;
        return answerEntity;
    }
}