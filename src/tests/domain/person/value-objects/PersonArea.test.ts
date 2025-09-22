import { describe, it, expect } from "vitest";
import PersonArea from "../../../../../src/domain/person/value-objects/PersonArea";
import { Area } from "../../../../../src/domain/person/Area";
import PersonValidationException from "../../../../../src/domain/person/exception/PersonValidationException";

describe("PersonArea", () => {
  it("should create a valid person area", () => {
    const personArea = new PersonArea(Area.DIRECCION);
    expect(personArea.value).toBe(Area.DIRECCION);
  });

  it("should throw an exception for an invalid person area", () => {
    expect(() => new PersonArea("INVALID_AREA" as any)).toThrow(
      new PersonValidationException("Invalid person area provided.")
    );
  });

  it("should throw an exception for a null person area", () => {
    expect(() => new PersonArea(null as any)).toThrow(
      new PersonValidationException("Invalid person area provided.")
    );
  });
});
