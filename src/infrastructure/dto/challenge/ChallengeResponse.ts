import { PersonResponse } from "../person/PersonResponse";
import { TaskResponse } from "../task/TaskResponse";

export class ChallengeResponse {
  constructor(
    public readonly id: number,
    public readonly person: PersonResponse,
    public readonly task: TaskResponse,
    public readonly isFinished: boolean,
    public readonly timesDone: number
  ) {}
}
