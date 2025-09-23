import TaskValidationException from "../exception/TaskValidationException";
import { TaskField } from "./abstract/taskField";

export default class TaskDescription extends TaskField<string> {
  constructor(value: string) {
    super(value);
  }

  public validate(): void {
    if (this.value === null || this.value === undefined)
      throw new TaskValidationException("Invalid task description provided.");

    this.value = this.value.replace(/ /g, "_");
    this.value = this.value.toUpperCase();

    const regex: RegExp = /^[¿\p{Lu}0-9,:\-()."]+(?:_[,:\p{Lu}0-9?\-()."]+)*$/u;

    if (!regex.test(this.value)) {
      throw new TaskValidationException("Invalid task description provided.");
    }
  }
}
