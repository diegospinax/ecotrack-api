import { CreateAchievementDto } from "@/application/dto/achievement/CreateAchievementDto";
import { Achievement } from "@/domain/achievement/Achievement";

export interface CreateAchievementUseCase {
    create(achievementDto: CreateAchievementDto): Promise<Achievement>;
}