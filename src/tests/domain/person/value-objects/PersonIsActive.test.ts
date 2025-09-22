import { describe, it, expect } from "vitest";
import PersonIsActive from "../../../../../src/domain/person/value-objects/PersonIsActive";
import PersonValidationException from "../../../../../src/domain/person/exception/PersonValidationException";

describe("PersonIsActive", () => {
  it("should create a valid person active status", () => {
    const personIsActive = new PersonIsActive(true);
    expect(personIsActive.value).toBe(true);
  });

  it("should create a valid person active status with false", () => {
    const personIsActive = new PersonIsActive(false);
    expect(personIsActive.value).toBe(false);
  });

  it("should throw an exception for a null person active status", () => {
    expect(() => new PersonIsActive(null as any)).toThrow(
      new PersonValidationException("Invalid person active status provided.")
    );
  });
});
