import { BadgeTypeEnum } from "@/domain/achievement/badge/BadgeTypeEnum";
import { BadgeField } from "@/domain/achievement/badge/value-objects/abstract/BadgeField";
import AchievementValidationException from "@/domain/achievement/exception/AchievementValidationException";

export default class BadgeType extends BadgeField<BadgeTypeEnum> {
  constructor(value: BadgeTypeEnum) {
    super(value);
  }
  public validate(): void {
    const isValid = Object.values(BadgeTypeEnum).includes(this.value as BadgeTypeEnum);
    if (!isValid)
      throw new AchievementValidationException("Invalidate badge type provided.");
  }
}
