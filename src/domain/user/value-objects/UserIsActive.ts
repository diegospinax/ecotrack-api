import UserValidationException from "../exception/UserValidationException";
import { UserField } from "./abstract/UserField";

export default class UserIsActive extends UserField<boolean> {
  constructor(value: boolean) {
    super(value);
  }

  public validate(): void {
    if (this.value === null || this.value === undefined) {
      throw new UserValidationException("Invalid user active status provided.");
    }
  }
}