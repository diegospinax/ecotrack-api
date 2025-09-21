import { Role } from "../user/Role";

export interface Claims {
    id: number,
    personId: number,
    email: string,
    role: Role
}