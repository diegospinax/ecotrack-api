import TaskValidationException from "../exception/TaskValidationException";
import { TaskTypeEnum } from "../TaskTypeEnum";
import { TaskField } from "./abstract/taskField";

export default class TaskType extends TaskField<TaskTypeEnum> {
  constructor(value: TaskTypeEnum) {
    super(value);
  }
  public validate(): void {
    if (!this.value) {
      throw new TaskValidationException("Invalid task type provided.");
    }
  }
}
