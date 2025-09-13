import { TaskRepository } from "@/domain/challenge/task/ports/TaskRepository";
import { Task } from "@/domain/challenge/task/Task";
import TaskId from "@/domain/challenge/task/value-objects/TaskId";

export class FindTaskById {
  constructor(private repository: TaskRepository) {}

  async run(taskId: TaskId): Promise<Task> {
    return await this.repository.FindById(taskId);
  }
}
