import { describe, it, expect } from "vitest";
import BadgeType from "../../../../../domain/achievement/badge/value-objects/BadgeType";
import AchievementValidationException from "../../../../../domain/achievement/exception/AchievementValidationException";
import { EcoCategoryEnum } from "../../../../../domain/EcoCategoryEnum";

describe("BadgeType", () => {
  it("should create a valid badge type", () => {
    const type = EcoCategoryEnum.CARBON_FOOTPRINT;
    const badgeType = new BadgeType(type);
    expect(badgeType.value).toBe(type);
  });

  it("should throw an exception for an invalid badge type", () => {
    const invalidType = "INVALID_TYPE";
    expect(() => new BadgeType(invalidType as any)).toThrow(
      new AchievementValidationException("Invalidate badge type provided.")
    );
  });

  it("should throw an exception for a null badge type", () => {
    expect(() => new BadgeType(null as any)).toThrow(
      new AchievementValidationException("Invalidate badge type provided.")
    );
  });
});
