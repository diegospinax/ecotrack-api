import UserValidationException from "../exception/UserValidationException";
import { UserField } from "./abstract/UserField";

export default class UserPassword extends UserField<string> {
  constructor(value: string) {
    super(value);
  }

  public validate(): void {
    if (!this.value || this.value.length < 8) {
      throw new UserValidationException("Invalid password provided.");
    }
  }
}