import UserId from "@/domain/user/value-objects/UserId";
import PersonId from "./value-objects/PersonId";
import PersonName from "./value-objects/PersonName";
import PersonLastName from "./value-objects/PersonLastName";
import PersonArea from "./value-objects/PersonArea";
import PersonProfilePicture from "./value-objects/PersonProfilePicture";

export interface Person {
  id: PersonId;
  name: PersonName;
  lastName: PersonLastName;
  area: PersonArea;
  profilePicture: PersonProfilePicture;
  userId: UserId;
}
