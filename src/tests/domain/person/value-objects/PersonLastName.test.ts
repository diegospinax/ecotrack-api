import { describe, it, expect } from "vitest";
import PersonLastName from "../../../../../src/domain/person/value-objects/PersonLastName";
import PersonValidationException from "../../../../../src/domain/person/exception/PersonValidationException";

describe("PersonLastName", () => {
  it("should create a valid person last name", () => {
    const personLastName = new PersonLastName("Doe");
    expect(personLastName.value).toBe("Doe");
  });

  it("should create a valid person last name with an underscore", () => {
    const personLastName = new PersonLastName("Van_Der");
    expect(personLastName.value).toBe("Van_Der");
  });

  it("should throw an exception for an invalid person last name with numbers", () => {
    expect(() => new PersonLastName("Doe123")).toThrow(
      new PersonValidationException("Invalid Person last name provided.")
    );
  });

  it("should throw an exception for an invalid person last name with special characters", () => {
    expect(() => new PersonLastName("Doe-")).toThrow(
      new PersonValidationException("Invalid Person last name provided.")
    );
  });

  it("should throw an exception for a null person last name", () => {
    expect(() => new PersonLastName(null as any)).toThrow(
      new PersonValidationException("Invalid Person last name provided.")
    );
  });

  it("should throw an exception for an empty person last name", () => {
    expect(() => new PersonLastName("")).toThrow(
      new PersonValidationException("Invalid Person last name provided.")
    );
  });
});
