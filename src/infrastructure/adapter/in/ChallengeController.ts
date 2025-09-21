import { CreateChallengeDto } from "@/application/dto/challenge/CreateChallengeDto";
import { UpdateChallengeDto } from "@/application/dto/challenge/UpdateChallengeDto";
import { ChallengeUseCase } from "@/application/usecase/challenge/ChallengeUseCase";
import TaskId from "@/domain/challenge/task/value-objects/TaskId";
import ChallengeId from "@/domain/challenge/value-objects/ChallengeId";
import PersonId from "@/domain/person/value-objects/PersonId";
import { ChallengeRequest } from "@/infrastructure/dto/challenge/ChallengeRequest";
import { mapChallengeRequestToCreateDto, mapChallengeDomainToResponse } from "@/infrastructure/mapper/in/challenge/challenge-in-mapper";
import { NextFunction, Request, Response } from "express";

export class ChallengeController {
    constructor(private useCase: ChallengeUseCase) { }

    public async create(req: Request, res: Response, next: NextFunction) {
        try {
            const request: Omit<ChallengeRequest, "id"> = req.body;

            const challengeDto: CreateChallengeDto = mapChallengeRequestToCreateDto(request);
            const challenge = await this.useCase.create(challengeDto);

            return res.status(201).json(mapChallengeDomainToResponse(challenge));
        } catch (error) {
            next(error);
        }
    }

    public async findAll(req: Request, res: Response, next: NextFunction) {
        try {
            const challenges = await this.useCase.findAll();

            return res.status(200).json(challenges.map(mapChallengeDomainToResponse));
        } catch (error) {
            next(error);
        }
    }

    public async findAllByTaskId(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const taskId = new TaskId(Number(id));

            const challenges = await this.useCase.findAllByTaskId(taskId);

            return res.status(200).json(challenges.map(mapChallengeDomainToResponse));
        } catch (error) {
            next(error);
        }
    }

    public async findAllByPersonId(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const personId = new PersonId(Number(id));

            const challenges = await this.useCase.findAllByPersonId(personId);

            return res.status(200).json(challenges.map(mapChallengeDomainToResponse));
        } catch (error) {
            next(error);
        }
    }

    public async update(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;

            const challengeId = new ChallengeId(Number(id));

            const challengeDto: UpdateChallengeDto = new UpdateChallengeDto(challengeId);

            await this.useCase.update(challengeDto);

            return res.status(204).end();
        } catch (error) {
            next(error);
        }
    }
}