import { Challenge } from "@/domain/challenge/Challenge";
import { ChallengeRepository } from "@/domain/challenge/ports/ChallengeRepository";
import TaskId from "@/domain/challenge/task/value-objects/TaskId";
import ChallengeId from "@/domain/challenge/value-objects/ChallengeId";
import PersonId from "@/domain/person/value-objects/PersonId";
import { AppDataSource } from "@/infrastructure/config/database.postgres";
import { ChallengeEntity } from "@/infrastructure/entities/challenge/ChallengeEntity";
import { Repository } from "typeorm";

export class ChallengeRepositoryAdapter implements ChallengeRepository {
    private challengeRepository: Repository<ChallengeEntity>

    constructor() {
        this.challengeRepository = AppDataSource.getRepository(ChallengeEntity);
    }

    public async create(challenge: Omit<Challenge, "id">): Promise<Challenge> {
        throw new Error("Method not implemented.");
    }

    public async findAll(): Promise<Challenge[]> {
        throw new Error("Method not implemented.");
    }

    public async findAllByTaskId(taskId: TaskId): Promise<Challenge[]> {
        throw new Error("Method not implemented.");
    }

    public async findAllByPersonId(personId: PersonId): Promise<Challenge[]> {
        throw new Error("Method not implemented.");
    }

    public async findById(challengeId: ChallengeId): Promise<Challenge | null> {
        throw new Error("Method not implemented.");
    }

    public async findByTaskIdAndPersonId(taskId: TaskId, personId: PersonId): Promise<Challenge | null> {
        throw new Error("Method not implemented.");
    }

    public async update(challenge: Challenge): Promise<void> {
        throw new Error("Method not implemented.");
    }
}