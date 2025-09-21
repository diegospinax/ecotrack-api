import { CreateTaskDto } from "@/application/dto/challenge/task/CreateTaskDto";
import { TaskUseCase } from "@/application/usecase/challenge/task/TaskUseCase";
import { TaskTypeEnum } from "@/domain/challenge/task/TaskTypeEnum";
import TaskId from "@/domain/challenge/task/value-objects/TaskId";
import TaskType from "@/domain/challenge/task/value-objects/TaskType";
import { TaskRequest } from "@/infrastructure/dto/task/TaskRequest";
import { HttpException } from "@/infrastructure/exception/HttpException";
import { mapTaskDomainToResponse, mapTaskRequestToCreateDto, mapTaskRequestToUpdateDto } from "@/infrastructure/mapper/in/task-in-mapper";
import { NextFunction, Request, Response } from "express";

export class TaskController {
    constructor(private useCase: TaskUseCase) { }

    public async create(req: Request, res: Response, next: NextFunction) {
        try {
            const taskRequest: Omit<TaskRequest, "isActive"> = req.body;

            const taskDto: CreateTaskDto = mapTaskRequestToCreateDto(taskRequest);
            const task = await this.useCase.create(taskDto);

            return res.status(201)
                .location("/api/v1/tasks/" + task.id.value)
                .end();
        } catch (error) {
            next(error);
        }
    }

    public async findAll(req: Request, res: Response, next: NextFunction) {
        try {
            const tasks = await this.useCase.findAll();

            return res.status(200).json(tasks.map(mapTaskDomainToResponse))
        } catch (error) {
            next(error);
        }
    }

    public async findById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const taskId = new TaskId(Number(id));

            const task = await this.useCase.findById(taskId);

            return res.status(200).json(mapTaskDomainToResponse(task));

        } catch (error) {
            next(error);
        }
    }

    public async findAllByType(req: Request, res: Response, next: NextFunction) {
        try {
            const type = req.query.value as string;

            if (!Object.values(TaskTypeEnum).includes(type as TaskTypeEnum))
                throw new HttpException(400, `Invalid task type: ${type}`);

            const taskType = new TaskType(type as TaskTypeEnum);

            const tasks = await this.useCase.findAllByType(taskType);

            return res.status(200).json(tasks.map(mapTaskDomainToResponse));

        } catch (error) {
            next(error);
        }
    }

    public async update(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;

            const taskId = new TaskId(Number(id));
            const taskRequest: Partial<TaskRequest> = req.body;

            const taskDto = mapTaskRequestToUpdateDto(taskRequest, taskId);

            await this.useCase.update(taskDto);

            return res.status(204).end();
        } catch (error) {
            next(error);
        }
    }

    public async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const taskId = new TaskId(Number(id));

            await this.useCase.delete(taskId);

            return res.status(204).end();
        } catch (error) {
            next(error);
        }
    }
}