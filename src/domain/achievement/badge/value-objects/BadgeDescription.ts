import LogroValidationException from "../../exception/LogroValidationException";
import { BadgeField } from "./abstract/BadgeField";

export default class BadgeDescription extends BadgeField<string> {
  constructor(value: string) {
    super(value);
  }
  public validate(): void {
    const regex: RegExp = /^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9.,;:()¿?¡!'"\- ]{10,500}$/;
    if (!this.value || !regex.test(this.value)) {
      throw new LogroValidationException(
        "Invalidate badge description provided."
      );
    }
  }
}
