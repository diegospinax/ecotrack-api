
import { Task } from "@/domain/challenge/task/Task";
import { TaskEntity } from "@/infrastructure/entities/challenge/TaskEntity";
import TaskTitle from '@/domain/challenge/task/value-objects/TaskTitle';
import TaskId from "@/domain/challenge/task/value-objects/TaskId";
import TaskDescription from "@/domain/challenge/task/value-objects/TaskDescription";
import TaskType from "@/domain/challenge/task/value-objects/TaskType";
import TaskRequiredRepetitions from "@/domain/challenge/task/value-objects/TaskRequiredRepetitions";
import TaskIsActive from "@/domain/challenge/task/value-objects/TaskIsActive";

export const mapEntityToTaskDomain = (entity: TaskEntity): Task => {
    return {
        id: new TaskId(entity.id),
        title: new TaskTitle(entity.title),
        description: new TaskDescription(entity.description),
        type: new TaskType(entity.type),
        requiredRepetitions: new TaskRequiredRepetitions(entity.requiredRepetitions),
        isActive: new TaskIsActive(entity.isActive)
    }
}

export const mapTaskDomainToEntity = (task: Task): TaskEntity => {
    return {
        id: task.id.value,
        title: task.title.value,
        description: task.description.value,
        type: task.type.value,
        requiredRepetitions: task.requiredRepetitions.value,
        isActive: task.isActive.value
    }
}