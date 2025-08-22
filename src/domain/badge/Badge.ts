import type { ActionType } from "../types";

export interface Badge {
  id: number;
  name: string;
  description: string;
  type: ActionType;
}