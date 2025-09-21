import { Task } from "@/domain/challenge/task/Task";
import TaskId from "@/domain/challenge/task/value-objects/TaskId";
import TaskType from "@/domain/challenge/task/value-objects/TaskType";

export interface FindTaskUseCase {
    findAll(): Promise<Task[]>;
    findById(taskId: TaskId): Promise<Task>;
    findByType(taskType: TaskType): Promise<Task[]>;
}