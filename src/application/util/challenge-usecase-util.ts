import { Challenge } from "@/domain/challenge/Challenge";
import ChallengeIsFinished from "@/domain/challenge/value-objects/ChallengeIsFinished";
import ChallengeTimesDone from "@/domain/challenge/value-objects/ChallengeTimesDone";

export const updateChallengeTimesDone = (existingChallenge: Challenge): Challenge => {
    const newTimesDoneValue: number = existingChallenge.timesDone.value + 1;

    const isFinished = newTimesDoneValue === existingChallenge.task.requiredRepetitions.value;

    return {
        ...existingChallenge,
        timesDone: new ChallengeTimesDone(newTimesDoneValue),
        isFinished: new ChallengeIsFinished(isFinished)
    }
}