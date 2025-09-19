import { Token } from './../../domain/auth/Token';
import { NextFunction, Request, Response } from "express";
import { AuthUseCase } from "@/application/usecase/AuthUseCase";

export const authenticationToken = (request: Request, response: Response, next: NextFunction) => {
    const authHeader = request.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        response.status(401).json();
        return;
    }

    try {
        const domainToken: Token = {value: token};
        const claims = AuthUseCase.verifyToken(domainToken);
        (request as any).user = claims;
        next();
    } catch(error) {
        response.status(401).json();
        return;
    }
}