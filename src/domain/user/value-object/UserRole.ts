import { UserValidationError } from '../error/UserValidationError';
import { Role } from '../../types';

export default class UserRole {
  private value: Role;

  constructor(value: string) {
    this.value = this.setValue(value);
  }

  private setValue(value: string): Role {
    if (value !== "ADMIN" && value !== "EMPLOYEE") {
      throw new UserValidationError("Invalid role provided.");
    }

    return value === "ADMIN" ? value : "EMPLOYEE";
  }

  getValue() {
    return this.value;
  }
}