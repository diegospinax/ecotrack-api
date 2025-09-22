import { PersonField } from "./abstract/PersonField";
import PersonValidationException from "../exception/PersonValidationException";

export default class PersonId extends PersonField<number> {
  constructor(value: number) {
    super(value);
  }
  public validate(): void {
    if (this.value === null || this.value === undefined || this.value % 1 !== 0) {
      throw new PersonValidationException("Invalid person id provided");
    }
  }
}
