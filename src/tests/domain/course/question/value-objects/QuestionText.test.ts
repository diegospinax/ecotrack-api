import { describe, it, expect } from "vitest";
import QuestionText from "../../../../../../src/domain/course/question/value-objects/QuestionText";
import CourseValidationException from "../../../../../../src/domain/course/exception/CourseValidationException";

describe("QuestionText", () => {
  it("should create a valid question text", () => {
    const questionText = new QuestionText("This is a valid question?");
    expect(questionText.value).toBe("THIS_IS_A_VALID_QUESTION?");
  });

  it("should throw an exception for an invalid question text", () => {
    expect(() => new QuestionText("Invalid question@")).toThrow(
      new CourseValidationException("Invalid question text provided.")
    );
  });

  it("should throw an exception for a null question text", () => {
    expect(() => new QuestionText(null as any)).toThrow(
      new CourseValidationException("Invalid question text provided.")
    );
  });

  it("should throw an exception for an empty question text", () => {
    expect(() => new QuestionText("")).toThrow(
      new CourseValidationException("Invalid question text provided.")
    );
  });
});
