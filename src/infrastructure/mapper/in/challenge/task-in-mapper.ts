import { CreateTaskDto } from "@/application/dto/challenge/task/CreateTaskDto";
import { UpdateTaskDto } from "@/application/dto/challenge/task/UpdateTaskDto";
import { Task } from "@/domain/challenge/task/Task";
import TaskDescription from "@/domain/challenge/task/value-objects/TaskDescription";
import TaskId from "@/domain/challenge/task/value-objects/TaskId";
import TaskIsActive from "@/domain/challenge/task/value-objects/TaskIsActive";
import TaskRequiredRepetitions from "@/domain/challenge/task/value-objects/TaskRequiredRepetitions";
import TaskTitle from "@/domain/challenge/task/value-objects/TaskTitle";
import TaskType from "@/domain/challenge/task/value-objects/TaskType";
import { TaskRequest } from "@/infrastructure/dto/task/TaskRequest";
import { TaskResponse } from "@/infrastructure/dto/task/TaskResponse";

export const mapTaskRequestToCreateDto = (taskRequest: Omit<TaskRequest, "isActive">): CreateTaskDto => {
    return {
        title: new TaskTitle(taskRequest.title),
        description: new TaskDescription(taskRequest.description),
        type: new TaskType(taskRequest.type),
        requiredRepetitions: new TaskRequiredRepetitions(taskRequest.requiredRepetitions)
    }
}

export const mapTaskRequestToUpdateDto = (taskRequest: Partial<TaskRequest>, taskId: TaskId): UpdateTaskDto => {
    return {
        id: taskId,
        ...(taskRequest.title && { title: new TaskTitle(taskRequest.title) }),
        ...(taskRequest.description && { description: new TaskDescription(taskRequest.description) }),
        ...(taskRequest.type && { type: new TaskType(taskRequest.type) }),
        ...(taskRequest.requiredRepetitions && { requiredRepetitions: new TaskRequiredRepetitions(taskRequest.requiredRepetitions) }),
        ...(taskRequest.requiredRepetitions && { requiredRepetitions: new TaskRequiredRepetitions(taskRequest.requiredRepetitions) }),
        ...(taskRequest.isActive && { isActive: new TaskIsActive(taskRequest.isActive) })
    }
}

export const mapTaskDomainToResponse = (task: Task): TaskResponse => {
    return {
        id: task.id.value,
        title: task.title.value,
        description: task.description.value,
        type: task.type.value,
        requiredRepetitions: task.requiredRepetitions.value,
        isActive: task.isActive.value
    }
}