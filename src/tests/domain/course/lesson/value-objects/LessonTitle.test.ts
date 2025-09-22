import { describe, it, expect } from "vitest";
import LessonTitle from "../../../../../../src/domain/course/lesson/value-objects/LessonTitle";
import CourseValidationException from "../../../../../../src/domain/course/exception/CourseValidationException";

describe("LessonTitle", () => {
  it("should create a valid lesson title", () => {
    const lessonTitle = new LessonTitle("VALID_TITLE");
    expect(lessonTitle.value).toBe("VALID_TITLE");
  });

  it("should create a valid lesson title with numbers", () => {
    const lessonTitle = new LessonTitle("VALID_TITLE_1");
    expect(lessonTitle.value).toBe("VALID_TITLE_1");
  });

  it("should throw an exception for an invalid lesson title with spaces", () => {
    expect(() => new LessonTitle("INVALID TITLE")).toThrow(
      new CourseValidationException("Invalid lesson title provided.")
    );
  });

  it("should throw an exception for a null lesson title", () => {
    expect(() => new LessonTitle(null as any)).toThrow(
      new CourseValidationException("Invalid lesson title provided.")
    );
  });

  it("should throw an exception for an empty lesson title", () => {
    expect(() => new LessonTitle("")).toThrow(
      new CourseValidationException("Invalid lesson title provided.")
    );
  });
});
