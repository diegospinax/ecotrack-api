import { Challenge } from "@/domain/challenge/Challenge";
import ChallengeId from "@/domain/challenge/value-objects/ChallengeId";
import ChallengeIsFinished from "@/domain/challenge/value-objects/ChallengeIsFinished";
import ChallengeTimesDone from "@/domain/challenge/value-objects/ChallengeTimesDone";
import { ChallengeEntity } from "@/infrastructure/entities/challenge/ChallengeEntity";
import { mapEntityToPersonDomain } from "./person-out-mapper";
import { mapEntityToTaskDomain } from "./task-out-mapper";

export const mapEntityToChallengeDomain = (entity: ChallengeEntity): Challenge => {
    return {
        id: new ChallengeId(entity.id),
        person: mapEntityToPersonDomain(entity.person),
        task: mapEntityToTaskDomain(entity.task),
        isFinished: new ChallengeIsFinished(entity.isFinished),
        timesDone: new ChallengeTimesDone(entity.timesDone),
    }
}