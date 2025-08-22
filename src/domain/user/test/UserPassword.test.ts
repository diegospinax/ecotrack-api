import UserPassword from "../value-object/UserPassword";

describe("User Password Test", () => {
  test("invalid password length", () => {
    expect(() => new UserPassword("abcde")).toThrow(
      "Password length must be at least 8 characters"
    );
  });

  test("invalid password provided", () => {
    expect(() => new UserPassword("12345678")).toThrow(
      "Password must contain at least one of each: uppercase, lowercase, special , number. Characters"
    );
  });

  test("password is valid", () => {
    const userPassword = new UserPassword("Juan123$");
    expect(userPassword.getValue()).toBe("Juan123$");
  })
});
