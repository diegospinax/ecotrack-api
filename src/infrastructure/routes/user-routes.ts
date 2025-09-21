import { NextFunction, Request, Response, Router } from "express";
import { UserRepositoryAdapter } from "../adapter/out/repository/UserRepositoryAdapter";
import { UserUseCase } from "@/application/usecase/user/UserUseCase";
import PasswordEncrypterAdapter from "../adapter/out/encrypt/PasswordEncrypterAdapter";
import { UserController } from "../adapter/in/UserController";
import { authenticationToken } from "../middleware/auth.middleware";
import { Claims } from "@/domain/auth/Claims";
import { Role } from "@/domain/user/Role";
import { HttpException } from "../exception/HttpException";
import UserEmail from "@/domain/user/value-objects/UserEmail";
import UserId from "@/domain/user/value-objects/UserId";
import PersonId from "@/domain/person/value-objects/PersonId";

const router = Router();

const BASE_URL = "/users";

const repository = new UserRepositoryAdapter();
const encrypter = new PasswordEncrypterAdapter();
const useCase = new UserUseCase(repository, encrypter);
const controller = new UserController(useCase);

router.get(
  BASE_URL + "/list",
  authenticationToken,
  async (req: Request, res: Response, next: NextFunction) => {
    const claims: Claims = (req as any).user;

    if (claims.role !== Role.ADMIN) {
      throw new HttpException(403, "Unauthorized.");
    }

    await controller.findAll(req, res, next);
  }
)

router.get(
  BASE_URL + "/email",
  authenticationToken,
  async (req: Request, res: Response, next: NextFunction) => {
    const claims: Claims = (req as any).user;

    const value = req.query.value;
    const userEmail = new UserEmail(value as string);

    if (claims.email !== userEmail.value) {
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
    const personId = new PersonId(Number(id));

    if (claims.personId !== personId.value) {
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
    const personId = new PersonId(Number(id));

    if (claims.personId !== personId.value) {
      if (claims.role !== Role.ADMIN) {
        throw new HttpException(403, "Unauthorized.");
      }
    }

    await controller.updateUser(req, res, next);
  }
);

export default router;
