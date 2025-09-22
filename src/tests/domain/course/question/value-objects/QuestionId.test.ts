import { describe, it, expect } from "vitest";
import QuestionId from "../../../../../../src/domain/course/question/value-objects/QuestionId";
import CourseValidationException from "../../../../../../src/domain/course/exception/CourseValidationException";

describe("QuestionId", () => {
  it("should create a valid question id", () => {
    const questionId = new QuestionId(1);
    expect(questionId.value).toBe(1);
  });

  it("should throw an exception for a non-integer question id", () => {
    expect(() => new QuestionId(0.5)).toThrow(
      new CourseValidationException("Invalidate question id provided.")
    );
  });

  it("should throw an exception for a null question id", () => {
    expect(() => new QuestionId(null as any)).toThrow(
      new CourseValidationException("Invalidate question id provided.")
    );
  });
});
