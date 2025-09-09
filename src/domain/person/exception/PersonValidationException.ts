export default class PersonValidationException extends Error {
  constructor(message: string) {
    super(message);

    this.name = "PersonValidationException";

    Object.setPrototypeOf(this, PersonValidationException.prototype);
  }
}
