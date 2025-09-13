import { TaskRepository } from "@/domain/challenge/task/ports/TaskRepository";
import { Task } from "@/domain/challenge/task/Task";

export class createTask {
    constructor(private repository: TaskRepository){}

     async run(task: Task): Promise<Task> {
        return await this.repository.createTask(task);
      }
}