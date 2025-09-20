import TaskValidationException from "../exception/TaskValidationException";
import { TaskField } from "./abstract/taskField";

export default class TaskIsActive extends TaskField<boolean> {
    constructor(value: boolean) {
        super(value);
    }

    public validate(): void {
        if (this.value === null || this.value === undefined) {
            throw new TaskValidationException("Invalid task active status provided.");
        }
    }
}