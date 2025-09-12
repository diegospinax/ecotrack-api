export default class LogroValidationException extends Error {
  constructor(message: string) {
    super(message);
    this.name = "LogroValidationException";

    Object.setPrototypeOf(this, LogroValidationException.prototype);
  }
}
