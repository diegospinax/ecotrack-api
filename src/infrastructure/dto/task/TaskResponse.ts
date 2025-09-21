import { TaskTypeEnum } from "@/domain/challenge/task/TaskTypeEnum";

export class TaskResponse {
    constructor(
        public readonly id: number,
        public readonly title: string,
        public readonly description: string,
        public readonly type: TaskTypeEnum,
        public readonly requiredRepetitions: number,
        public readonly isActive: boolean
    ) { }
}