import TaskValidationException from "../exception/TaskValidationException";
import { TaskField } from "./abstract/taskField";

export default class TaskId extends TaskField<number> {
  constructor(value: number) {
    super(value);
  }
  public validate(): void {
    if (this.value === null || this.value === undefined || this.value % 1 !== 0) {
      throw new TaskValidationException("Invalid task id provided");
    }
  }
}
