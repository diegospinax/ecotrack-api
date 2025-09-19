import UserPassword from "../value-objects/UserPassword";

export interface PasswordEncrypter {
    encryptPassword(password: UserPassword): Promise<UserPassword>;
    validatePassword(password: UserPassword, hash: UserPassword): Promise<boolean> ;
}