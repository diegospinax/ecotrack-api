import { TaskRepository } from "@/domain/challenge/task/ports/TaskRepository";
import TaskId from "@/domain/challenge/task/value-objects/TaskId";

export class DeleteTask {
  constructor(private repository: TaskRepository) {}

  async run(taskId: TaskId): Promise<void> {
    return await this.repository.deleteTask(taskId);
  }
}
