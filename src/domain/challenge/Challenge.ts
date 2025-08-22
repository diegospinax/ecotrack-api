import type { Person } from "../person/Person";
import type { Task } from "../task/Task";

export interface Challenge {
  id: number,
  person: Person;
  task: Task;
  isFinished: boolean;
  timesDone: number;
}