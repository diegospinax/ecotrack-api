import { describe, it, expect } from "vitest";
import ChallengeId from "../../../../../src/domain/challenge/value-objects/ChallengeId";
import ChallengeValidationException from "../../../../../src/domain/challenge/exception/ChallengeValidationException";

describe("ChallengeId", () => {
  it("should create a valid challenge id", () => {
    const challengeId = new ChallengeId(1);
    expect(challengeId.value).toBe(1);
  });

  it("should throw an exception for a non-integer challenge id", () => {
    expect(() => new ChallengeId(0.5)).toThrow(
      new ChallengeValidationException("Invalidate challenge id provided.")
    );
  });

  it("should throw an exception for a null challenge id", () => {
    expect(() => new ChallengeId(null as any)).toThrow(
      new ChallengeValidationException("Invalidate challenge id provided.")
    );
  });
});
