import { Challenge } from "@/domain/challenge/Challenge";
import { ChallengeRepository } from "@/domain/challenge/ports/ChallengeRepository";

export class CreateChallenge {
  constructor(private repository: ChallengeRepository) {}

  async run(challenge: Challenge): Promise<Challenge> {
    return await this.repository.createChallenge(challenge);
  }
}
