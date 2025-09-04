import UserValidationException from "../exception/UserValidationException";
import { UserField } from "./abstract/UserField";

export default class UserEmail extends UserField<string> {
  constructor(value: string) {
    super(value);
  }

  public validate(): void {
    const regex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!this.value || !regex.test(this.value)) {
      throw new UserValidationException("Invalid email provided.");
    }
  }
}