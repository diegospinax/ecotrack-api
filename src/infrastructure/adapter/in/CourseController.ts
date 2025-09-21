import { CourseUseCase } from "@/application/usecase/course/CourseUseCase";
import { NextFunction, Request, Response } from "express";

export class CourseController {
    constructor(private useCase: CourseUseCase) { }

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

    public async findAllByLessonId(req: Request, res: Response, next: NextFunction) {
        try {

        } catch (error) {
            next(error);
        }
    }

    public async updateStateToFinished(req: Request, res: Response, next: NextFunction) {
        try {

        } catch (error) {
            next(error);
        }
    }
}