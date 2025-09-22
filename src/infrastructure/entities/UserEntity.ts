import { Role } from "../../domain/user/Role";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { PersonEntity } from "./PersonEntity";

@Entity({ name: "users" })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 255, unique: true })
  email!: string;

  @Column({ type: "varchar", length: 255 })
  password!: string;

  @Column({
    type: "enum",
    enum: Role,
    enumName: "user_role",
  })
  role!: Role;

  @OneToOne(() => PersonEntity, (person) => person.user)
  @JoinColumn({name: "person_id"})
  person!: PersonEntity;
}
