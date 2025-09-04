import UserValidationException from "../exception/UserValidationException";
import { Role } from "../Role";
import { UserField } from "./abstract/UserField";

export default class UserRole extends UserField<Role> {
  constructor(value: Role) {
    super(value);
  }

  public validate(): void {
    if (!this.value) {
      throw new UserValidationException("Invalid role provided.");
    }
  }
}