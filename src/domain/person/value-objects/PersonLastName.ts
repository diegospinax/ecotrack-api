import PersonValidationException from "../exception/PersonValidationException";
import { PersonField } from "./abstract/PersonField";

export default class PersonLastName extends PersonField<string> {
  constructor(value: string) {
    super(value);
  }
  public validate(): void {
    if (this.value === null || this.value === undefined)
      throw new PersonValidationException("Invalid person lastname provided.");

    this.value = this.value.replace(/ /g, "_");
    this.value = this.value.toUpperCase();

    const regex: RegExp = /^[\p{Lu}]+(?:_[\p{Lu}]+)?$/u;

    if (!regex.test(this.value)) {
      throw new PersonValidationException("Invalid person lastname provided.");
    }
  }
}
