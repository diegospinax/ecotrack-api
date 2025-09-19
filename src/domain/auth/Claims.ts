import { Role } from "../user/Role";

export interface Claims {
    id: number,
    email: string,
    role: Role
}