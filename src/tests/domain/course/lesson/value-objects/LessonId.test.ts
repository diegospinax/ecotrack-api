import { describe, it, expect } from "vitest";
import LessonId from "../../../../../../src/domain/course/lesson/value-objects/LessonId";
import CourseValidationException from "../../../../../../src/domain/course/exception/CourseValidationException";

describe("LessonId", () => {
  it("should create a valid lesson id", () => {
    const lessonId = new LessonId(1);
    expect(lessonId.value).toBe(1);
  });

  it("should throw an exception for a non-integer lesson id", () => {
    expect(() => new LessonId(0.5)).toThrow(
      new CourseValidationException("Invalid id lesson provided.")
    );
  });

  it("should throw an exception for a null lesson id", () => {
    expect(() => new LessonId(null as any)).toThrow(
      new CourseValidationException("Invalid id lesson provided.")
    );
  });
});
