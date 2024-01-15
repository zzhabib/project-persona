import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Story } from "../edit/Story";
import { User } from "../edit/User";
import { Field, Int, ObjectType } from "type-graphql";
import { Message } from "./Message";

@ObjectType()
@Entity()
export class StorySession extends BaseEntity {
  // Primitive Fields

  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number

  @Field()
  @Column()
  name: string;

  @Column()
  storyId: number

  @Column()
  userId: number

  // Relations

  @ManyToOne(() => Story, { cascade: true })
  @JoinColumn({ name: 'storyId' })
  story: Story

  @ManyToOne(() => User, { cascade: true })
  @JoinColumn({ name: 'userId' })
  user: User

  @OneToMany(() => Message, message => message.storySession)
  messages: Message[]
}