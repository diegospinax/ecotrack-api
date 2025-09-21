import { PasswordEncrypter } from "@/domain/user/ports/PasswordEncrypter";
import UserPassword from "@/domain/user/value-objects/UserPassword";

import bcrypt from 'bcryptjs';

export default class PasswordEncrypterAdapter implements PasswordEncrypter {
    
    public async validatePassword(password: UserPassword, hash: UserPassword): Promise<boolean> {
        return await bcrypt.compare(password.value, hash.value);
    }

    public async encryptPassword(password: UserPassword): Promise<UserPassword> {
        const hashedPassword = await bcrypt.hash(password.value, 10);
        return new UserPassword(hashedPassword);
    }
}