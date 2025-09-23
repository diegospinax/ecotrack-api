import { describe, it, expect } from "vitest";
import BadgeName from "../../../../../domain/achievement/badge/value-objects/BadgeName";
import AchievementValidationException from "../../../../../domain/achievement/exception/AchievementValidationException";

describe("BadgeName", () => {
  it("should create a valid badge name", () => {
    const name = "VALID_NAME";
    const badgeName = new BadgeName(name);
    expect(badgeName.value).toBe(name);
  });

  it("should create a valid badge name with underscore", () => {
    const name = "VALID_NAME_WITH_UNDERSCORE";
    const badgeName = new BadgeName(name);
    expect(badgeName.value).toBe(name);
  });

  it("should throw an exception for an invalid badge name", () => {
    const invalidName = "invalid @name";
    expect(() => new BadgeName(invalidName)).toThrow(
      new AchievementValidationException("Invalid badge name provided.")
    );
  });

  it("should throw an exception for a null badge name", () => {
    expect(() => new BadgeName(null as any)).toThrow(
      new AchievementValidationException("Invalid badge name provided.")
    );
  });

  it("should throw an exception for an empty badge name", () => {
    expect(() => new BadgeName("")).toThrow(
      new AchievementValidationException("Invalid badge name provided.")
    );
  });
});
