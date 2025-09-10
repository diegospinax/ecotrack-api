import { Achievement } from "../Achievement";
import AchievementId from "../value-objects/AchievementId";

export interface AchievementRepository {
  createAchievement(achievement: Achievement): Promise<Achievement>;
  findById(achievementId: AchievementId): Promise<Achievement>;
  updateAchievement(achievement: Achievement): Promise<void>;
  deleteAchievement(achievementId: AchievementId): Promise<void>;
}
