import { Badge } from "@/domain/achievement/badge/Badge";
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