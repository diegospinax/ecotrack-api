import { BadgeField } from "@/domain/achievement/badge/value-objects/abstract/BadgeField";
import AchievementValidationException from "@/domain/achievement/exception/AchievementValidationException";
import { EcoCategoryEnum } from "@/domain/EcoCategoryEnum";

export default class BadgeType extends BadgeField<EcoCategoryEnum> {
  constructor(value: EcoCategoryEnum) {
    super(value);
  }
  public validate(): void {
    const isValid = Object.values(EcoCategoryEnum).includes(this.value as EcoCategoryEnum);
    if (!isValid)
      throw new AchievementValidationException("Invalidate badge type provided.");
  }
}
