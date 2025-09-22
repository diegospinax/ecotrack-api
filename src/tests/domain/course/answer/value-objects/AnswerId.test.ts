import { describe, it, expect } from "vitest";
import AnswerId from "../../../../../../src/domain/course/answer/value-objects/AnswerId";
import CourseValidationException from "../../../../../../src/domain/course/exception/CourseValidationException";

describe("AnswerId", () => {
  it("should create a valid answer id", () => {
    const answerId = new AnswerId(1);
    expect(answerId.value).toBe(1);
  });

  it("should throw an exception for a non-integer answer id", () => {
    expect(() => new AnswerId(0.5)).toThrow(
      new CourseValidationException("Invalid answer id provided.")
    );
  });

  it("should throw an exception for a null answer id", () => {
    expect(() => new AnswerId(null as any)).toThrow(
      new CourseValidationException("Invalid answer id provided.")
    );
  });
});
