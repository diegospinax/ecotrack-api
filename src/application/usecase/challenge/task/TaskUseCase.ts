import { TaskRepository } from "@/domain/challenge/task/ports/TaskRepository";
import { CreateTaskUseCase } from "./cases/CreateTaskUseCase";
import { DeleteTaskUseCase } from "./cases/DeleteTaskUseCase";
import { FindTaskUseCase } from "./cases/FindTaskUseCase";
import { UpdateTaskUseCase } from "./cases/UpdateTaskUseCase";
import TaskId from "@/domain/challenge/task/value-objects/TaskId";
import { Task } from "@/domain/challenge/task/Task";
import TaskType from "@/domain/challenge/task/value-objects/TaskType";
import { CreateTaskDto } from "@/application/dto/challenge/task/CreateTaskDto";
import { UpdateTaskDto } from "@/application/dto/challenge/task/UpdateTaskDto";
import { createTaskFromDto, updateTaskFieldsFromDto } from "@/application/util/task-usecase-util";
import { UseCaseException } from "@/application/exception/UseCaseException";

export class TaskUseCase implements CreateTaskUseCase, FindTaskUseCase, UpdateTaskUseCase, DeleteTaskUseCase {
    constructor(private taskRepository: TaskRepository) { }

    public async create(taskDto: CreateTaskDto): Promise<Task> {
        const task: Omit<Task, "id"> = createTaskFromDto(taskDto);
        return await this.taskRepository.create(task);
    }

    public async findAll(): Promise<Task[]> {
        return await this.taskRepository.findAll();
    }

    public async findById(taskId: TaskId): Promise<Task> {
        return await this.validateExistingTask(taskId);
    }

    public async findByType(taskType: TaskType): Promise<Task[]> {
        return await this.taskRepository.findByType(taskType);
    }

    public async update(taskDto: UpdateTaskDto): Promise<void> {
        const existingTask = await this.validateExistingTask(taskDto.id);

        const task = updateTaskFieldsFromDto(taskDto, existingTask);

        return await this.taskRepository.update(task);
    }

    public async delete(taskId: TaskId): Promise<void> {
        const existingTask = await this.validateExistingTask(taskId);
        await this.taskRepository.delete(existingTask.id);
    }

    private async validateExistingTask(taskId: TaskId): Promise<Task> {
        const existingTask = await this.taskRepository.findById(taskId);

        if(!existingTask) throw new UseCaseException(`Task not found for id: ${taskId.value}`);

        return existingTask;
    }

}