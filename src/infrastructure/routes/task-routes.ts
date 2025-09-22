import { TaskUseCase } from "@/application/usecase/challenge/task/TaskUseCase";
import { NextFunction, Request, Response, Router } from "express";
import { TaskController } from "../adapter/in/TaskController";
import { TaskRepositoryAdapter } from "../adapter/out/repository/challenge/TaskRepositoryAdapter";
import { authenticationToken } from "../middleware/auth.middleware";
import { Claims } from "@/domain/auth/Claims";
import { HttpException } from "../exception/HttpException";
import { Role } from "@/domain/user/Role";

const router = Router();
const BASE_URL = "/tasks";

const repository = new TaskRepositoryAdapter();
const useCase = new TaskUseCase(repository);
const controller = new TaskController(useCase);

router.post(
    BASE_URL + "/create",
    authenticationToken,
    async (req: Request, res: Response, next: NextFunction) => {
        const claims: Claims = (req as any).user;

        if (claims.role !== Role.ADMIN)
            throw new HttpException(403, "Unauthorized.");

        await controller.create(req, res, next);
    }
);

router.get(
    BASE_URL + "/list",
    authenticationToken,
    async (req: Request, res: Response, next: NextFunction) => {
        await controller.findAll(req, res, next);
    }
);

router.get(
    BASE_URL + "/type",
    authenticationToken,
    async (req: Request, res: Response, next: NextFunction) => {
        await controller.findAllByType(req, res, next);
    }
);

router.get(
    BASE_URL + "/:id",
    authenticationToken,
    async (req: Request, res: Response, next: NextFunction) => {
        const claims: Claims = (req as any).user;

        if (claims.role !== Role.ADMIN)
            throw new HttpException(403, "Unauthorized.");

        await controller.findById(req, res, next);
    }
);

router.put(
    BASE_URL + "/:id",
    authenticationToken,
    async (req: Request, res: Response, next: NextFunction) => {
        const claims: Claims = (req as any).user;

        if (claims.role !== Role.ADMIN)
            throw new HttpException(403, "Unauthorized.");

        await controller.update(req, res, next);
    }
);

router.delete(
    BASE_URL + "/:id",
    authenticationToken,
    async (req: Request, res: Response, next: NextFunction) => {
        const claims: Claims = (req as any).user;

        if (claims.role !== Role.ADMIN)
            throw new HttpException(403, "Unauthorized.");

        await controller.delete(req, res, next);
    }
);

export default router;

