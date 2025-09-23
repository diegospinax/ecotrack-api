import { describe, it, expect } from "vitest";
import PersonName from "../../../../../src/domain/person/value-objects/PersonName";
import PersonValidationException from "../../../../../src/domain/person/exception/PersonValidationException";

describe("PersonName", () => {
  it("should create a valid person name", () => {
    const personName = new PersonName("John");
    expect(personName.value).toBe("JOHN");
  });

  it("should create a valid person name with an underscore", () => {
    const personName = new PersonName("Mary_Anne");
    expect(personName.value).toBe("MARY_ANNE");
  });

  it("should throw an exception for an invalid person name with numbers", () => {
    expect(() => new PersonName("John123")).toThrow(
      new PersonValidationException("Invalid person name provided.")
    );
  });

  it("should throw an exception for an invalid person name with special characters", () => {
    expect(() => new PersonName("John-")).toThrow(
      new PersonValidationException("Invalid person name provided.")
    );
  });

  it("should throw an exception for a null person name", () => {
    expect(() => new PersonName(null as any)).toThrow(
      new PersonValidationException("Invalid person name provided.")
    );
  });

  it("should throw an exception for an empty person name", () => {
    expect(() => new PersonName("")).toThrow(
      new PersonValidationException("Invalid person name provided.")
    );
  });
});
