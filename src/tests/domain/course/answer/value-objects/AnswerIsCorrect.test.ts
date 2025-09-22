import { describe, it, expect } from "vitest";
import AnswerIsCorrect from "../../../../../../src/domain/course/answer/value-objects/AnswerIsCorrect";
import CourseValidationException from "../../../../../../src/domain/course/exception/CourseValidationException";

describe("AnswerIsCorrect", () => {
  it("should create a valid answer is correct status", () => {
    const answerIsCorrect = new AnswerIsCorrect(true);
    expect(answerIsCorrect.value).toBe(true);
  });

  it("should create a valid answer is correct status with false", () => {
    const answerIsCorrect = new AnswerIsCorrect(false);
    expect(answerIsCorrect.value).toBe(false);
  });

  it("should throw an exception for a null answer is correct status", () => {
    expect(() => new AnswerIsCorrect(null as any)).toThrow(
      new CourseValidationException("Invalid answer is correct property provided.")
    );
  });
});
