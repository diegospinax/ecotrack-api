import AchievementValidationException from "../../exception/AchievementValidationException";
import { BadgeField } from "./abstract/BadgeField";

export default class BadgeId extends BadgeField<number> {
  constructor(value: number) {
    super(value);
  }
  public validate(): void {
    if (!this.value || this.value % 1 !== 0) {
      throw new AchievementValidationException("Invalidate badge id provided.");
    }
  }
}
