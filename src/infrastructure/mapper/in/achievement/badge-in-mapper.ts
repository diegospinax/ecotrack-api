import { CreateBadgeDto } from "@/application/dto/achievement/badge/CreateBadgeDto";
import { UpdateBadgeDto } from "@/application/dto/achievement/badge/UpdateBadgeDto";
import { Badge } from "@/domain/achievement/badge/Badge";
import BadgeDescription from "@/domain/achievement/badge/value-objects/BadgeDescription";
import BadgeId from "@/domain/achievement/badge/value-objects/BadgeId";
import BadgeIsActive from "@/domain/achievement/badge/value-objects/BadgeIsActive";
import BadgeName from "@/domain/achievement/badge/value-objects/BadgeName";
import BadgeType from "@/domain/achievement/badge/value-objects/BadgeType";
import { BadgeRequest } from "@/infrastructure/dto/achievement/badge/BadgeRequest";
import { BadgeResponse } from "@/infrastructure/dto/achievement/badge/BadgeResponse";

export const mapBadgeDomainToResponse = (badge: Badge): BadgeResponse => {
    return {
        id: badge.id.value,
        name: badge.name.value,
        description: badge.description.value,
        type: badge.type.value,
        isActive: badge.isActive.value
    }
}

export const mapBadgeRequestToCreateDto = (request: Omit<BadgeRequest, "isActive">): CreateBadgeDto => {
    return {
        name: new BadgeName(request.name),
        description: new BadgeDescription(request.description),
        type: new BadgeType(request.type)
    }
}   

export const mapBadgeRequestToUpdateDto = (request: Partial<BadgeRequest>, badgeId: BadgeId): UpdateBadgeDto => {
    return {
        id: badgeId,
        ...(request.name && { name: new BadgeName(request.name) }),
        ...(request.description && { description: new BadgeDescription(request.description) }),
        ...(request.type && { type: new BadgeType(request.type) }),
        ...(request.isActive && { isActive: new BadgeIsActive(request.isActive) })
    }
}