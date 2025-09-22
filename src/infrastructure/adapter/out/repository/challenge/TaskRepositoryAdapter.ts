import { TaskRepository } from "@/domain/challenge/task/ports/TaskRepository";
import { Task } from "@/domain/challenge/task/Task";
import TaskId from "@/domain/challenge/task/value-objects/TaskId";
import TaskType from "@/domain/challenge/task/value-objects/TaskType";
import { AppDataSource } from "@/infrastructure/config/database.postgres";
import { TaskEntity } from "@/infrastructure/entities/challenge/TaskEntity";
import { mapEntityToTaskDomain } from "@/infrastructure/mapper/out/task-out-mapper";
import { Repository } from "typeorm";

export class TaskRepositoryAdapter implements TaskRepository {
    private taskRepository: Repository<TaskEntity>

    constructor() {
        this.taskRepository = AppDataSource.getRepository(TaskEntity);
    }

    public async create(task: Omit<Task, "id">): Promise<Task> {
        const entity = this.taskRepository.create({
            title: task.title.value,
            description: task.description.value,
            type: task.type.value,
            isActive: task.isActive.value,
            requiredRepetitions: task.requiredRepetitions.value,
        });

        const savedEntity = await this.taskRepository.save(entity);

        return mapEntityToTaskDomain(savedEntity);
    }

    public async findAll(): Promise<Task[]> {
        const entities = await this.taskRepository.find({
            where: {
                isActive: true
            }
        });

        return entities.map(mapEntityToTaskDomain);
    }

    public async findById(taskId: TaskId): Promise<Task | null> {
        const entity = await this.taskRepository.findOneBy({
            id: taskId.value
        });

        return entity ? mapEntityToTaskDomain(entity) : null;
    }

    public async findAllByType(taskType: TaskType): Promise<Task[]> {
        const entities = await this.taskRepository.find({
            where: {
                isActive: true,
                type: taskType.value
            }
        });

        return entities.map(mapEntityToTaskDomain);
    }

    public async update(task: Task): Promise<void> {
        const entity = this.taskRepository.create({
            id: task.id.value,
            title: task.title.value,
            description: task.description.value,
            type: task.type.value,
            isActive: task.isActive.value,
            requiredRepetitions: task.requiredRepetitions.value
        });

        await this.taskRepository.save(entity);
    }

    public async delete(taskId: TaskId): Promise<void> {
        await this.taskRepository.createQueryBuilder("task")
            .update({ isActive: false })
            .where("id = :id", { id: taskId.value })
            .execute();
    }
}