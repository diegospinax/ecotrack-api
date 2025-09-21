import TaskId from "@/domain/challenge/task/value-objects/TaskId";
import PersonId from "@/domain/person/value-objects/PersonId";

export class CreateChallengeDto {
    constructor(
        public readonly personId: PersonId,
        public readonly taskId: TaskId
    ) {}
}