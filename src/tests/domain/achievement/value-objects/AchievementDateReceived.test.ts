import { describe, it, expect } from "vitest";
import AchievementDateReceived from "../../../../../src/domain/achievement/value-objects/AchievementDateReceived";
import AchievementValidationException from "../../../../../src/domain/achievement/exception/AchievementValidationException";

describe("AchievementDateReceived", () => {
  it("should create a valid achievement date", () => {
    const validDate = new Date();
    const achievementDate = new AchievementDateReceived(validDate);
    expect(achievementDate.value).toEqual(validDate);
  });

  it("should throw an exception for a future date", () => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 1);
    expect(() => new AchievementDateReceived(futureDate)).toThrow(
      new AchievementValidationException("Invalid achievement date provided.")
    );
  });

  it("should throw an exception for a null date", () => {
    expect(() => new AchievementDateReceived(null as any)).toThrow(
      new AchievementValidationException("Invalid achievement date provided.")
    );
  });
});
