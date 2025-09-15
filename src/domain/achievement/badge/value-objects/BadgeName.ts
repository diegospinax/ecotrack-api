import AchievementValidationException from "../../exception/AchievementValidationException";
import { BadgeField } from "./abstract/BadgeField";

export default class BadgeName extends BadgeField<string> {
  constructor(value: string) {
    super(value);
  }
  public validate(): void {
    const regex: RegExp =
      /^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9]+(?: [A-Za-zÁÉÍÓÚáéíóúÑñ0-9]+){0,4}$/;
    if (!this.value || !regex.test(this.value)) {
      throw new AchievementValidationException("Invalidate badge name provided.");
    }
  }
}
