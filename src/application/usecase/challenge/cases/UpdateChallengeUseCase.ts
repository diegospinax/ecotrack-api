import { Challenge } from "@/domain/challenge/Challenge";

export interface UpdateChallengeUseCase {
    update(challenge: Challenge): Promise<void>;
}