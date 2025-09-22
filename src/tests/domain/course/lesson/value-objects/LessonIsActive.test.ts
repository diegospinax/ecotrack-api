import { describe, it, expect } from "vitest";
import LessonIsActive from "../../../../../../src/domain/course/lesson/value-objects/LessonIsActive";
import CourseValidationException from "../../../../../../src/domain/course/exception/CourseValidationException";

describe("LessonIsActive", () => {
  it("should create a valid lesson active status", () => {
    const lessonIsActive = new LessonIsActive(true);
    expect(lessonIsActive.value).toBe(true);
  });

  it("should create a valid lesson active status with false", () => {
    const lessonIsActive = new LessonIsActive(false);
    expect(lessonIsActive.value).toBe(false);
  });

  it("should throw an exception for a null lesson active status", () => {
    expect(() => new LessonIsActive(null as any)).toThrow(
      new CourseValidationException("Invalid lesson active status provided.")
    );
  });
});
