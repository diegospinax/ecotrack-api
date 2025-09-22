import { describe, it, expect } from "vitest";
import LessonType from "../../../../../../src/domain/course/lesson/value-objects/LessonType";
import { LessonTypeEnum } from "../../../../../../src/domain/course/lesson/LessonTypeEnum";
import CourseValidationException from "../../../../../../src/domain/course/exception/CourseValidationException";

describe("LessonType", () => {
  it("should create a valid lesson type", () => {
    const lessonType = new LessonType(LessonTypeEnum.AGUA_Y_BIODIVERSIDAD);
    expect(lessonType.value).toBe(LessonTypeEnum.AGUA_Y_BIODIVERSIDAD);
  });

  it("should throw an exception for an invalid lesson type", () => {
    expect(() => new LessonType("INVALID_TYPE" as any)).toThrow(
      new CourseValidationException("Invalid lesson type provided.")
    );
  });

  it("should throw an exception for a null lesson type", () => {
    expect(() => new LessonType(null as any)).toThrow(
      new CourseValidationException("Invalid lesson type provided.")
    );
  });
});
