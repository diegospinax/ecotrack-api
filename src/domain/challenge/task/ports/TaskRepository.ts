import { Task } from "../Task";
import TaskId from "../value-objects/TaskId";

export interface TaskRepository {
  createTask(task: Task): Promise<Task>;
  FindById(taskId: TaskId): Promise<Task>;
  updateTask(task: Task): Promise<void>;
  deleteTask(taskId: TaskId): Promise<void>;
}
