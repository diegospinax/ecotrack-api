import { PersonUseCase } from "@/application/usecase/person/PersonUseCase";
import { Person } from "@/domain/person/Person";
import PersonId from "@/domain/person/value-objects/PersonId";
import UserId from "@/domain/user/value-objects/UserId";
import { PersonRequest } from "@/infrastructure/dto/person/PersonRequest";
import { mapPersonDomainToResponse, mapPersonRequestPartialToPartialDomain, mapPersonRequestToDomain } from "@/infrastructure/mapper/in/person-in-mapper";
import { NextFunction, Request, Response } from "express";

export class PersonController {
    constructor(private useCase: PersonUseCase) { }

    public async createPerson(req: Request, res: Response, next: NextFunction) {
        try {
            const personRequest: PersonRequest = req.body;
            const person: Omit<Person, "id"> = mapPersonRequestToDomain(personRequest);

            const createdPerson: Person = await this.useCase.create(person);

            return res.status(201)
                .location(`/api/v1/persons/${createdPerson.id}`)
                .end();

        } catch (error) {
            next(error);
        }
    }

    public async listPersons(req: Request, res: Response, next: NextFunction) {
        try {
            const persons: Person[] = await this.useCase.list();

            return res.status(200).json(persons
                .map(person => mapPersonDomainToResponse(person)));
        } catch (error) {
            next(error);
        }
    }

    public async findById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const personId = new PersonId(Number(id));

            const person: Person = await this.useCase.findById(personId);

            return res.status(200).json(mapPersonDomainToResponse(person));

        } catch (error) {
            next(error);
        }
    }

    public async findByUserId(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const userId = new UserId(Number(id));

            const person: Person = await this.useCase.findByUserId(userId);

            return res.status(200).json(mapPersonDomainToResponse(person));

        } catch (error) {
            next(error);
        }
    }

    public async update(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const personRequest: Partial<PersonRequest> = req.body;

            const personId = new PersonId(Number(id));

            const partialPerson: Partial<Person> = mapPersonRequestPartialToPartialDomain(personRequest, personId);

            await this.useCase.update(partialPerson);

            return res.status(204).end();
        } catch (error) {
            next(error);
        }
    }

    public async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;

            const personId = new PersonId(Number(id));

            await this.useCase.delete(personId);

            return res.status(204).end();
        } catch (error) {
            next(error);
        }
    }
}