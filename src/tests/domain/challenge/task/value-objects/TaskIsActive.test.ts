import { describe, it, expect } from "vitest";
import TaskIsActive from "../../../../../../src/domain/challenge/task/value-objects/TaskIsActive";
import TaskValidationException from "../../../../../../src/domain/challenge/task/exception/TaskValidationException";

describe("TaskIsActive", () => {
  it("should create a valid task active status", () => {
    const taskIsActive = new TaskIsActive(true);
    expect(taskIsActive.value).toBe(true);
  });

  it("should create a valid task active status with false", () => {
    const taskIsActive = new TaskIsActive(false);
    expect(taskIsActive.value).toBe(false);
  });

  it("should throw an exception for a null task active status", () => {
    expect(() => new TaskIsActive(null as any)).toThrow(
      new TaskValidationException("Invalid task active status provided.")
    );
  });
});
