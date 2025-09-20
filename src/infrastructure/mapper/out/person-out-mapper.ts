import { Person } from "@/domain/person/Person";
import PersonArea from "@/domain/person/value-objects/PersonArea";
import PersonId from "@/domain/person/value-objects/PersonId";
import PersonIsActive from "@/domain/person/value-objects/PersonIsActive";
import PersonLastName from "@/domain/person/value-objects/PersonLastName";
import PersonName from "@/domain/person/value-objects/PersonName";
import PersonProfilePicture from "@/domain/person/value-objects/PersonProfilePicture";
import { PersonEntity } from "@/infrastructure/entities/PersonEntity";

export const mapEntityToPerson = (entity: PersonEntity): Person => {
    return {
            id: new PersonId(entity.id),
            name: new PersonName(entity.name),
            lastName: new PersonLastName(entity.lastName),
            area: new PersonArea(entity.area),
            profilePicture: new PersonProfilePicture(entity.profilePicture),
            isActive: new PersonIsActive(entity.isActive)
        };
}

export const mapPersonToEntity = (domain: Omit<Person, 'id'>): PersonEntity => {
    const personEntity: PersonEntity = new PersonEntity();

    personEntity.name = domain.name.value;
    personEntity.lastName = domain.lastName.value;
    personEntity.area = domain.area.value;
    personEntity.profilePicture = domain.profilePicture.value;
    personEntity.isActive = domain.isActive.value;

    return personEntity;
}

export const mapPersonUpdateToEntity = (domain: Person): PersonEntity => {
    const entity: PersonEntity = new PersonEntity();
    entity.id = domain.id.value;
    entity.name = domain.name.value;
    entity.lastName = domain.lastName.value;
    entity.area = domain.area.value;
    entity.profilePicture = domain.profilePicture.value;
    entity.isActive = domain.isActive.value;
    return entity;
}