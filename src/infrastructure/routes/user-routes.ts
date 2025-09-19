import { NextFunction, Request, Response, Router } from "express";
import { UserRepositoryAdapter } from "../adapter/out/repository/UserRepositoryAdapter";
import { UserUseCase } from "@/application/usecase/user/UserUseCase";
import PasswordEncrypterAdapter from "../adapter/out/encrypt/PasswordEncrypterAdapter";
import { UserController } from "../adapter/in/UserController";

const router = Router();

const BASE_URL = "/users";

const repository = new UserRepositoryAdapter();
const encrypter = new PasswordEncrypterAdapter();
const useCase = new UserUseCase(repository, encrypter);
const controller = new UserController(useCase);

router.post(
  BASE_URL + "/create",
  async (req: Request, res: Response, next: NextFunction) => {
    await controller.createUser(req, res, next);
  }
);

export default router;
