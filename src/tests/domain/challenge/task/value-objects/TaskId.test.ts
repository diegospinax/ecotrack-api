import { describe, it, expect } from "vitest";
import TaskId from "../../../../../../src/domain/challenge/task/value-objects/TaskId";
import TaskValidationException from "../../../../../../src/domain/challenge/task/exception/TaskValidationException";

describe("TaskId", () => {
  it("should create a valid task id", () => {
    const taskId = new TaskId(1);
    expect(taskId.value).toBe(1);
  });

  it("should throw an exception for a non-integer task id", () => {
    expect(() => new TaskId(0.5)).toThrow(
      new TaskValidationException("Invalid task id provided")
    );
  });

  it("should throw an exception for a null task id", () => {
    expect(() => new TaskId(null as any)).toThrow(
      new TaskValidationException("Invalid task id provided")
    );
  });
});
