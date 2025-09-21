import { Repository } from "typeorm";
import { ChallengeRepository } from "@/domain/challenge/ports/ChallengeRepository";
import { Challenge } from "@/domain/challenge/Challenge";
import ChallengeId from "@/domain/challenge/value-objects/ChallengeId";
import ChallengeIsFinished from "@/domain/challenge/value-objects/ChallengeIsFinished";
import ChallengeTimesDone from "@/domain/challenge/value-objects/ChallengeTimesDone";
import PersonId from "@/domain/person/value-objects/PersonId";
import TaskId from "@/domain/challenge/task/value-objects/TaskId";
import { ChallengeEntity } from "@/infrastructure/entities/challenge/ChallengeEntity";
import { AppDataSource } from "@/infrastructure/config/database.postgres";

export class ChallengeRepositoryAdapter implements ChallengeRepository {
    private challengeRepository: Repository<ChallengeEntity>

    constructor() {
        this.challengeRepository = AppDataSource.getRepository(ChallengeEntity);
    }

    async create(challenge: Challenge): Promise<Challenge> {
        try {
            const newchallenge = await this.toEntity(challenge);
            const savedchallenge = await this.challengeRepository.save(newchallenge);
            return this.toDomain(savedchallenge);

        } catch (error) {

            console.error("Error creating challenge ", error);
            throw new Error("Error creating challenge");
        }
    }


    async findById(challengeId: ChallengeId): Promise<Challenge> {
        try {
            const challenge = await this.challengeRepository.findOne({
                where: { id_Challenge: challengeId.value },
            });

            if (!challenge) {
                throw new Error("Challenge not found");
            }

            return this.toDomain(challenge);

        } catch (error) {

            console.error("Error fetching challenge by id: ", error);
            throw new Error("Error fetching challenge by id");

        }
    }

    async update(challenge: Challenge): Promise<void> {
        try {

            const challengeUpdate = await this.toEntity(challenge);
            await this.challengeRepository.update(challengeUpdate.id_Challenge, challengeUpdate);

        } catch (error) {

            console.error("Error updating challenge:", error);
            throw new Error("Error updating challenge");
        }
    }


    async deleteChallenge(challengeId: ChallengeId): Promise<void> {
        try {
            const result = await this.challengeRepository.delete(challengeId.value);

            if (result.affected === 0) {
                throw new Error("Challenge not found");
            }

        } catch (error) {

            console.error("Error deleting challenge:", error);
            throw new Error("Error deleting challenge");
        }
    }


    private toDomain(challenge: ChallengeEntity): Challenge {
        return {
            id: new ChallengeId(challenge.id_Challenge),
            isFinished: new ChallengeIsFinished(challenge.Status_Challenge),
            timesDone: new ChallengeTimesDone(challenge.Time_Challenge),
            personId: new PersonId(challenge.id_Person),
            taskId: new TaskId(challenge.id_Task),

        }
    }


    private async toEntity(challenge: Challenge): Promise<ChallengeEntity> {

        const challengeEntity = new ChallengeEntity();
        challengeEntity.Status_Challenge = challenge.isFinished.value;
        challengeEntity.Time_Challenge = challenge.timesDone.value;
        challengeEntity.id_Person = challenge.personId.value;
        challengeEntity.id_Task = challenge.taskId.value;
        return challengeEntity;
    }
}