import PersonValidationException from "../exception/PersonValidationException";
import { PersonField } from "./abstract/PersonField";

export default class PersonIsActive extends PersonField<boolean> {
  constructor(value: boolean) {
    super(value);
  }

  public validate(): void {
    if (this.value === null || this.value === undefined) {
      throw new PersonValidationException("Invalid person active status provided.");
    }
  }
}