import { Task } from "../Task";
import TaskId from "../value-objects/TaskId";
import TaskType from "../value-objects/TaskType";

export interface TaskRepository {
  create(task: Omit<Task, "id">): Promise<Task>;
  findAll(): Promise<Task[]>;
  findById(taskId: TaskId): Promise<Task>;
  findByType(taskType: TaskType): Promise<Task[]>
  update(task: Task): Promise<void>;
  delete(taskId: TaskId): Promise<void>;
}
 