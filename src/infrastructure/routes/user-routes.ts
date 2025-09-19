import { NextFunction, Request, Response, Router } from "express";
import { UserRepositoryAdapter } from "../adapter/out/repository/UserRepositoryAdapter";
import { UserUseCase } from "@/application/usecase/user/UserUseCase";
import PasswordEncrypterAdapter from "../adapter/out/encrypt/PasswordEncrypterAdapter";
import { UserController } from "../adapter/in/UserController";
import { authenticationToken } from "../middleware/auth.middleware";
import { Claims } from "@/domain/auth/Claims";
import { Role } from "@/domain/user/Role";
import { HttpException } from "../exception/HttpException";

const router = Router();

const BASE_URL = "/users";

const repository = new UserRepositoryAdapter();
const encrypter = new PasswordEncrypterAdapter();
const useCase = new UserUseCase(repository, encrypter);
const controller = new UserController(useCase);

router.post(
  BASE_URL + "/create",
  authenticationToken,
  async (req: Request, res: Response, next: NextFunction) => {
    const claims: Claims = (req as any).user;

    if (claims.role !== Role.ADMIN)
      throw new HttpException(403, "Unauthorized.");

    await controller.createUser(req, res, next);
  }
);

router.get(
  BASE_URL + "/email",
  authenticationToken,
  async (req: Request, res: Response, next: NextFunction) => {
    const claims: Claims = (req as any).user;

    const value = req.query.value;

    if (claims.email !== value){
      if (claims.role !== Role.ADMIN) {
        throw new HttpException(403, "Unauthorized.");
      }
    }

    await controller.findByEmail(req, res, next);
  }
);


router.get(
  BASE_URL + "/:id",
  authenticationToken,
  async (req: Request, res: Response, next: NextFunction) => {
    const claims: Claims = (req as any).user;

    const { id } = req.params;

    if (claims.id !== Number(id)){
      if (claims.role !== Role.ADMIN) {
        throw new HttpException(403, "Unauthorized.");
      }
    }

    await controller.findById(req, res, next);
  }
);


router.put(
  BASE_URL + "/:id",
  authenticationToken,
  async (req: Request, res: Response, next: NextFunction) => {
    const claims: Claims = (req as any).user;

    const { id } = req.params;

    if (claims.id !== Number(id)){
      if (claims.role !== Role.ADMIN) {
        throw new HttpException(403, "Unauthorized.");
      }
    }

    await controller.updateUser(req, res, next);
  }
);

router.delete(
  BASE_URL + "/:id",
  authenticationToken,
  async (req: Request, res: Response, next: NextFunction) => {
    const claims: Claims = (req as any).user;

    if (claims.role !== Role.ADMIN)
      throw new HttpException(403, "Unauthorized.");

    await controller.deleteUser(req, res, next);
  }
);

export default router;
