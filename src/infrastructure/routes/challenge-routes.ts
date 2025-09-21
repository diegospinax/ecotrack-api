import { NextFunction, Request, Response, Router } from "express";
import { ChallengeRepositoryAdapter } from "../adapter/out/repository/challenge/CallengeRepositoryAdapter";
import { PersonRepositoryAdapter } from "../adapter/out/repository/PersonRepositoryAdapter";
import { AppDataSource } from "../config/database.postgres";
import { TaskRepositoryAdapter } from "../adapter/out/repository/challenge/TaskRepositoryAdapter";
import { ChallengeUseCase } from "@/application/usecase/challenge/ChallengeUseCase";
import { ChallengeController } from "../adapter/in/ChallengeController";
import { authenticationToken } from "../middleware/auth.middleware";
import { Claims } from "@/domain/auth/Claims";
import { Role } from "@/domain/user/Role";
import { HttpException } from "../exception/HttpException";


const router = Router();
const BASE_URL = "/challenges";

const challengeRepository = new ChallengeRepositoryAdapter();
const personRepository = new PersonRepositoryAdapter(AppDataSource);
const taskRepository = new TaskRepositoryAdapter();
const useCase = new ChallengeUseCase(challengeRepository, personRepository, taskRepository);
const controller = new ChallengeController(useCase);

router.post(
    BASE_URL + "/create",
    authenticationToken,
    async (req: Request, res: Response, next: NextFunction) => {
        const claims: Claims = (req as any).user;

        const { personId } = req.body;

        if (claims.personId !== personId) {
            if (claims.role !== Role.ADMIN)
                throw new HttpException(403, "Unauthorized.");
        }

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
    BASE_URL + "/task/:id",
    authenticationToken,
    async (req: Request, res: Response, next: NextFunction) => {
        await controller.findAllByTaskId(req, res, next);
    }
);

router.get(
    BASE_URL + "/person/:id",
    authenticationToken,
    async (req: Request, res: Response, next: NextFunction) => {
        await controller.findAllByPersonId(req, res, next);
    }
);

router.put(
    BASE_URL + "/:id",
    authenticationToken,
    async (req: Request, res: Response, next: NextFunction) => {
        const claims: Claims = (req as any).user;

        const { personId } = req.body;

        if (claims.personId !== personId) {
            if (claims.role !== Role.ADMIN)
                throw new HttpException(403, "Unauthorized.");
        }

        await controller.update(req, res, next);
    }
);

export default router;