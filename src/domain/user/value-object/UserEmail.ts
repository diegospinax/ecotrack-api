import { UserValidationError } from "../error/UserValidationError";

const emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export default class UserEmail {
  private value: string;

  constructor(value: string) {
    this.value = value;
    this.validate();
  }

  private validate() {
    if (!emailRegex.test(this.value)) {
      throw new UserValidationError("Invalid email provided.");
    }
  }

  getValue() {
    return this.value;
  }
}
