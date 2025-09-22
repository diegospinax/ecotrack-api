import { CreateChallengeDto } from "@/application/dto/challenge/CreateChallengeDto";
import { Challenge } from "@/domain/challenge/Challenge";
import TaskId from '@/domain/challenge/task/value-objects/TaskId';
import PersonId from '@/domain/person/value-objects/PersonId';
import { ChallengeRequest } from "@/infrastructure/dto/challenge/ChallengeRequest";
import { ChallengeResponse } from "@/infrastructure/dto/challenge/ChallengeResponse";
import { mapTaskDomainToResponse } from "./task-in-mapper";
import { mapPersonDomainToResponse } from "../person-in-mapper";

export const mapChallengeRequestToCreateDto = (request: Omit<ChallengeRequest, "id">): CreateChallengeDto => {
    return {
        personId: new PersonId(request.personId),
        taskId: new TaskId(request.taskId)
    }
}

export const mapChallengeDomainToResponse = (challenge: Challenge): ChallengeResponse => {
    return {
        id: challenge.id.value,
        person: mapPersonDomainToResponse(challenge.person),
        task: mapTaskDomainToResponse(challenge.task),
        isFinished: challenge.isFinished.value,
        timesDone: challenge.timesDone.value,
    }
}