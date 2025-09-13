import { TaskRepository } from "@/domain/challenge/task/ports/TaskRepository";
import { Task } from "@/domain/challenge/task/Task";

export class UpdateTask {
  constructor(private repository: TaskRepository) {}

  async run(task: Task): Promise<void> {
    return await this.repository.updateTask(task);
  }
}
