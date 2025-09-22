import { describe, it, expect } from "vitest";
import TaskTitle from "../../../../../../src/domain/challenge/task/value-objects/TaskTitle";
import TaskValidationException from "../../../../../../src/domain/challenge/task/exception/TaskValidationException";

describe("TaskTitle", () => {
  it("should create a valid task title", () => {
    const taskTitle = new TaskTitle("VALID_TITLE");
    expect(taskTitle.value).toBe("VALID_TITLE");
  });

  it("should create a valid task title with numbers", () => {
    const taskTitle = new TaskTitle("VALID_TITLE_1");
    expect(taskTitle.value).toBe("VALID_TITLE_1");
  });

  it("should throw an exception for an invalid task title with spaces", () => {
    expect(() => new TaskTitle("INVALID TITLE")).toThrow(
      new TaskValidationException("Invalidate task title provided.")
    );
  });

    it("should throw an exception for an invalid task title with special characters", () => {
    expect(() => new TaskTitle("INVALID-TITLE")).toThrow(
      new TaskValidationException("Invalidate task title provided.")
    );
    });

  it("should throw an exception for a null task title", () => {
    expect(() => new TaskTitle(null as any)).toThrow(
      new TaskValidationException("Invalidate task title provided.")
    );
  });

    it("should throw an exception for an empty task title", () => {
    expect(() => new TaskTitle("")).toThrow(
      new TaskValidationException("Invalidate task title provided.")
    );
    });
});
