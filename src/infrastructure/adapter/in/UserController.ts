import { UserUseCase } from "@/application/usecase/user/UserUseCase";
import { User } from "@/domain/user/User";
import UserId from "@/domain/user/value-objects/UserId";
import { CreateUserDto } from "@/infrastructure/dto/user/CreateUserDto";
import {
  mapCreateToDomain,
  mapToResponse,
} from "@/infrastructure/mapper/user-mapper";
import { NextFunction, Request, Response } from "express";

export class UserController {
  constructor(private useCase: UserUseCase) {}

  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userDto: CreateUserDto = req.body;
      const user: Omit<User, "id"> = mapCreateToDomain(userDto);

      const createdUser = await this.useCase.create(user);

      return res
        .status(201)
        .location(`/api/v1/users/${createdUser.id.value}`)
        .end();
    } catch (error) {
      next(error);
    }
  }

  async findById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const userId = new UserId(Number(id));

      const user: User = await this.useCase.findById(userId);

      return res.status(200).json(mapToResponse(user));
    } catch (error) {
      next(error);
    }
  }

  async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const userId = new UserId(Number(id));
      await this.useCase.delete(userId);

      return res.status(204).end();
    } catch (error) {
      next(error);
    }
  }
}
