import { CreateChallengeDto } from "@/application/dto/challenge/CreateChallengeDto";
import { UpdateChallengeDto } from "@/application/dto/challenge/UpdateChallengeDto";
import { UseCaseException } from "@/application/exception/UseCaseException";
import { Challenge } from "@/domain/challenge/Challenge";
import { ChallengeRepository } from "@/domain/challenge/ports/ChallengeRepository";
import { TaskRepository } from "@/domain/challenge/task/ports/TaskRepository";
import { Task } from "@/domain/challenge/task/Task";
import TaskId from "@/domain/challenge/task/value-objects/TaskId";
import { Person } from "@/domain/person/Person";
import { PersonRepository } from "@/domain/person/ports/PersonRepository";
import PersonId from "@/domain/person/value-objects/PersonId";
import { CreateChallengeUseCase } from "./cases/CreateChallengeUseCase";
import { FindChallengeUseCase } from "./cases/FindChallengeUseCase";
import { UpdateChallengeUseCase } from "./cases/UpdateChallengeUseCase";
import ChallengeTimesDone from "@/domain/challenge/value-objects/ChallengeTimesDone";
import ChallengeIsFinished from "@/domain/challenge/value-objects/ChallengeIsFinished";
import ChallengeId from "@/domain/challenge/value-objects/ChallengeId";
import { updateChallengeTimesDone } from "@/application/util/challenge-usecase-util";

export class ChallengeUseCase implements CreateChallengeUseCase, FindChallengeUseCase, UpdateChallengeUseCase {
    constructor(
        private challengeRepository: ChallengeRepository,
        private personRepository: PersonRepository,
        private taskRepository: TaskRepository
    ) { }

    public async create(challengeDto: CreateChallengeDto): Promise<Challenge> {
        const existingChallenge = await this.challengeRepository.findByTaskIdAndPersonId(challengeDto.taskId, challengeDto.personId);

        if (!existingChallenge) throw new UseCaseException("Challenge already exists.");

        const existingPerson = await this.validateExistingPerson(challengeDto.personId);
        const existingTask = await this.validateExistingTask(challengeDto.taskId);

        const challenge: Omit<Challenge, "id"> = {
            person: existingPerson,
            task: existingTask,
            timesDone: new ChallengeTimesDone(0),
            isFinished: new ChallengeIsFinished(false)
        }

        return await this.challengeRepository.create(challenge);
    }

    public async findAll(): Promise<Challenge[]> {
        return await this.challengeRepository.findAll();
    }

    public async findAllByTaskId(taskId: TaskId): Promise<Challenge[]> {
        const existingTask = await this.validateExistingTask(taskId);
        return await this.challengeRepository.findAllByTaskId(existingTask.id);
    }

    public async findAllByPersonId(personId: PersonId): Promise<Challenge[]> {
        const existingPerson = await this.validateExistingPerson(personId);
        return await this.challengeRepository.findAllByPersonId(existingPerson.id);
    }

    public async update(challengeDto: UpdateChallengeDto): Promise<void> {
        const existingChallenge = await this.validateExistingChallenge(challengeDto.id);

        if (existingChallenge.timesDone.value >= existingChallenge.task.requiredRepetitions.value)
            throw new UseCaseException("Challenge already completed.")

        const challenge = updateChallengeTimesDone(existingChallenge);

        await this.challengeRepository.update(challenge);
    }

    private async validateExistingPerson(personId: PersonId): Promise<Person> {
        const existingPerson = await this.personRepository.findById(personId);

        if (!existingPerson) throw new UseCaseException(`Person not found for id: ${personId.value}`);

        return existingPerson;
    }

    private async validateExistingTask(taskId: TaskId): Promise<Task> {
        const existingTask = await this.taskRepository.findById(taskId);

        if (!existingTask) throw new UseCaseException(`Task not found for id: ${taskId.value}`);

        return existingTask;
    }

    private async validateExistingChallenge(challengeId: ChallengeId): Promise<Challenge> {
        const existingChallenge = await this.challengeRepository.findById(challengeId);

        if (!existingChallenge) throw new UseCaseException(`Challenge not found for id: ${challengeId.value}`);

        return existingChallenge;
    }
}