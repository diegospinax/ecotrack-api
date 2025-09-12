import TaskValidationException from "../exception/TaskValidationException";
import { TaskField } from "./abstract/taskField";

export default class TaskDescription extends TaskField<string> {
  constructor(value: string) {
    super(value);
  }

  public validate(): void {
    const regex: RegExp = / /;
    if (!this.value || !regex.test(this.value)) {
      throw new TaskValidationException(
        "Invalidate task description provided."
      );
    }
  }
}
