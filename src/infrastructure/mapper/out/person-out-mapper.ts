import { Person } from "@/domain/person/Person";
import PersonArea from "@/domain/person/value-objects/PersonArea";
import PersonId from "@/domain/person/value-objects/PersonId";
import PersonLastName from "@/domain/person/value-objects/PersonLastName";
import PersonName from "@/domain/person/value-objects/PersonName";
import PersonProfilePicture from "@/domain/person/value-objects/PersonProfilePicture";
import UserId from "@/domain/user/value-objects/UserId";
import { PersonEntity } from "@/infrastructure/entities/PersonEntity";

export const mapEntityToPerson = (entity: PersonEntity): Person => {
    return {
            id: new PersonId(entity.id),
            name: new PersonName(entity.name),
            lastName: new PersonLastName(entity.lastName),
            area: new PersonArea(entity.area),
            profilePicture: new PersonProfilePicture(entity.profilePicture),
            userId: new UserId(entity.userId)
        };
}

export const mapPersonToEntity = (domain: Omit<Person, 'id'>): PersonEntity => {
    const entity: PersonEntity = new PersonEntity();
    entity.name = domain.name.value;
    entity.lastName = domain.lastName.value;
    entity.area = domain.area.value;
    entity.profilePicture = domain.profilePicture.value;
    entity.userId = domain.userId.value;
    return entity;
}

export const mapPersonUpdateToEntity = (domain: Person): PersonEntity => {
    const entity: PersonEntity = new PersonEntity();
    entity.id = domain.id.value;
    entity.name = domain.name.value;
    entity.lastName = domain.lastName.value;
    entity.area = domain.area.value;
    entity.profilePicture = domain.profilePicture.value;
    entity.userId = domain.userId.value;
    return entity;
}