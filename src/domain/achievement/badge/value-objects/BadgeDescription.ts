import AchievementValidationException from "../../exception/AchievementValidationException";
import { BadgeField } from "./abstract/BadgeField";

export default class BadgeDescription extends BadgeField<string> {
  constructor(value: string) {
    super(value);
  }
  public validate(): void {
    const regex: RegExp = /^[a-zA-Z0-9]+([ _-]|, )[a-zA-Z0-9]+(([ _-]|, )[a-zA-Z0-9]+)*\.?$/;
    if (!this.value || !regex.test(this.value)) {
      throw new AchievementValidationException(
        "Invalidate badge description provided."
      );
    }
  }
}
