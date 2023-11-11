import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Story } from "../edit/Story";
import { User } from "../edit/User";
import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class StorySession extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  storyId: number

  @Column()
  userId: number

  @ManyToOne(() => Story, { cascade: true })
  @JoinColumn({ name: 'storyId' })
  story: Story

  @ManyToOne(() => User, { cascade: true })
  @JoinColumn({ name: 'userId' })
  user: User
}