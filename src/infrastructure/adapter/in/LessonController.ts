import { CreateLessonDto } from "@/application/dto/course/lesson/CreateLessonDto";
import { UpdateLessonDto } from "@/application/dto/course/lesson/UpdateLessonDto";
import { LessonUseCase } from "@/application/usecase/course/lesson/LessonUseCase";
import LessonId from "@/domain/course/lesson/value-objects/LessonId";
import LessonType from "@/domain/course/lesson/value-objects/LessonType";
import { EcoCategoryEnum } from "@/domain/EcoCategoryEnum";
import { CreateLessonRequest, UpdateLessonRequest } from "@/infrastructure/dto/course/lesson/LessonRequest";
import { HttpException } from "@/infrastructure/exception/HttpException";
import { mapLessonDomainToResponse, mapLessonRequestToCreateDto, mapLessonRequestToUpdateDto } from "@/infrastructure/mapper/in/course/lesson-in-mapper";
import { NextFunction, Request, Response } from "express";

export class LessonController {
    constructor(private useCase: LessonUseCase) { }

    public async create(req: Request, res: Response, next: NextFunction) {
        try {
            const request: CreateLessonRequest = req.body;

            const lessonDto: CreateLessonDto = mapLessonRequestToCreateDto(request);

            const lesson = await this.useCase.create(lessonDto);
            res.status(201).json(mapLessonDomainToResponse(lesson));
        } catch (error) {
            next(error);
        }
    }

    public async findAll(req: Request, res: Response, next: NextFunction) {
        try {
            const lessons = await this.useCase.findAll();
            res.status(200).json(lessons.map(mapLessonDomainToResponse));
        } catch (error) {
            next(error);
        }
    }

    public async findById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const lessonId = new LessonId(Number(id));

            const lesson = await this.useCase.findById(lessonId);

            res.status(200).json(mapLessonDomainToResponse(lesson));
        } catch (error) {
            next(error);
        }
    }

    public async findAllByType(req: Request, res: Response, next: NextFunction) {
        try {
            const type = req.query.value as string;

            if (!Object.values(EcoCategoryEnum).includes(type as EcoCategoryEnum))
                throw new HttpException(400, `Invalid lesson type: ${type}`);

            const lessonType = new LessonType(type as EcoCategoryEnum);

            const lessons = await this.useCase.findAllByType(lessonType);

            return res.status(200).json(lessons.map(mapLessonDomainToResponse));
        } catch (error) {
            next(error);
        }
    }

    public async update(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const lessonId = new LessonId(Number(id));

            const request: UpdateLessonRequest = req.body;
            const lessonDto: UpdateLessonDto = mapLessonRequestToUpdateDto(request, lessonId);

            await this.useCase.update(lessonDto);

            return res.status(204).end();
        } catch (error) {
            next(error);
        }
    }

    public async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const lessonId = new LessonId(Number(id));

            await this.useCase.delete(lessonId);

            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}