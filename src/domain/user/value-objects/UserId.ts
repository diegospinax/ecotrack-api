import { UserField } from './abstract/UserField';
import UserValidationException from '../exception/UserValidationException';

export default class UserId extends UserField<number> {
  constructor(value: number) {
    super(value);
  }

  public validate(): void {
    if (!this.value || (this.value % 1 !== 0)) {
      throw new UserValidationException("Invalid user id provided.");
    }
  }
}