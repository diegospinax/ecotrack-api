import { describe, it, expect } from "vitest";
import UserId from "../../../../../src/domain/user/value-objects/UserId";
import UserValidationException from "../../../../../src/domain/user/exception/UserValidationException";

describe("UserId", () => {
  it("should create a valid user id", () => {
    const userId = new UserId(1);
    expect(userId.value).toBe(1);
  });

  it("should throw an exception for a non-integer user id", () => {
    expect(() => new UserId(0.5)).toThrow(
      new UserValidationException("Invalid user id provided.")
    );
  });

  it("should throw an exception for a null user id", () => {
    expect(() => new UserId(null as any)).toThrow(
      new UserValidationException("Invalid user id provided.")
    );
  });
});
