import { Badge } from "@/domain/achievement/badge/Badge";
import BadgeId from "@/domain/achievement/badge/value-objects/BadgeId";
import BadgeType from "@/domain/achievement/badge/value-objects/BadgeType";

export interface FindBadgeUseCase {
    findById(badgeId: BadgeId): Promise<Badge>;
    findAll(): Promise<Badge[]>
    findAllByType(badgeType: BadgeType): Promise<Badge[]>
}