import {
  BaseEntity,
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Field, Int, ObjectType } from "type-graphql"
import { Story } from "./Story";

@ObjectType()
@Index("User_email_key", ["email"], { unique: true })
@Index("User_pkey", ["id"], { unique: true })
@Entity("User", { schema: "public" })
export class User extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Field()
  @Column("text", { name: "email" })
  email: string;

  @OneToMany(() => Story, (story) => story.owner)
  stories: Story[];
}
