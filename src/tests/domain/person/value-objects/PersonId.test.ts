import { describe, it, expect } from "vitest";
import PersonId from "../../../../../src/domain/person/value-objects/PersonId";
import PersonValidationException from "../../../../../src/domain/person/exception/PersonValidationException";

describe("PersonId", () => {
  it("should create a valid person id", () => {
    const personId = new PersonId(1);
    expect(personId.value).toBe(1);
  });

  it("should throw an exception for a non-integer person id", () => {
    expect(() => new PersonId(0.5)).toThrow(
      new PersonValidationException("Invalid person id provided")
    );
  });

  it("should throw an exception for a null person id", () => {
    expect(() => new PersonId(null as any)).toThrow(
      new PersonValidationException("Invalid person id provided")
    );
  });
});
