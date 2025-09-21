import { CreateBadgeDto } from "@/application/dto/achievement/badge/CreateBadgeDto";
import { Badge } from "@/domain/achievement/badge/Badge";

export interface CreateBadgeUseCase {
    create(badgeDto: CreateBadgeDto): Promise<Badge>;
}