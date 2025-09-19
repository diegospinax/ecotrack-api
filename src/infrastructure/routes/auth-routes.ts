import { NextFunction, Router, Response, Request } from "express";
import { UserRepositoryAdapter } from "../adapter/out/repository/UserRepositoryAdapter";
import PasswordEncrypterAdapter from "../adapter/out/encrypt/PasswordEncrypterAdapter";
import { AuthUseCase } from "@/application/usecase/AuthUseCase";
import TokenServiceAdapter from "../adapter/out/token/TokenServiceAdapter";
import { AuthController } from "../adapter/in/AuthController";

const router = Router();
const BASE_URL = "/auth";

const repository = new UserRepositoryAdapter();
const encrypter = new PasswordEncrypterAdapter();
const tokenService = new TokenServiceAdapter();
const useCase = new AuthUseCase(repository, tokenService, encrypter);
const controller = new AuthController(useCase);

router.post(
  BASE_URL + "/login",
  async (req: Request, res: Response, next: NextFunction) => {
    await controller.login(req, res, next);
  }
);

export default router;
