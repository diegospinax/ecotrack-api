import { Badge } from "@/domain/achievement/badge/Badge";
import BadgeDescription from "@/domain/achievement/badge/value-objects/BadgeDescription";
import BadgeId from "@/domain/achievement/badge/value-objects/BadgeId";
import BadgeIsActive from "@/domain/achievement/badge/value-objects/BadgeIsActive";
import BadgeName from "@/domain/achievement/badge/value-objects/BadgeName";
import BadgeType from "@/domain/achievement/badge/value-objects/BadgeType";
import { BadgeEntity } from "@/infrastructure/entities/achievement/BadgeEntity";

export const mapEntityToBadgeDomain = (entity: BadgeEntity): Badge => {
    return {
            id: new BadgeId(entity.id),
            name: new BadgeName(entity.name),
            description: new BadgeDescription(entity.description),
            type: new BadgeType(entity.type),
            isActive: new BadgeIsActive(entity.isActive)
        }
}

export const mapBadgeDomainToEntity = (domain: Badge): BadgeEntity => {
    return {
            id: domain.id.value,
            name: domain.name.value,
            description: domain.description.value,
            type: domain.type.value,
            isActive: domain.isActive.value
        }
}