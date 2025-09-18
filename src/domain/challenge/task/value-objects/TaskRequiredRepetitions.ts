import TaskValidationException from "../exception/TaskValidationException";
import { TaskField } from "./abstract/taskField";

export default class TaskRequiredRepetitions extends TaskField<number> {
  constructor(value: number) {
    super(value);
  }
  public validate(): void {
    if (!this.value || this.value % 1 !== 0 || this.value <= 0) {
      throw new TaskValidationException("Invalidate task repetitions provided.");
    }
  }
}
