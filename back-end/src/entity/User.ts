import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Story } from "./Story";

@Index("User_email_key", ["email"], { unique: true })
@Index("User_pkey", ["id"], { unique: true })
@Entity("User", { schema: "public" })
export class User {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("text", { name: "email" })
  email: string;

  @OneToMany(() => Story, (story) => story.owner)
  stories: Story[];
}
