import { AchievementUseCase } from "@/application/usecase/achievement/AchievementUseCase";
import { NextFunction, Request, Response } from "express";

export class AchievementController {
    constructor(private useCase: AchievementUseCase) { }

    public async create(req: Request, res: Response, next: NextFunction) {
        try {

        } catch (error) {
            next(error);
        }
    }

    public async findAll(req: Request, res: Response, next: NextFunction) {
        try {

        } catch (error) {
            next(error);
        }
    }

    public async findAllByPersonId(req: Request, res: Response, next: NextFunction) {
        try {

        } catch (error) {
            next(error);
        }
    }

    public async findAllByBadgeId(req: Request, res: Response, next: NextFunction) {
        try {

        } catch (error) {
            next(error);
        }
    }
}