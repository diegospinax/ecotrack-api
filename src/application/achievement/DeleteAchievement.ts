import { AchievementRepository } from "@/domain/achievement/ports/AchievementRepository";
import AchievementId from "@/domain/achievement/value-objects/AchievementId";

export class DeleteAchievement {
  constructor(private repository: AchievementRepository) {}

  async run(achievementId: AchievementId): Promise<void> {
    return await this.repository.deleteAchievement(achievementId);
  }
}
