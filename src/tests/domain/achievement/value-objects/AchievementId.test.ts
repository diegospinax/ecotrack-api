import { describe, it, expect } from "vitest";
import AchievementId from "../../../../../src/domain/achievement/value-objects/AchievementId";
import AchievementValidationException from "../../../../../src/domain/achievement/exception/AchievementValidationException";

describe("AchievementId", () => {
  it("should create a valid achievement id", () => {
    const achievementId = new AchievementId(1);
    expect(achievementId.value).toBe(1);
  });

  it("should throw an exception for a non-integer achievement id", () => {
    expect(() => new AchievementId(0.5)).toThrow(
      new AchievementValidationException("Invalid achievement id provided.")
    );
  });

  it("should throw an exception for a null achievement id", () => {
    expect(() => new AchievementId(null as any)).toThrow(
      new AchievementValidationException("Invalid achievement id provided.")
    );
  });
});
