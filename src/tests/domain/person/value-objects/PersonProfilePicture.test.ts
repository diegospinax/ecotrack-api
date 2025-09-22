import { describe, it, expect } from "vitest";
import PersonProfilePicture from "../../../../../src/domain/person/value-objects/PersonProfilePicture";
import PersonValidationException from "../../../../../src/domain/person/exception/PersonValidationException";

describe("PersonProfilePicture", () => {
  it("should create a valid person profile picture", () => {
    const personProfilePicture = new PersonProfilePicture("https://example.com/profile.jpg");
    expect(personProfilePicture.value).toBe("https://example.com/profile.jpg");
  });

  it("should throw an exception for a null person profile picture", () => {
    expect(() => new PersonProfilePicture(null as any)).toThrow(
      new PersonValidationException("Invalid porfile picture provided.")
    );
  });

  it("should throw an exception for an empty person profile picture", () => {
    expect(() => new PersonProfilePicture("")).toThrow(
      new PersonValidationException("Invalid porfile picture provided.")
    );
  });
});
