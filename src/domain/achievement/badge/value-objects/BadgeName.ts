import AchievementValidationException from "../../exception/AchievementValidationException";
import { BadgeField } from "./abstract/BadgeField";

export default class BadgeName extends BadgeField<string> {
  constructor(value: string) {
    super(value);
  }

  public validate(): void {
    if (this.value === null || this.value === undefined)
      throw new AchievementValidationException("Invalid badge name provided.");

    this.value = this.value.replace(/ /g, "_");
    this.value = this.value.toUpperCase();

    const regex: RegExp = /^[\p{Lu}0-9]+(?:_[\p{Lu}0-9]+){0,5}$/u;

    if (!regex.test(this.value)) {
      throw new AchievementValidationException("Invalid badge name provided.");
    }
  }
}
