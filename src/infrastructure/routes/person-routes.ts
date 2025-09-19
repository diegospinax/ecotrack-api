import { NextFunction, Request, Response, Router } from "express";
import { PersonRepositoryAdapter } from "../adapter/out/repository/PersonRepositoryAdapter";
import { PersonUseCase } from "@/application/usecase/person/PersonUseCase";
import { UserRepositoryAdapter } from "../adapter/out/repository/UserRepositoryAdapter";
import { PersonController } from "../adapter/in/PersonController";
import { authenticationToken } from "../middleware/auth.middleware";
import { Role } from "@/domain/user/Role";
import { Claims } from "@/domain/auth/Claims";
import { HttpException } from "../exception/HttpException";

const router = Router();
const BASE_URL = "/persons";

const personRepository = new PersonRepositoryAdapter();
const userRepository = new UserRepositoryAdapter();
const useCase = new PersonUseCase(personRepository, userRepository);
const controller = new PersonController(useCase);

router.post(BASE_URL + "/create",
    authenticationToken,
    async (req: Request, res: Response, next: NextFunction) => {
        const claims: Claims = (req as any).user;

        if (claims.role !== Role.ADMIN)
            throw new HttpException(403, "Unauthorized.");

        await controller.createPerson(req, res, next);
    }
);

router.get(BASE_URL + "/list",
    authenticationToken,
    async (req: Request, res: Response, next: NextFunction) => {
        await controller.listPersons(req, res, next);
    }
);

router.get(BASE_URL + "/user/:id",
    authenticationToken,
    async (req: Request, res: Response, next: NextFunction) => {
        const claims: Claims = (req as any).user;

        const { id } = req.params;

        if (claims.id !== Number(id)) {
            if (claims.role !== Role.ADMIN) {
                throw new HttpException(403, "Unauthorized.");
            }
        }

        await controller.findByUserId(req, res, next);
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

