import { Badge } from "../Badge";
import BadgeId from "../value-objects/BadgeId";

export interface BadgeRepository{
    createBadge(badge: Badge):Promise<Badge>;
    findById(badgeId: BadgeId):Promise<Badge>;
    updateBadge(badge: Badge):Promise<void>;
    deleteBadge(badgeId: BadgeId):Promise<void>;
}