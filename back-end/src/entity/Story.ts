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

  @ManyToMany(() => Persona, (persona) => persona.stories)
  @JoinTable()
  personas: Persona[];

  @OneToMany(() => Scene, (scene) => scene.story)
  scenes: Scene[];

  @ManyToOne(() => User, (user) => user.stories, {
    cascade: true
  })
  
  @ManyToMany(() => User, (user) => user.stories)
  editors: [User];
}
