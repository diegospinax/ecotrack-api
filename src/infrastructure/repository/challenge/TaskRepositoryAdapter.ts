import { TaskRepository } from "@/domain/challenge/task/ports/TaskRepository";
import { Task } from "@/domain/challenge/task/Task";
import TaskId from "@/domain/challenge/task/value-objects/TaskId";
import { Repository } from "typeorm";
import TaskType from "@/domain/challenge/task/value-objects/TaskType";
import TaskTime from "@/domain/challenge/task/value-objects/TaskTime";
import TaskDescription from "@/domain/challenge/task/value-objects/TaskDescription";
import TaskTitle from "@/domain/challenge/task/value-objects/TaskTitle";
import { TaskEntity } from "@/infrastructure/entities/challenge/TaskEntity";
import { AppDataSource } from "@/infrastructure/config/database.postgres";

export class TaskRepositoryAdapter implements TaskRepository {
    private taskRepository: Repository<TaskEntity>

    constructor() {
        this.taskRepository = AppDataSource.getRepository(TaskEntity);
    }

    async createTask(task: Task): Promise<Task> {
        try {
            const newTask = await this.toEntity(task);
            const savedTask = await this.taskRepository.save(newTask);
            return this.toDomain(savedTask);

        } catch (error) {

            console.error("Error creating task ", error);
            throw new Error("Error creating task");
        }
    }


    async FindById(taskId: TaskId): Promise<Task> {
        try {
            const task = await this.taskRepository.findOne({
                where: { id_Task: taskId.value },
            });

            if (!task) {
                throw new Error("Task not found");
            }

            return this.toDomain(task);

        } catch (error) {

            console.error("Error fetching task by id: ", error);
            throw new Error("Error fetching task by id");

        }
    }

    async updateTask(task: Task): Promise<void> {
        try {

            const taskUpdate = await this.toEntity(task);
            await this.taskRepository.update(taskUpdate.id_Task, taskUpdate);

        } catch (error) {

            console.error("Error updating task:", error);
            throw new Error("Error updating task");
        }
    }

    async deleteTask(taskId: TaskId): Promise<void> {
        try {
            const result = await this.taskRepository.delete(taskId.value);

            if (result.affected === 0) {
                throw new Error("Task not found");
            }

        } catch (error) {

            console.error("Error deleting task:", error);
            throw new Error("Error deleting task");
        }
    }


    private toDomain(task: TaskEntity): Task {
        return {
            id: new TaskId(task.id_Task),
            title: new TaskTitle(task.Title_Task),
            description: new TaskDescription(task.Description_Task),
            type: new TaskType(task.Type_Task),
            Time: new TaskTime(task.Time_Task),
        };
    }

    private async toEntity(task: Task): Promise<TaskEntity> {
        const taskEntity = new TaskEntity();
        taskEntity.Title_Task = task.title.value;
        taskEntity.Description_Task = task.description.value;
        taskEntity.Type_Task = task.type.value;
        taskEntity.Time_Task = task.Time.value;
        return taskEntity;
    }


}