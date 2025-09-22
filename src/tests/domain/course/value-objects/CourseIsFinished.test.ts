import { describe, it, expect } from "vitest";
import { CourseIsFinished } from "../../../../../src/domain/course/value-objects/CourseIsFinished";
import CourseValidationException from "../../../../../src/domain/course/exception/CourseValidationException";

describe("CourseIsFinished", () => {
  it("should create a valid course finished status", () => {
    const courseIsFinished = new CourseIsFinished(true);
    expect(courseIsFinished.value).toBe(true);
  });

  it("should create a valid course finished status with false", () => {
    const courseIsFinished = new CourseIsFinished(false);
    expect(courseIsFinished.value).toBe(false);
  });

  it("should throw an exception for a null course finished status", () => {
    expect(() => new CourseIsFinished(null as any)).toThrow(
      new CourseValidationException("Invalidate course status provided.")
    );
  });
});
