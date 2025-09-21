import { TaskRepository } from "@/domain/challenge/task/ports/TaskRepository";
import { Task } from "@/domain/challenge/task/Task";
import TaskId from "@/domain/challenge/task/value-objects/TaskId";
import TaskType from "@/domain/challenge/task/value-objects/TaskType";
import { AppDataSource } from "@/infrastructure/config/database.postgres";
import { TaskEntity } from "@/infrastructure/entities/challenge/TaskEntity";
import { Repository } from "typeorm";

export class TaskRepositoryAdapter implements TaskRepository {
    private taskRepository: Repository<TaskEntity>

    constructor() {
        this.taskRepository = AppDataSource.getRepository(TaskEntity);
    }

    public async create(task: Omit<Task, "id">): Promise<Task> {
        throw new Error("Method not implemented.");
    }

    public async findAll(): Promise<Task[]> {
        throw new Error("Method not implemented.");
    }

    public async findById(taskId: TaskId): Promise<Task> {
        throw new Error("Method not implemented.");
    }

    public async findAllByType(taskType: TaskType): Promise<Task[]> {
        throw new Error("Method not implemented.");
    }

    public async update(task: Task): Promise<void> {
        throw new Error("Method not implemented.");
    }

    public async delete(taskId: TaskId): Promise<void> {
        throw new Error("Method not implemented.");
    }
}