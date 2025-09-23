import { CreateBadgeDto } from "@/application/dto/achievement/badge/CreateBadgeDto";
import { BadgeUseCase } from "@/application/usecase/achievement/badge/BadgeUseCase";
import BadgeId from "@/domain/achievement/badge/value-objects/BadgeId";
import BadgeType from "@/domain/achievement/badge/value-objects/BadgeType";
import { EcoCategoryEnum } from "@/domain/EcoCategoryEnum";
import { BadgeRequest } from "@/infrastructure/dto/achievement/badge/BadgeRequest";
import { HttpException } from "@/infrastructure/exception/HttpException";
import { mapBadgeDomainToResponse, mapBadgeRequestToCreateDto, mapBadgeRequestToUpdateDto } from "@/infrastructure/mapper/in/achievement/badge-in-mapper";
import { NextFunction, Request, Response } from "express";

export class BadgeController {
    constructor(private useCase: BadgeUseCase) { }

    public async create(req: Request, res: Response, next: NextFunction) {
        try {
            const request: Omit<BadgeRequest, "isActive"> = req.body;
            const badgeDto: CreateBadgeDto = mapBadgeRequestToCreateDto(request);
            const badge = await this.useCase.create(badgeDto);
            res.status(201).location("/api/v1/badges/" + badge.id.value).end();
        } catch (error) {
            next(error);
        }
    }

    public async findAll(req: Request, res: Response, next: NextFunction) {
        try {
            const badges = await this.useCase.findAll();
            res.status(200).json(badges.map(mapBadgeDomainToResponse));
        } catch (error) {
            next(error);
        }
    }

    public async findById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const badgeId = new BadgeId(Number(id));
            const badge = await this.useCase.findById(badgeId);
            res.status(200).json(mapBadgeDomainToResponse(badge));
        } catch (error) {
            next(error);
        }
    }

    public async findAllByType(req: Request, res: Response, next: NextFunction) {
        try {
            const type = req.query.value as string;

            if (!Object.values(EcoCategoryEnum).includes(type as EcoCategoryEnum))
                throw new HttpException(400, `Invalid badge type: ${type}`);

            const badgeType = new BadgeType(type as EcoCategoryEnum);

            const badges = await this.useCase.findAllByType(badgeType);

            return res.status(200).json(badges.map(mapBadgeDomainToResponse));
        } catch (error) {
            next(error);
        }
    }

    public async update(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;

            const badgeId = new BadgeId(Number(id));
            const badgeRequest: Partial<BadgeRequest> = req.body;

            const badgeDto = mapBadgeRequestToUpdateDto(badgeRequest, badgeId);

            await this.useCase.update(badgeDto);

            return res.status(204).end();
        } catch (error) {
            next(error);
        }
    }

    public async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const badgeId = new BadgeId(Number(id));
            await this.useCase.delete(badgeId);
            return res.status(204).end();
        } catch (error) {
            next(error);
        }
    }

}