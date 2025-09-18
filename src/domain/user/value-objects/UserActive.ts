import UserValidationException from "../exception/UserValidationException";
import { UserField } from "./abstract/UserField";

export default class UserActive extends UserField<boolean> {
  constructor(value: boolean) {
    super(value);
  }

  public validate(): void {
    if (!this.value) {
      throw new UserValidationException("Invalid user active status provided.");
    }
  }
}