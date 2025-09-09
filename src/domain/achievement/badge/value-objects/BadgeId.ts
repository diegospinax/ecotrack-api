import LogroValidationException from "../../exception/LogroValidationException";
import { BadgeField } from "./abstract/BadgeField";

export default class BadgeId extends BadgeField<number> {
  constructor(value: number) {
    super(value);
  }
  public validate(): void {
    if (!this.value || this.value % 1 !== 0) {
      throw new LogroValidationException("Invalidate badge id provided.");
    }
  }
}
