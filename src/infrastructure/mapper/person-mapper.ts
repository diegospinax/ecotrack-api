import { Person } from "@/domain/person/Person";
import { PersonEntity } from "../entities/PersonEntity";
import PersonId from "@/domain/person/value-objects/PersonId";
import PersonName from "@/domain/person/value-objects/PersonName";
import PersonLastName from "@/domain/person/value-objects/PersonLastName";
import PersonArea from "@/domain/person/value-objects/PersonArea";
import PersonProfilePicture from "@/domain/person/value-objects/PersonProfilePicture";
import UserId from "@/domain/user/value-objects/UserId";

export const mapPersonToDomain = (entity: PersonEntity): Person => {
    return {
            id: new PersonId(entity.id),
            name: new PersonName(entity.name),
            lastName: new PersonLastName(entity.lastName),
            area: new PersonArea(entity.area),
            profilePicture: new PersonProfilePicture(entity.profilePicture),
            userId: new UserId(entity.userId)
        };
}

export const mapPersonToEntity = (domain: Person): PersonEntity => {
    return {
            id: domain.id.value,
            name: domain.name.value,
            lastName: domain.lastName.value,
            area: domain.area.value,
            profilePicture: domain.profilePicture.value,
            userId: domain.userId.value
        };
}