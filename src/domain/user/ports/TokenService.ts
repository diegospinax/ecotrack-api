import { Claims } from "@/domain/auth/Claims";
import { Token } from "@/domain/auth/Token";

export interface TokenService {
  generateToken(payload: object): Token;
  verifyToken(token: string): Claims;
}
