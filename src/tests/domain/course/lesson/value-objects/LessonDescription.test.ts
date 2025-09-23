import { describe, expect, it } from "vitest";
import CourseValidationException from "../../../../../../src/domain/course/exception/CourseValidationException";
import LessonDescription from "../../../../../../src/domain/course/lesson/value-objects/LessonDescription";

describe("LessonDescription", () => {
  it("should create a valid lesson description", () => {
    const lessonDescription = new LessonDescription("This_is_a_valid_description.");
    expect(lessonDescription.value).toBe("This_is_a_valid_description.");
  });

  it("should throw an exception for an invalid lesson description", () => {
    expect(() => new LessonDescription("Invalid description@")).toThrow(
      new CourseValidationException("Invalid lesson description provided.")
    );
  });

  it("should throw an exception for a null lesson description", () => {
    expect(() => new LessonDescription(null as any)).toThrow(
      new CourseValidationException("Invalid lesson description provided.")
    );
  });

  it("should throw an exception for an empty lesson description", () => {
    expect(() => new LessonDescription("")).toThrow(
      new CourseValidationException("Invalid lesson description provided.")
    );
  });
});
