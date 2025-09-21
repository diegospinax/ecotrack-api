import { Challenge } from "@/domain/challenge/Challenge";
import TaskId from "@/domain/challenge/task/value-objects/TaskId";
import PersonId from "@/domain/person/value-objects/PersonId";

export interface FindChallengeUseCase {
    findAll(): Promise<Challenge[]>;
    findAllByPersonId(personId: PersonId): Promise<Challenge[]>;
    findAllByTaskId(taskId: TaskId): Promise<Challenge[]>;
}