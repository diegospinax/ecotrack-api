import { Challenge } from "@/domain/challenge/Challenge";
import { ChallengeRepository } from "@/domain/challenge/ports/ChallengeRepository";
import TaskId from "@/domain/challenge/task/value-objects/TaskId";
import ChallengeId from "@/domain/challenge/value-objects/ChallengeId";
import PersonId from "@/domain/person/value-objects/PersonId";
import { AppDataSource } from "@/infrastructure/config/database.postgres";
import { ChallengeEntity } from "@/infrastructure/entities/challenge/ChallengeEntity";
import { mapEntityToChallengeDomain } from "@/infrastructure/mapper/out/challenge-out-mapper";
import { mapPersonDomainToEntity } from "@/infrastructure/mapper/out/person-out-mapper";
import { mapTaskDomainToEntity } from "@/infrastructure/mapper/out/task-out-mapper";
import { Brackets, Repository } from "typeorm";

export class ChallengeRepositoryAdapter implements ChallengeRepository {
    private challengeRepository: Repository<ChallengeEntity>

    constructor() {
        this.challengeRepository = AppDataSource.getRepository(ChallengeEntity);
    }

    public async create(challenge: Omit<Challenge, "id">): Promise<Challenge> {
        const entity = this.challengeRepository.create({
            person: mapPersonDomainToEntity(challenge.person),
            task: mapTaskDomainToEntity(challenge.task),
            isFinished: challenge.isFinished.value,
            timesDone: challenge.timesDone.value,
        });

        const savedEntity = await this.challengeRepository.save(entity);

        return mapEntityToChallengeDomain(savedEntity);
    }

    public async findAll(): Promise<Challenge[]> {
        const entities = await this.challengeRepository.createQueryBuilder("challenge")
            .leftJoinAndSelect("challenge.person", "person")
            .leftJoinAndSelect("challenge.task", "task")
            .where("person.isActive = :isActive", { isActive: true })
            .andWhere("task.isActive = :isActive", { isActive: true })
            .getMany();

        return entities.map(mapEntityToChallengeDomain);
    }

    public async findAllByTaskId(taskId: TaskId): Promise<Challenge[]> {
        const entities = await this.challengeRepository.createQueryBuilder("challenge")
            .leftJoinAndSelect("challenge.person", "person")
            .leftJoinAndSelect("challenge.task", "task")
            .where("person.isActive = :isActive")
            .andWhere(new Brackets(qb => {
                qb.where("task.isActive = :isActive")
                    .andWhere("task.id = :taskId")
            }))
            .setParameters({ taskId: taskId.value, isActive: true })
            .getMany();

        return entities.map(mapEntityToChallengeDomain);
    }

    public async findAllByPersonId(personId: PersonId): Promise<Challenge[]> {
        const entities = await this.challengeRepository.createQueryBuilder("challenge")
            .leftJoinAndSelect("challenge.person", "person")
            .leftJoinAndSelect("challenge.task", "task")
            .where("task.isActive = :isActive")
            .andWhere(new Brackets(qb => {
                qb.where("person.isActive = :isActive")
                    .andWhere("person.id = :personId")
            }))
            .setParameters({ personId: personId.value, isActive: true })
            .getMany();

        return entities.map(mapEntityToChallengeDomain);
    }

    public async findById(challengeId: ChallengeId): Promise<Challenge | null> {
        const entity = await this.challengeRepository.createQueryBuilder("challenge")
            .leftJoinAndSelect("challenge.person", "person")
            .leftJoinAndSelect("challenge.task", "task")
            .where("challenge.id = :challengeId", { challengeId: challengeId.value })
            .getOne();

        return entity ? mapEntityToChallengeDomain(entity) : null;
    }

    public async findByTaskIdAndPersonId(taskId: TaskId, personId: PersonId): Promise<Challenge | null> {
        const entity = await this.challengeRepository.createQueryBuilder("challenge")
            .leftJoinAndSelect("challenge.person", "person")
            .leftJoinAndSelect("challenge.task", "task")
            .where("task.id = :taskId", { taskId: taskId.value })
            .andWhere("person.id = :personId", { personId: personId.value })
            .getOne();
        return entity ? mapEntityToChallengeDomain(entity) : null;
    }

    public async update(challenge: Challenge): Promise<void> {
        const entity = this.challengeRepository.create({
            id: challenge.id.value,
            person: mapPersonDomainToEntity(challenge.person),
            task: mapTaskDomainToEntity(challenge.task),
            isFinished: challenge.isFinished.value,
            timesDone: challenge.timesDone.value,
        });

        await this.challengeRepository.save(entity);
    }
}