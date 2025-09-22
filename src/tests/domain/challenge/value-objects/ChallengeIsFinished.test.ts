import { describe, it, expect } from "vitest";
import ChallengeIsFinished from "../../../../../src/domain/challenge/value-objects/ChallengeIsFinished";
import ChallengeValidationException from "../../../../../src/domain/challenge/exception/ChallengeValidationException";

describe("ChallengeIsFinished", () => {
  it("should create a valid challenge finished status", () => {
    const challengeIsFinished = new ChallengeIsFinished(true);
    expect(challengeIsFinished.value).toBe(true);
  });

  it("should create a valid challenge finished status with false", () => {
    const challengeIsFinished = new ChallengeIsFinished(false);
    expect(challengeIsFinished.value).toBe(false);
  });

  it("should throw an exception for a null challenge finished status", () => {
    expect(() => new ChallengeIsFinished(null as any)).toThrow(
      new ChallengeValidationException(
        "Invalid challenge finished status provided."
      )
    );
  });
});
