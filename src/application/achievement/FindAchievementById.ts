import { Achievement } from "@/domain/achievement/Achievement";
import { AchievementRepository } from "@/domain/achievement/ports/AchievementRepository";
import AchievementId from "@/domain/achievement/value-objects/AchievementId";

export class FindAchievementById {
  constructor(private repository: AchievementRepository) {}

  async run(achievementId: AchievementId): Promise<Achievement> {
    return await this.repository.findById(achievementId);
  }
}
