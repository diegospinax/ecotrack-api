import { UpdateTaskDto } from "@/application/dto/challenge/task/UpdateTaskDto";

export interface UpdateTaskUseCase {
    update(taskDto: UpdateTaskDto): Promise<void>
}