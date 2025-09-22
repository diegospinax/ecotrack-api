import { describe, it, expect } from "vitest";
import { CourseId } from "../../../../../src/domain/course/value-objects/CourseId";
import CourseValidationException from "../../../../../src/domain/course/exception/CourseValidationException";

describe("CourseId", () => {
  it("should create a valid course id", () => {
    const courseId = new CourseId(1);
    expect(courseId.value).toBe(1);
  });

  it("should throw an exception for a non-integer course id", () => {
    expect(() => new CourseId(0.5)).toThrow(
      new CourseValidationException("Invalidate course id provided.")
    );
  });

  it("should throw an exception for a null course id", () => {
    expect(() => new CourseId(null as any)).toThrow(
      new CourseValidationException("Invalidate course id provided.")
    );
  });
});
