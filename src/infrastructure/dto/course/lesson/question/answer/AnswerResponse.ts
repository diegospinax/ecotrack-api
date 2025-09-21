export class AnswerResponse {
  constructor(
    public readonly id: number,
    public readonly text: string,
    public readonly isCorrect: boolean
  ) {}
}
