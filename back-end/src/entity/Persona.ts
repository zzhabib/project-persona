import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Story } from "./Story";
import { Connection } from "./Connection";
import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Persona extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  description: string;

  @Field(() => [Story])
  @ManyToMany(() => Story, (story) => story.personas)
  stories: [Story];

  @Field(() => [Connection])
  @OneToMany(() => Connection, connection => connection.sourcePersona, { cascade: true })
  initiatedConnections: Connection[];

  @Field(() => [Connection])
  @OneToMany(() => Connection, connection => connection.targetPersona, { cascade: true })
  receivedConnections: Connection[];
}
