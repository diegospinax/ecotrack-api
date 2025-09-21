import { Task } from "@/domain/challenge/task/Task";
import TaskIsActive from "@/domain/challenge/task/value-objects/TaskIsActive";
import { CreateTaskDto } from "../dto/challenge/task/CreateTaskDto";
import { UpdateTaskDto } from "../dto/challenge/task/UpdateTaskDto";

export const createTaskFromDto = (taskDto: CreateTaskDto): Omit<Task, "id"> => {
    return {
        title: taskDto.title,
        description: taskDto.description,
        type: taskDto.type,
        requiredRepetitions: taskDto.requiredRepetitions,
        isActive: new TaskIsActive(true)
    }
}

export const updateTaskFieldsFromDto = (taskDto: UpdateTaskDto, existingTask: Task): Task => {
    return {
        id: existingTask.id,
        title: taskDto.title ?? existingTask.title,
        description: taskDto.description ?? existingTask.description,
        type: taskDto.type ?? existingTask.type,
        requiredRepetitions: taskDto.requiredRepetitions ?? existingTask.requiredRepetitions,
        isActive: taskDto.isActive ?? existingTask.isActive
    }
}