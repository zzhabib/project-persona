import {
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Persona } from "./Persona";
import { Scene } from "./Scene";
import { User } from "./User";
import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Story {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column()
  title: string;

  @Field(() => [Persona])
  @ManyToMany(() => Persona, (persona) => persona.stories)
  @JoinTable()
  personas: Persona[];

  @Field(() => [Scene])
  @OneToMany(() => Scene, (scene) => scene.story)
  scenes: Scene[];

  @Field(() => [User])
  @ManyToOne(() => User, (user) => user.stories, {
    cascade: true
  })
  @ManyToMany(() => User, (user) => user.stories)
  editors: [User];
}
