import TaskValidationException from "../exception/TaskValidationException";
import { TaskField } from "./abstract/taskField";

export default class TaskTitle extends TaskField<string> {
  constructor(value: string) {
    super(value);
  }
  public validate(): void {
    const regex: RegExp = /^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9]+(?:_[A-Za-zÁÉÍÓÚáéíóúÑñ0-9]+){0,3}$/;
    if (!this.value || !regex.test(this.value)) {
      throw new TaskValidationException("Invalidate task title provided.");
    }
  }
}
