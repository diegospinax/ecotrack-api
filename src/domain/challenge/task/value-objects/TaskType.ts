import TaskValidationException from "../exception/TaskValidationException";
import { Type } from "../Type";
import { TaskField } from "./abstract/taskField";

export default class TaskType extends TaskField<Type> {
  constructor(value: Type) {
    super(value);
  }
  public validate(): void {
    if (!this.value) {
      throw new TaskValidationException("Invalid task type provided.");
    }
  }
}
