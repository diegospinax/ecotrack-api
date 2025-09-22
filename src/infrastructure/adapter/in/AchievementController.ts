import { CreateAchievementDto } from "@/application/dto/achievement/CreateAchievementDto";
import { AchievementUseCase } from "@/application/usecase/achievement/AchievementUseCase";
import BadgeId from "@/domain/achievement/badge/value-objects/BadgeId";
import PersonId from "@/domain/person/value-objects/PersonId";
import { AchievementRequest } from "@/infrastructure/dto/achievement/AchievementRequest";
import { mapAchievementDomainToResponse, mapAchievementRequestToCreateDto } from "@/infrastructure/mapper/in/achievement/achievement-in-mapper";
import { NextFunction, Request, Response } from "express";

export class AchievementController {
    constructor(private useCase: AchievementUseCase) { }

    public async create(req: Request, res: Response, next: NextFunction) {
        try {
            const request: AchievementRequest = req.body;
            const achievementDto: CreateAchievementDto = mapAchievementRequestToCreateDto(request);

            await this.useCase.create(achievementDto);

            return res.status(201).end();
        } catch (error) {
            next(error);
        }
    }

    public async findAll(req: Request, res: Response, next: NextFunction) {
        try {
            const achievements = await this.useCase.findAll();

            return res.status(200).json(achievements.map(mapAchievementDomainToResponse));
        } catch (error) {
            next(error);
        }
    }

    public async findAllByPersonId(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const personId = new PersonId(Number(id));

            const achievements = await this.useCase.findAllByPersonId(personId);

            return res.status(200).json(achievements.map(mapAchievementDomainToResponse));
        } catch (error) {
            next(error);
        }
    }

    public async findAllByBadgeId(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const badgeId = new BadgeId(Number(id));

            const achievements = await this.useCase.findAllByBadgeId(badgeId);

            return res.status(200).json(achievements.map(mapAchievementDomainToResponse));
        } catch (error) {
            next(error);
        }
    }
}