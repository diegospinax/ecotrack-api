import { Challenge } from "@/domain/challenge/Challenge";
import { ChallengeRepository } from "@/domain/challenge/ports/ChallengeRepository";

export class UpdateChallenge {
  constructor(private repository: ChallengeRepository) {}

  async run(challenge: Challenge): Promise<void> {
    return await this.repository.updateChallenge(challenge);
  }
}
