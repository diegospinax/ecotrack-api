import { TaskTypeEnum } from "@/domain/challenge/task/TaskTypeEnum";

export class TaskRequest {
    constructor(
        public readonly title: string,
        public readonly description: string,
        public readonly type: TaskTypeEnum,
        public readonly requiredRepetitions: number,
        public readonly isActive: boolean
    ) {}
}