import { UserUseCase } from "@/application/usecase/user/UserUseCase";
import { User } from "@/domain/user/User";
import { CreateUserDto } from "@/infrastructure/dto/user/CreateUserDto";
import { mapCreateToDomain } from "@/infrastructure/mapper/user-mapper";
import { NextFunction, Request, Response } from "express";

export class UserController {
    
    constructor(private useCase: UserUseCase){}
    
    async createUser(req: Request, res: Response, next: NextFunction) {
        try {
            const userDto: CreateUserDto = req.body;
            const user: Omit<User, "id"> = mapCreateToDomain(userDto);
    
            const createdUser = await this.useCase.create(user);
            
            return res.status(201)
            .location(`/api/v1/users/${createdUser.id.value}`)
            .end();

        } catch(error) {
            next(error);
        }
    }

    
}