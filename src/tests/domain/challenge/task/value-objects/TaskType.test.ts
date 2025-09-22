import { describe, it, expect } from "vitest";
import TaskType from "../../../../../../src/domain/challenge/task/value-objects/TaskType";
import { TaskTypeEnum } from "../../../../../../src/domain/challenge/task/TaskTypeEnum";
import TaskValidationException from "../../../../../../src/domain/challenge/task/exception/TaskValidationException";

describe("TaskType", () => {
  it("should create a valid task type", () => {
    const taskType = new TaskType(TaskTypeEnum.RECICLAJE);
    expect(taskType.value).toBe(TaskTypeEnum.RECICLAJE);
  });

  it("should throw an exception for an invalid task type", () => {
    expect(() => new TaskType("INVALID_TYPE" as any)).toThrow(
      new TaskValidationException("Invalid task type provided.")
    );
  });

  it("should throw an exception for a null task type", () => {
    expect(() => new TaskType(null as any)).toThrow(
      new TaskValidationException("Invalid task type provided.")
    );
  });
});
