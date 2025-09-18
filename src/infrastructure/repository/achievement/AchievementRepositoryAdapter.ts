import { Achievement } from "@/domain/achievement/Achievement";
import AchievementId from "@/domain/achievement/value-objects/AchievementId";
import AchievementDateReceived from "@/domain/achievement/value-objects/AchievementDateReceived";
import PersonId from "@/domain/person/value-objects/PersonId";
import BadgeId from "@/domain/achievement/badge/value-objects/BadgeId";
import { Repository } from "typeorm";
import { AchievementRepository } from "@/domain/achievement/ports/AchievementRepository";
import { AchievementEntity } from "@/infrastructure/entities/achievement/AchievementEntity";
import { AppDataSource } from "@/infrastructure/config/database.postgres";

export class AchievementRepositoryAdapter implements AchievementRepository {
    private achievementRepository: Repository<AchievementEntity>

    constructor() {
        this.achievementRepository = AppDataSource.getRepository(AchievementEntity);
    }

    async createAchievement(achievement: Achievement): Promise<Achievement> {
        try {
            const newachievement = await this.toEntity(achievement);
            const savedachievement = await this.achievementRepository.save(newachievement);
            return this.toDomain(savedachievement);

        } catch (error) {

            console.error("Error creating achievement ", error);
            throw new Error("Error creating achievement");
        }
    }


    async findById(achievementId: AchievementId): Promise<Achievement> {
        try {
            const achievement = await this.achievementRepository.findOne({
                where: { id_achievement: achievementId.value },
            });

            if (!achievement) {
                throw new Error("Achievement not found");
            }

            return this.toDomain(achievement);

        } catch (error) {

            console.error("Error fetching achievement by id: ", error);
            throw new Error("Error fetching achievement by id");

        }
    }

    async updateAchievement(achievement: Achievement): Promise<void> {
        try {

            const achievementUpdate = await this.toEntity(achievement);
            await this.achievementRepository.update(achievementUpdate.id_achievement, achievementUpdate);

        } catch (error) {

            console.error("Error updating achievement:", error);
            throw new Error("Error updating achievement");
        }
    }

    async deleteAchievement(achievementId: AchievementId): Promise<void> {
        try {
            const result = await this.achievementRepository.delete(achievementId.value);

            if (result.affected === 0) {
                throw new Error("Achievement not found");
            }

        } catch (error) {

            console.error("Error deleting achievement:", error);
            throw new Error("Error deleting achievement");
        }
    }

    private toDomain(achievement: AchievementEntity): Achievement {
        return {
            id: new AchievementId(achievement.id_achievement),
            date: new AchievementDateReceived(achievement.DateReceived_Achievement),
            personId: new PersonId(achievement.id_Person),
            badgeId: new BadgeId(achievement.id_Badge),
        }
    }

    private async toEntity(achievement: Achievement): Promise<AchievementEntity> {
        const achievementEntity = new AchievementEntity();
        achievementEntity.DateReceived_Achievement = achievement.date.value;
        achievementEntity.id_Person = achievement.personId.value;
        achievementEntity.id_Badge = achievement.badgeId.value;
        return achievementEntity;
    }
}