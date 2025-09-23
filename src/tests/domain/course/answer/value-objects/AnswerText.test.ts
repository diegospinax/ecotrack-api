import { describe, it, expect } from "vitest";
import AnswerText from "../../../../../../src/domain/course/answer/value-objects/AnswerText";
import CourseValidationException from "../../../../../../src/domain/course/exception/CourseValidationException";

describe("AnswerText", () => {
  it("should create a valid answer text", () => {
    const answerText = new AnswerText("This is a valid answer.");
    expect(answerText.value).toBe("THIS_IS_A_VALID_ANSWER.");
  });

  it("should throw an exception for an invalid answer text", () => {
    expect(() => new AnswerText("Invalid answer@")).toThrow(
      new CourseValidationException("Invalid answer text provided.")
    );
  });

  it("should throw an exception for a null answer text", () => {
    expect(() => new AnswerText(null as any)).toThrow(
      new CourseValidationException("Invalid answer text provided.")
    );
  });

  it("should throw an exception for an empty answer text", () => {
    expect(() => new AnswerText("")).toThrow(
      new CourseValidationException("Invalid answer text provided.")
    );
  });
});
