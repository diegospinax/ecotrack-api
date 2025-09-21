import { BadgeTypeEnum } from "@/domain/achievement/badge/BadgeTypeEnum";
import { BadgeField } from "@/domain/achievement/badge/value-objects/abstract/BadgeField";
import AchievementValidationException from "@/domain/achievement/exception/AchievementValidationException";

export default class BadgeType extends BadgeField<BadgeTypeEnum> {
  constructor(value: BadgeTypeEnum) {
    super(value);
  }
  public validate(): void {
    if (!this.value)
      throw new AchievementValidationException("Invalidate badge type provided.");
  }
}
