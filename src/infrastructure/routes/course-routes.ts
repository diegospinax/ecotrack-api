import { NextFunction, Request, Response, Router } from "express";
import { CourseRepositoryAdapter } from "../adapter/out/repository/course/CourseRepositoryAdapter";
import { PersonRepositoryAdapter } from "../adapter/out/repository/PersonRepositoryAdapter";
import { AppDataSource } from "../config/database.postgres";
import { LessonRepositoryAdapter } from "../adapter/out/repository/course/LessonRepositoryAdapter";
import { CourseUseCase } from "@/application/usecase/course/CourseUseCase";
import { CourseController } from "../adapter/in/CourseController";
import { authenticationToken } from "../middleware/auth.middleware";
import { Claims } from "@/domain/auth/Claims";
import { Role } from "@/domain/user/Role";
import { HttpException } from "../exception/HttpException";
import PersonId from "@/domain/person/value-objects/PersonId";


const router = Router();
const BASE_URL = "/courses";

const courseRepository = new CourseRepositoryAdapter();
const personRepository = new PersonRepositoryAdapter(AppDataSource);
const lessonRepository = new LessonRepositoryAdapter(AppDataSource);
const useCase = new CourseUseCase(courseRepository, personRepository, lessonRepository);
const controller = new CourseController(useCase);

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
    BASE_URL + "/lesson/:id",
    authenticationToken,
    async (req: Request, res: Response, next: NextFunction) => {
        await controller.findAllByLessonId(req, res, next);
    }
);

router.put(
    BASE_URL + "/:id",
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

            throw new HttpException(400, "Missing personId in body.");
        }

        await controller.updateStateToFinished(req, res, next);
    }
);

export default router;