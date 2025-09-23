import UserValidationException from "../exception/UserValidationException";
import { UserField } from "./abstract/UserField";

export default class UserPassword extends UserField<string> {
  constructor(value: string) {
    super(value);
  }

  public validate(): void {
    if (this.value == null || this.value == undefined || this.value.length < 6) {
      throw new UserValidationException("Invalid password provided.");
    }
  }
}