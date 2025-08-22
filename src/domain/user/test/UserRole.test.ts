import { UserValidationError } from "../error/UserValidationError";
import UserRole from "../value-object/UserRole";

describe("User Role", () => {
  test("invalid role test", () => {
    expect(() => new UserRole("NOTAROLE")).toThrow("Invalid role provided.");
  });

  test("valid role test", () => {
    const userRole = new UserRole("ADMIN");
    expect(userRole.getValue()).toBe("ADMIN");
  });
});
