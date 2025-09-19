import { Achievement } from "@/domain/achievement/Achievement";
import { AchievementRepository } from "@/domain/achievement/ports/AchievementRepository";

export class UpdateAchievement {
  constructor(private repository: AchievementRepository) {}

  async run(achievement: Achievement): Promise<void> {
    return await this.repository.updateAchievement(achievement);
  }
}
