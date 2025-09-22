import { Claims } from "@/domain/auth/Claims";
import { Token } from "@/domain/auth/Token";
import { TokenService } from "@/domain/user/ports/TokenService";

import environmentVars from "@/infrastructure/config/environment.vars";

import jwt from "jsonwebtoken";

export default class TokenServiceAdapter implements TokenService {

    private tokenKey: string = environmentVars.JWT_SECRET; 

    generateToken(payload: object): Token {
        return {
            value: jwt.sign(payload, this.tokenKey, {expiresIn: '72h'})
        }
    }

    verifyToken(token: string): Claims {
        const payload = jwt.verify(token, this.tokenKey);

        if (typeof payload === 'string')
            throw new Error("Invalid Token provided {string resolved}.");

        return {
            id: payload.id,
            personId: payload.personId,
            email: payload.email,
            role: payload.role
        }
    }

}