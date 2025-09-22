import { CreateAchievementDto } from "@/application/dto/achievement/CreateAchievementDto";
import { Achievement } from "@/domain/achievement/Achievement";
import BadgeId from "@/domain/achievement/badge/value-objects/BadgeId";
import PersonId from "@/domain/person/value-objects/PersonId";
import { AchievementRequest } from "@/infrastructure/dto/achievement/AchievementRequest";
import { AchievementResponse } from "@/infrastructure/dto/achievement/AchievementResponse";

import { mapBadgeDomainToResponse } from "./badge-in-mapper";
import { mapPersonDomainToResponse } from "../person-in-mapper";

export const mapAchievementRequestToCreateDto = (request: AchievementRequest): CreateAchievementDto => {
    return {
        personId: new PersonId(request.personId),
        badgeId: new BadgeId(request.badgeId)
    }
}

export const mapAchievementDomainToResponse = (achievement: Achievement): AchievementResponse => {
    return {
        id: achievement.id.value,
        dateReceived: achievement.dateReceived.value,
        person: mapPersonDomainToResponse(achievement.person),
        badge: mapBadgeDomainToResponse(achievement.badge)
    }
}