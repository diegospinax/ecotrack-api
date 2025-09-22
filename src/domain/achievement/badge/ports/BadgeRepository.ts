import { Badge } from "../Badge";
import BadgeId from "../value-objects/BadgeId";
import BadgeType from "../value-objects/BadgeType";

export interface BadgeRepository{
    create(badge: Omit<Badge, "id">):Promise<Badge>;
    findAll(): Promise<Badge[]>;
    findById(badgeId: BadgeId): Promise<Badge | null>;
    findAllByType(badgeType: BadgeType): Promise<Badge[]>;
    update(badge: Badge):Promise<void>;
    delete(badgeId: BadgeId):Promise<void>;
}  