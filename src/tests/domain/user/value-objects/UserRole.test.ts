import { describe, it, expect } from "vitest";
import UserRole from "../../../../../src/domain/user/value-objects/UserRole";
import { Role } from "../../../../../src/domain/user/Role";
import UserValidationException from "../../../../../src/domain/user/exception/UserValidationException";

describe("UserRole", () => {
  it("should create a valid user role", () => {
    const userRole = new UserRole(Role.USER);
    expect(userRole.value).toBe(Role.USER);
  });

  it("should create a valid admin role", () => {
    const userRole = new UserRole(Role.ADMIN);
    expect(userRole.value).toBe(Role.ADMIN);
  });

  it("should throw an exception for an invalid role", () => {
    expect(() => new UserRole("INVALID_ROLE" as any)).toThrow(
      new UserValidationException("Invalid role provided.")
    );
  });

  it("should throw an exception for a null role", () => {
    expect(() => new UserRole(null as any)).toThrow(
      new UserValidationException("Invalid role provided.")
    );
  });
});
