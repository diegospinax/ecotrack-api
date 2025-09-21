import { Badge } from "@/domain/achievement/badge/Badge";

export interface UpdateBadgeUseCase {
    update(badge: Badge): Promise<void>;
}