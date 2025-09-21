import { Badge } from "@/domain/achievement/badge/Badge";
import { UpdateBadgeDto } from "../dto/achievement/badge/UpdateBadgeDto";
import { CreateBadgeDto } from "../dto/achievement/badge/CreateBadgeDto";
import BadgeIsActive from "@/domain/achievement/badge/value-objects/BadgeIsActive";

export const updateBadgeFieldsFromDto = (badgeDto: UpdateBadgeDto, currentBadge: Badge): Badge => {
    return {
        id: badgeDto.id,
        name: badgeDto.name ?? currentBadge.name,
        description: badgeDto.description ?? currentBadge.description,
        type: badgeDto.type ?? currentBadge.type,
        isActive: badgeDto.isActive ?? currentBadge.isActive
    }
}

export const createBadgeFromDto = (badgeDto: CreateBadgeDto): Omit<Badge, "id"> => {
    return {
        name: badgeDto.name,
        description: badgeDto.description,
        type: badgeDto.type,
        isActive: new BadgeIsActive(true)
    }
}