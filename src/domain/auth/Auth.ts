import UserEmail from "../user/value-objects/UserEmail";
import UserPassword from "../user/value-objects/UserPassword";

export interface Auth {
    email: UserEmail,
    password: UserPassword
}