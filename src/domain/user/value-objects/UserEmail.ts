import UserValidationException from "../exception/UserValidationException";
import { UserField } from "./abstract/UserField";

export default class UserEmail extends UserField<string> {
  constructor(value: string) {
    super(value);
  }

  public validate(): void {
    if (this.value === null || this.value === undefined)
      throw new UserValidationException("Invalid email provided.");

    this.value = this.value.toLowerCase();

    const regex: RegExp = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

    if (!regex.test(this.value)) {
      throw new UserValidationException("Invalid email provided.");
    }
  }
}