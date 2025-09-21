import { Achievement } from "@/domain/achievement/Achievement";
import AchievementId from "@/domain/achievement/value-objects/AchievementId";
import AchievementDateReceived from "@/domain/achievement/value-objects/AchievementDateReceived";
import PersonId from "@/domain/person/value-objects/PersonId";
import BadgeId from "@/domain/achievement/badge/value-objects/BadgeId";
import { Repository } from "typeorm";
import { AchievementRepository } from "@/domain/achievement/ports/AchievementRepository";
import { AchievementEntity } from "@/infrastructure/entities/achievement/AchievementEntity";
import { AppDataSource } from "@/infrastructure/config/database.postgres";
import { mapBadgeDomainToEntity } from "@/infrastructure/mapper/out/badge-out-mapper";
import { mapEntityToAchievementDomain } from "@/infrastructure/mapper/out/achievement-out-mapper";
import { mapPersonDomainToEntity } from "@/infrastructure/mapper/out/person-out-mapper";

export class AchievementRepositoryAdapter implements AchievementRepository {
    private achievementRepository: Repository<AchievementEntity>

    constructor() {
        this.achievementRepository = AppDataSource.getRepository(AchievementEntity);
    }

    public async create(achievement: Omit<Achievement, "id">): Promise<Achievement> {
        const entity: AchievementEntity = this.achievementRepository.create({
            person: mapPersonDomainToEntity(achievement.person),
            badge: mapBadgeDomainToEntity(achievement.badge),
            dateReceived: achievement.date.value
        });

        const savedAchievement = await this.achievementRepository.save(entity);

        return mapEntityToAchievementDomain(savedAchievement);
    }

    public async findAll(): Promise<Achievement[]> {
        const achievements = await this.achievementRepository.find({
            where: {
                badge: {
                    isActive: true
                },
                person: {
                    isActive: true
                }
            }
        });

        return achievements.map(achievement => mapEntityToAchievementDomain(achievement));
    }

    public async findByPersonIdAndBadgeId(personId: PersonId, badgeId: BadgeId): Promise<Achievement | null> {
        throw new Error("Method not implemented.");
    }
    
    public async findAllByBadgeId(badgeId: BadgeId): Promise<Achievement[]> {
        throw new Error("Method not implemented.");
    }

    public async findAllByPersonId(personId: PersonId): Promise<Achievement[]> {
        const personAchievements = await this.achievementRepository.findBy({
            person: {
                id: personId.value,
                isActive: true
            },
            badge: {
                isActive: true
            }
        });

        return personAchievements.map(achievement => mapEntityToAchievementDomain(achievement));
    }
}