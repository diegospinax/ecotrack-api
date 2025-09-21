import { PersonUseCase } from "@/application/usecase/person/PersonUseCase";
import { Claims } from "@/domain/auth/Claims";
import { Role } from "@/domain/user/Role";
import { NextFunction, Request, Response, Router } from "express";
import { PersonController } from "../adapter/in/PersonController";
import { PersonRepositoryAdapter } from "../adapter/out/repository/PersonRepositoryAdapter";
import { AppDataSource } from "../config/database.postgres";
import { HttpException } from "../exception/HttpException";
import { authenticationToken } from "../middleware/auth.middleware";

const router = Router();
const BASE_URL = "/persons";

const repository = new PersonRepositoryAdapter(AppDataSource);
const useCase = new PersonUseCase(repository);
const controller = new PersonController(useCase);

router.post(BASE_URL + "/create",
    authenticationToken,
    async (req: Request, res: Response, next: NextFunction) => {
        const claims: Claims = (req as any).user;

        if (claims.role !== Role.ADMIN)
            throw new HttpException(403, "Unauthorized.");

        await controller.create(req, res, next);
    }
);

router.get(BASE_URL + "/list",
    authenticationToken,
    async (req: Request, res: Response, next: NextFunction) => {
        await controller.findAll(req, res, next);
    }
);

router.get(BASE_URL + "/:id",
    authenticationToken,
    async (req: Request, res: Response, next: NextFunction) => {
        await controller.findById(req, res, next);
    }
);

router.put(BASE_URL + "/:id",
    authenticationToken,
    async (req: Request, res: Response, next: NextFunction) => {
        const claims: Claims = (req as any).user;

        const { id } = req.params;

        if (claims.personId !== Number(id)) {
            if (claims.role !== Role.ADMIN) {
                throw new HttpException(403, "Unauthorized.");
            }
        }

        await controller.update(req, res, next);
    }
);

router.delete(BASE_URL + "/:id",
    authenticationToken,
    async (req: Request, res: Response, next: NextFunction) => {
        const claims: Claims = (req as any).user;

        if (claims.role !== Role.ADMIN)
            throw new HttpException(403, "Unauthorized.");

        await controller.delete(req, res, next);
    }
)

export default router;

