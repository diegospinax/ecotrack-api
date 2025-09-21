import { CreateChallengeDto } from "@/application/dto/challenge/CreateChallengeDto";
import { Challenge } from "@/domain/challenge/Challenge";

export interface CreateChallengeUseCase {
    create(challengeDto: CreateChallengeDto): Promise<Challenge>;
}