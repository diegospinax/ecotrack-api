import { describe, it, expect } from "vitest";
import UserEmail from "../../../../../src/domain/user/value-objects/UserEmail";
import UserValidationException from "../../../../../src/domain/user/exception/UserValidationException";

describe("UserEmail", () => {
  it("should create a valid user email", () => {
    const userEmail = new UserEmail("test@example.com");
    expect(userEmail.value).toBe("test@example.com");
  });

  it("should convert email to lowercase", () => {
    const userEmail = new UserEmail("TEST@EXAMPLE.COM");
    expect(userEmail.value).toBe("test@example.com");
  });

  it("should throw an exception for an invalid email", () => {
    expect(() => new UserEmail("invalid-email")).toThrow(
      new UserValidationException("Invalid email provided.")
    );
  });

  it("should throw an exception for a null email", () => {
    expect(() => new UserEmail(null as any)).toThrow(
      new UserValidationException("Invalid email provided.")
    );
  });

  it("should throw an exception for an empty email", () => {
    expect(() => new UserEmail("")).toThrow(
      new UserValidationException("Invalid email provided.")
    );
  });
});
