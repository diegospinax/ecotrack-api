import { CreateCourseDto } from "@/application/dto/course/CreateCourseDto";
import { CourseUseCase } from "@/application/usecase/course/CourseUseCase";
import LessonId from "@/domain/course/lesson/value-objects/LessonId";
import { CourseId } from '@/domain/course/value-objects/CourseId';
import PersonId from "@/domain/person/value-objects/PersonId";
import { CourseRequest } from "@/infrastructure/dto/course/CourseRequest";
import { mapCourseRequestToCreateDto, mapCourseDomainToResponse } from "@/infrastructure/mapper/in/course/course-in-mapper";

import { NextFunction, Request, Response } from "express";

export class CourseController {
    constructor(private useCase: CourseUseCase) { }

    public async create(req: Request, res: Response, next: NextFunction) {
        try {
            const request: CourseRequest = req.body;

            const courseDto: CreateCourseDto = mapCourseRequestToCreateDto(request);
            const course = await this.useCase.create(courseDto);

            return res.status(201).json(mapCourseDomainToResponse(course));
        } catch (error) {
            next(error);
        }
    }

    public async findAll(req: Request, res: Response, next: NextFunction) {
        try {
            const courses = await this.useCase.findAll();

            return res.status(200).json(courses.map(mapCourseDomainToResponse));
        } catch (error) {
            next(error);
        }
    }

    public async findAllByPersonId(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const personId = new PersonId(Number(id));

            const courses = await this.useCase.findAllByPersonId(personId);

            return res.status(200).json(courses.map(mapCourseDomainToResponse));
        } catch (error) {
            next(error);
        }
    }

    public async findAllByLessonId(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const lessonId = new LessonId(Number(id));

            const courses = await this.useCase.findAllByLessonId(lessonId);

            return res.status(200).json(courses.map(mapCourseDomainToResponse));
        } catch (error) {
            next(error);
        }
    }

    public async updateStateToFinished(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const courseId = new CourseId(Number(id));

            await this.useCase.updateStateToFinished(courseId);

            return res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}