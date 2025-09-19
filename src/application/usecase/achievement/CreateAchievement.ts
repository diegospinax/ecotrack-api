import { Achievement } from "@/domain/achievement/Achievement";
import { AchievementRepository } from "@/domain/achievement/ports/AchievementRepository";

export class CreateAchievement {
  constructor(private repository: AchievementRepository) {}

  async run(achievement: Achievement): Promise<Achievement> {
    return await this.repository.createAchievement(achievement);
  }
}
