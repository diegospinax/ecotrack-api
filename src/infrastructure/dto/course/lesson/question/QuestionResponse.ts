import { AnswerResponse } from "./answer/AnswerResponse";


export class QuestionResponse {
  constructor(
    public readonly id: number,
    public readonly text: string,
    public readonly answers: AnswerResponse[],
  ) {}
}
