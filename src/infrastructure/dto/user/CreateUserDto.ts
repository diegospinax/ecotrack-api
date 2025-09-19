import { Role } from "@/domain/user/Role";
import { IsEnum, IsString } from "class-validator";

export class CreateUserDto { 
    constructor(
        public readonly email: string,
        public readonly password: string,
        public readonly role: Role    
     ){}
}
