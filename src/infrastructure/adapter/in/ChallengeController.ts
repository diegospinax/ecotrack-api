import { ChallengeUseCase } from "@/application/usecase/challenge/ChallengeUseCase";
import { NextFunction, Request, Response } from "express";

export class ChallengeController {
    constructor(private useCase: ChallengeUseCase) { }

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

    public async findAllByTaskId(req: Request, res: Response, next: NextFunction) {
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

    public async update(req: Request, res: Response, next: NextFunction) {
        try {

        } catch (error) {
            next(error);
        }
    }
}