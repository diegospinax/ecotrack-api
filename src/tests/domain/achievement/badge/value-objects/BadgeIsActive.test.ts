import { describe, it, expect } from "vitest";
import BadgeIsActive from "../../../../../domain/achievement/badge/value-objects/BadgeIsActive";
import AchievementValidationException from "../../../../../domain/achievement/exception/AchievementValidationException";

describe("BadgeIsActive", () => {
  it("should create a valid badge active status", () => {
    const isActive = true;
    const badgeIsActive = new BadgeIsActive(isActive);
    expect(badgeIsActive.value).toBe(isActive);
  });

  it("should throw an exception for a null badge active status", () => {
    expect(() => new BadgeIsActive(null as any)).toThrow(
      new AchievementValidationException("Invalid badge active status provided.")
    );
  });

    it("should throw an exception for an undefined badge active status", () => {
    expect(() => new BadgeIsActive(undefined as any)).toThrow(
      new AchievementValidationException("Invalid badge active status provided.")
    );
    });
});
