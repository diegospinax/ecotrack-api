import TaskDescription from "@/domain/challenge/task/value-objects/TaskDescription";
import TaskId from "@/domain/challenge/task/value-objects/TaskId";
import TaskIsActive from "@/domain/challenge/task/value-objects/TaskIsActive";
import TaskRequiredRepetitions from "@/domain/challenge/task/value-objects/TaskRequiredRepetitions";
import TaskTitle from "@/domain/challenge/task/value-objects/TaskTitle";
import TaskType from "@/domain/challenge/task/value-objects/TaskType";

export class UpdateTaskDto {
    constructor(
        public readonly id: TaskId,
        public readonly title?: TaskTitle,
        public readonly description?: TaskDescription,
        public readonly type?: TaskType,
        public readonly requiredRepetitions?: TaskRequiredRepetitions,
        public readonly isActive?: TaskIsActive
    ) {}
}