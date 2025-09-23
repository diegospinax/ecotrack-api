import { describe, it, expect } from "vitest";
import BadgeDescription from "../../../../../domain/achievement/badge/value-objects/BadgeDescription";
import AchievementValidationException from "../../../../../domain/achievement/exception/AchievementValidationException";

describe("BadgeDescription", () => {
  it("should create a valid badge description", () => {
    const description = "This is, a valid description.";
    const badgeDescription = new BadgeDescription(description);
    expect(badgeDescription.value).toBe(description);
  });

  it("should throw an exception for an invalid badge description", () => {
    const invalidDescription = "invalid description";
    expect(() => new BadgeDescription(invalidDescription)).toThrow(
      new AchievementValidationException(
        "Invalidate badge description provided."
      )
    );
  });

  it("should throw an exception for a null badge description", () => {
    expect(() => new BadgeDescription(null as any)).toThrow(
      new AchievementValidationException(
        "Invalidate badge description provided."
      )
    );
  });

  it("should throw an exception for an empty badge description", () => {
    expect(() => new BadgeDescription("")).toThrow(
      new AchievementValidationException(
        "Invalidate badge description provided."
      )
    );
  });
});
