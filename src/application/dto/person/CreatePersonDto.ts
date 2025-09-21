import PersonArea from "@/domain/person/value-objects/PersonArea";
import PersonLastName from "@/domain/person/value-objects/PersonLastName";
import PersonName from "@/domain/person/value-objects/PersonName";
import PersonProfilePicture from "@/domain/person/value-objects/PersonProfilePicture";
import { CreateUserDto } from "../user/CreateUserDto";

export class CreatePersonDto {
    constructor(
        public readonly name: PersonName,
        public readonly lastName: PersonLastName,
        public readonly area: PersonArea,
        public readonly profilePicture: PersonProfilePicture,
        public readonly user: CreateUserDto
    ) {}
}