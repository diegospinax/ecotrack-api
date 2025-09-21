import { Badge } from "@/domain/achievement/badge/Badge";
import { PersonResponse } from "../person/PersonResponse";
import { BadgeResponse } from "./badge/BadgeResponse";

export class AchievementResponse {
    constructor(
        public readonly id: number,
        public readonly dateReceived: Date,
        public readonly person: PersonResponse,
        public readonly badge: BadgeResponse
    ) {}
}