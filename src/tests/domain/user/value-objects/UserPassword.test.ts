import { describe, it, expect } from "vitest";
import UserPassword from "../../../../../src/domain/user/value-objects/UserPassword";
import UserValidationException from "../../../../../src/domain/user/exception/UserValidationException";

describe("UserPassword", () => {
  it("should create a valid user password", () => {
    const userPassword = new UserPassword("password123");
    expect(userPassword.value).toBe("password123");
  });

  it("should throw an exception for a password that is too short", () => {
    expect(() => new UserPassword("12345")).toThrow(
      new UserValidationException("Invalid password provided.")
    );
  });

  it("should throw an exception for a null password", () => {
    expect(() => new UserPassword(null as any)).toThrow(
      new UserValidationException("Invalid password provided.")
    );
  });

  it("should throw an exception for an empty password", () => {
    expect(() => new UserPassword("")).toThrow(
      new UserValidationException("Invalid password provided.")
    );
  });
});
