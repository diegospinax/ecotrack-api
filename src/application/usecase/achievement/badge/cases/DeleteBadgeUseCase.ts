import BadgeId from "@/domain/achievement/badge/value-objects/BadgeId";

export interface DeleteBadgeUseCase {
    delete(badgeId: BadgeId): Promise<void>;
}