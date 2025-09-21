import { Role } from "@/domain/user/Role";

export class UserResponse {
  constructor(
    public readonly id: number,
    public readonly email: string,
    public readonly role: Role,
    public readonly personId: number
  ) {}
}
