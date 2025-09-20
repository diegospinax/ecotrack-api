import { AuthUseCase } from "@/application/usecase/AuthUseCase";
import { Auth } from "@/domain/auth/Auth";
import { Token } from "@/domain/auth/Token";
import UserEmail from "@/domain/user/value-objects/UserEmail";
import UserPassword from "@/domain/user/value-objects/UserPassword";
import { CredentialsDto } from "@/infrastructure/dto/auth/CredentialsDto";
import { NextFunction, Request, Response } from "express";

export class AuthController {
    constructor(private useCase: AuthUseCase){}

    public async login(req: Request, res: Response, next: NextFunction) {
        try{
            const credentials: CredentialsDto = req.body;
            
            const auth: Auth = {
                email: new UserEmail(credentials.email),
                password: new UserPassword(credentials.password)
            }

            console.log("no");

            const token: Token = await this.useCase.login(auth);

            console.log(token);

            return res.status(200).json({
                token: token.value
            })

        } catch(error) {
            next(error);
        }
    }
}