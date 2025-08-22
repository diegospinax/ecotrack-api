import { UserValidationError } from "../error/UserValidationError";

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#_+-])[A-Za-z\d@$!%*?&.#_+-]{8,}$/;

export default class UserPassword {
  private value: string;

  constructor(value: string) {
    this.value = value;
    this.validate();
  }

  private validate() {
    if (this.value.length < 8) {
      throw new UserValidationError(
        "Password length must be at least 8 characters"
      );
    }
    if (!passwordRegex.test(this.value)) {
      throw new UserValidationError(
        "Password must contain at least one of each: uppercase, lowercase, special , number. Characters"
      );
    }
  }

  getValue() {
    return this.value;
  }
}
