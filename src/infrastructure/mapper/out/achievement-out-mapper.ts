import { Achievement } from "@/domain/achievement/Achievement";
import AchievementId from "@/domain/achievement/value-objects/AchievementId";
import { AchievementEntity } from "@/infrastructure/entities/achievement/AchievementEntity";
import { mapEntityToPersonDomain } from "./person-out-mapper";
import { mapEntityToBadgeDomain } from "./badge-out-mapper";
import AchievementDateReceived from "@/domain/achievement/value-objects/AchievementDateReceived";

export const mapEntityToAchievementDomain = (entity: AchievementEntity): Achievement => {
    return {
        id: new AchievementId(entity.id),
        person: mapEntityToPersonDomain(entity.person),
        badge: mapEntityToBadgeDomain(entity.badge),
        dateReceived: new AchievementDateReceived(entity.dateReceived)
    }
}