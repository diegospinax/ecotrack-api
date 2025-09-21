import TaskId from "@/domain/challenge/task/value-objects/TaskId";

export interface DeleteTaskUseCase {
    delete(taskId: TaskId): Promise<void>;
}