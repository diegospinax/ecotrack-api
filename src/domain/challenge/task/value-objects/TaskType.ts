import { EcoCategoryEnum } from "@/domain/EcoCategoryEnum";
import TaskValidationException from "../exception/TaskValidationException";
import { TaskField } from "./abstract/taskField";

export default class TaskType extends TaskField<EcoCategoryEnum> {
  constructor(value: EcoCategoryEnum) {
    super(value);
  }
  public validate(): void {
    const isValid = Object.values(EcoCategoryEnum).includes(this.value as EcoCategoryEnum);
    if (!isValid) {
      throw new TaskValidationException("Invalid task type provided.");
    }
  }
}
