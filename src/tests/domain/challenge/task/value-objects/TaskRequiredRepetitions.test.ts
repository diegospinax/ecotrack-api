import { describe, it, expect } from "vitest";
import TaskRequiredRepetitions from "../../../../../../src/domain/challenge/task/value-objects/TaskRequiredRepetitions";
import TaskValidationException from "../../../../../../src/domain/challenge/task/exception/TaskValidationException";

describe("TaskRequiredRepetitions", () => {
  it("should create a valid task required repetitions", () => {
    const taskRequiredRepetitions = new TaskRequiredRepetitions(1);
    expect(taskRequiredRepetitions.value).toBe(1);
  });

  it("should throw an exception for a non-integer task required repetitions", () => {
    expect(() => new TaskRequiredRepetitions(0.5)).toThrow(
      new TaskValidationException("Invalidate task repetitions provided.")
    );
  });

  it("should throw an exception for a zero task required repetitions", () => {
    expect(() => new TaskRequiredRepetitions(0)).toThrow(
      new TaskValidationException("Invalidate task repetitions provided.")
    );
  });

  it("should throw an exception for a negative task required repetitions", () => {
    expect(() => new TaskRequiredRepetitions(-1)).toThrow(
      new TaskValidationException("Invalidate task repetitions provided.")
    );
  });

  it("should throw an exception for a null task required repetitions", () => {
    expect(() => new TaskRequiredRepetitions(null as any)).toThrow(
      new TaskValidationException("Invalidate task repetitions provided.")
    );
  });
});
