import TaskDescription from "@/domain/challenge/task/value-objects/TaskDescription";
import TaskRequiredRepetitions from "@/domain/challenge/task/value-objects/TaskRequiredRepetitions";
import TaskTitle from "@/domain/challenge/task/value-objects/TaskTitle";
import TaskType from "@/domain/challenge/task/value-objects/TaskType";

export class CreateTaskDto {
    constructor(
        public readonly title: TaskTitle,
        public readonly description: TaskDescription,
        public readonly type: TaskType,
        public readonly requiredRepetitions: TaskRequiredRepetitions
    ) {}
}