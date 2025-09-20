import UserEmail from '@/domain/user/value-objects/UserEmail';
import { UserUseCase } from "@/application/usecase/user/UserUseCase";
import { User } from "@/domain/user/User";
import UserId from "@/domain/user/value-objects/UserId";
import { UserRequest } from "@/infrastructure/dto/user/UserRequest";
import {
  mapUserRequestToDomain,
  mapUserDomainToResponse,
} from "@/infrastructure/mapper/user-mapper";
import { NextFunction, Request, Response } from "express";
import UserPassword from '@/domain/user/value-objects/UserPassword';
import UserRole from '@/domain/user/value-objects/UserRole';

export class UserController {
  constructor(private useCase: UserUseCase) { }

  async findById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const userId = new UserId(Number(id));

      const user: User = await this.useCase.findById(userId);

      return res.status(200).json(mapUserDomainToResponse(user));
    } catch (error) {
      next(error);
    }
  }

  async findByEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const email = req.query.value;
      const userEmail = new UserEmail(email as string);

      const user: User = await this.useCase.findByEmail(userEmail);

      return res.status(200).json(mapUserDomainToResponse(user));
    } catch (error) {
      next(error);
    }
  }

  async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const userRequest: Partial<UserRequest> = req.body;

      const userId = new UserId(Number(id));

      const partialUser: Partial<User> = {
        id: userId,
        ...(userRequest.email && { email: new UserEmail(userRequest.email) }),
        ...(userRequest.password && { password: new UserPassword(userRequest.password) }),
        ...(userRequest.role && { role: new UserRole(userRequest.role) })
      }

      await this.useCase.update(partialUser);

      return res.status(204).end();
    } catch (error) {
      next(error);
    }
  }
}
