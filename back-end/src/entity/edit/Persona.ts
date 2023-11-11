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

  @Column()
  storyId: number

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  description: string;

  @ManyToOne(() => Story, (story) => story.personas, { cascade: true })
  @JoinColumn({ name: 'storyId' })
  story: Story;

  @OneToMany(() => Connection, connection => connection.sourcePersona, { cascade: true })
  initiatedConnections: Connection[];

  @OneToMany(() => Connection, connection => connection.targetPersona, { cascade: true })
  receivedConnections: Connection[];
}
