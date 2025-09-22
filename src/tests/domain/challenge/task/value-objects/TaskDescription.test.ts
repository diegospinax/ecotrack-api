import { describe, it, expect } from "vitest";
import TaskDescription from "../../../../../../src/domain/challenge/task/value-objects/TaskDescription";
import TaskValidationException from "../../../../../../src/domain/challenge/task/exception/TaskValidationException";

describe("TaskDescription", () => {
  it("should create a valid task description", () => {
    const taskDescription = new TaskDescription("This is a valid description.");
    expect(taskDescription.value).toBe("This is a valid description.");
  });

  it("should throw an exception for an invalid task description", () => {
    expect(() => new TaskDescription("Invalid description@")).toThrow(
      new TaskValidationException("Invalidate task description provided.")
    );
  });

  it("should throw an exception for a null task description", () => {
    expect(() => new TaskDescription(null as any)).toThrow(
      new TaskValidationException("Invalidate task description provided.")
    );
  });

  it("should throw an exception for an empty task description", () => {
    expect(() => new TaskDescription("")).toThrow(
      new TaskValidationException("Invalidate task description provided.")
    );
  });
});
