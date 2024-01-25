import {
  BaseEntity,
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
import { Action } from "./Action";

@ObjectType()
@Entity()
export class Story extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  description: string;

  @OneToMany(() => Persona, (persona) => persona.story)
  personas: Persona[];

  @OneToMany(() => Action, action => action.story)
  actions: Action[];

  @OneToMany(() => Scene, (scene) => scene.story)
  scenes: Scene[];

  @ManyToOne(() => User, (user) => user.stories, {
    cascade: false
  })
  @ManyToMany(() => User, (user) => user.stories)
  editors: User[];
}
