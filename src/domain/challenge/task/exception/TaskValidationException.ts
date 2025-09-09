export default class TaskValidationException extends Error {
  constructor(message: string) {
    super(message);
    this.name = "TaskValidationException";

    Object.setPrototypeOf(this, TaskValidationException.prototype);
  }
}
