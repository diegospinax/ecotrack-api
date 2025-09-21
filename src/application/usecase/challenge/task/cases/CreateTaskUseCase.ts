import { CreateTaskDto } from "@/application/dto/challenge/task/CreateTaskDto";
import { Task } from "@/domain/challenge/task/Task";

export interface CreateTaskUseCase {
    create(taskDto: CreateTaskDto): Promise<Task>;
}