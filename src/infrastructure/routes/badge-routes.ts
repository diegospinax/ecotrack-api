import { NextFunction, Request, Response, Router } from "express";
import { BadgeRepositoryAdapter } from "../adapter/out/repository/achievement/BadgeRepositoryAdapter";
import { BadgeUseCase } from "@/application/usecase/achievement/badge/BadgeUseCase";
import { BadgeController } from "../adapter/in/BadgeController";
import { authenticationToken } from "../middleware/auth.middleware";
import { Claims } from "@/domain/auth/Claims";
import { Role } from "@/domain/user/Role";
import { HttpException } from "../exception/HttpException";


const router = Router();
const BASE_URL = "/badges";

const repository = new BadgeRepositoryAdapter();
const useCase = new BadgeUseCase(repository);
const controller = new BadgeController(useCase);

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