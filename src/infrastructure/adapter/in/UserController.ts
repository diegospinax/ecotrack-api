import { UdpateUserDto } from "@/application/dto/user/UpdateUserDto";
import { UserUseCase } from "@/application/usecase/user/UserUseCase";
import { User } from "@/domain/user/User";
import UserEmail from '@/domain/user/value-objects/UserEmail';
import UserId from "@/domain/user/value-objects/UserId";
import { UserRequest } from "@/infrastructure/dto/user/UserRequest";
import { mapUserDomainToResponse, mapUserRequestToUpdateDto } from "@/infrastructure/mapper/in/user-in-mapper";
import { NextFunction, Request, Response } from "express";

export class UserController {

  constructor(private useCase: UserUseCase) { }

  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const users: User[] = await this.useCase.findAll();
      return res.status(200).json(users.map(user => mapUserDomainToResponse(user)));
    } catch (error) {
      next(error);
    }
  }

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
      const email = req.query.value as string;
      const userEmail = new UserEmail(email);

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

      const userDto: UdpateUserDto = mapUserRequestToUpdateDto(userRequest, userId);

      await this.useCase.update(userDto);

      return res.status(204).end();
    } catch (error) {
      next(error);
    }
  }
}
