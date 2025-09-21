import PersonArea from "@/domain/person/value-objects/PersonArea";
import PersonId from "@/domain/person/value-objects/PersonId";
import PersonIsActive from "@/domain/person/value-objects/PersonIsActive";
import PersonLastName from "@/domain/person/value-objects/PersonLastName";
import PersonName from "@/domain/person/value-objects/PersonName";
import PersonProfilePicture from "@/domain/person/value-objects/PersonProfilePicture";

export class UpdatePersonDto {
    constructor(
        public readonly id: PersonId,
        public readonly name?: PersonName,
        public readonly lastName?: PersonLastName,
        public readonly area?: PersonArea,
        public readonly profilePicture?: PersonProfilePicture,
        public readonly isActive?: PersonIsActive
    ) { }
}