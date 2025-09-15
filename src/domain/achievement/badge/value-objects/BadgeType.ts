import { Type } from "@/domain/achievement/badge/Type";
import { BadgeField } from "@/domain/achievement/badge/value-objects/abstract/BadgeField";
import AchievementValidationException from "@/domain/achievement/exception/AchievementValidationException";

export default class BadgeType extends BadgeField<Type> {
  constructor(value: Type) {
    super(value);
  }
  public validate(): void {
    if (!this.value)
      throw new AchievementValidationException("Invalidate badge type provided.");
  }
}
