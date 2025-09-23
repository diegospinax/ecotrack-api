import { describe, it, expect } from "vitest";
import BadgeId from "../../../../../domain/achievement/badge/value-objects/BadgeId";
import AchievementValidationException from "../../../../../domain/achievement/exception/AchievementValidationException";

describe("BadgeId", () => {
  it("should create a valid badge id", () => {
    const id = 1;
    const badgeId = new BadgeId(id);
    expect(badgeId.value).toBe(id);
  });

  it("should throw an exception for an invalid badge id", () => {
    const invalidId = 1.5;
    expect(() => new BadgeId(invalidId)).toThrow(
      new AchievementValidationException("Invalidate badge id provided.")
    );
  });

  it("should throw an exception for a null badge id", () => {
    expect(() => new BadgeId(null as any)).toThrow(
      new AchievementValidationException("Invalidate badge id provided.")
    );
  });
});
