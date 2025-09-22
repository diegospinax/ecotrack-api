import { AchievementUseCase } from "@/application/usecase/achievement/AchievementUseCase";
import { NextFunction, Request, Response, Router } from "express";
import { AchievementController } from "../adapter/in/AchievementController";
import { AchievementRepositoryAdapter } from "../adapter/out/repository/achievement/AchievementRepositoryAdapter";
import { BadgeRepositoryAdapter } from "../adapter/out/repository/achievement/BadgeRepositoryAdapter";
import { PersonRepositoryAdapter } from "../adapter/out/repository/PersonRepositoryAdapter";
import { AppDataSource } from "../config/database.postgres";
import { authenticationToken } from "../middleware/auth.middleware";
import { Claims } from "@/domain/auth/Claims";
import { Role } from "@/domain/user/Role";
import { HttpException } from "../exception/HttpException";
import PersonId from "@/domain/person/value-objects/PersonId";


const router = Router();
const BASE_URL = "/achievements";

const achievementRepository = new AchievementRepositoryAdapter();
const personRepository = new PersonRepositoryAdapter(AppDataSource);
const badgeRepository = new BadgeRepositoryAdapter();
const useCase = new AchievementUseCase(achievementRepository, personRepository, badgeRepository);
const controller = new AchievementController(useCase);

router.post(
    BASE_URL + "/create",
    authenticationToken,
    async (req: Request, res: Response, next: NextFunction) => {
        const claims: Claims = (req as any).user;

        try {
            const { personId } = req.body;
            const id = new PersonId(personId);

            if (claims.personId !== id.value) {
                if (claims.role !== Role.ADMIN)
                    throw new HttpException(403, "Unauthorized.");
            }
        } catch (error) {
            if (error instanceof HttpException) 
                throw error;
            
            throw new HttpException(400, "Invalid body provided.");
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
    BASE_URL + "/person/:id",
    authenticationToken,
    async (req: Request, res: Response, next: NextFunction) => {
        await controller.findAllByPersonId(req, res, next);
    }
);

router.get(
    BASE_URL + "/badge/:id",
    authenticationToken,
    async (req: Request, res: Response, next: NextFunction) => {
        await controller.findAllByBadgeId(req, res, next);
    }
);

export default router;