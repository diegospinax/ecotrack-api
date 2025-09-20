import { Achievement } from "../achievement/Achievement";
import { Challenge } from "../challenge/Challenge";
import { Course } from "../course/Course";
import { User } from "../user/User";
import PersonArea from "./value-objects/PersonArea";
import PersonId from "./value-objects/PersonId";
import PersonIsActive from "./value-objects/PersonIsActive";
import PersonLastName from "./value-objects/PersonLastName";
import PersonName from "./value-objects/PersonName";
import PersonProfilePicture from "./value-objects/PersonProfilePicture";

export interface Person {
  id: PersonId;
  name: PersonName;
  lastName: PersonLastName;
  area: PersonArea;
  profilePicture: PersonProfilePicture;
  isActive: PersonIsActive;
  user?: User;
  courses?: Course[];
  challenges?: Challenge[];
  achievements?: Achievement[];
}
