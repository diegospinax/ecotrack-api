import UserEmail from "../value-object/UserEmail";

describe('User Email Test', () => {
  test('invalid email provided', () => {
    expect(() => new UserEmail("INVALID")).toThrow("Invalid email provided.");
  })
  test('email is valid', () => {
    const userEmail = new UserEmail("d@mail.com");
    expect(userEmail.getValue()).toBe("d@mail.com");
  })
})