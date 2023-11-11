import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Persona } from "../edit/Persona";
import { Action } from "../edit/Action";
import { Field, Int, ObjectType } from "type-graphql";
import { Scene } from "../edit/Scene";
import { StorySession } from "./StorySession";

/**
 * A message stated from one persona to another in a certain scene.
 */
@ObjectType()
@Entity()
export class Message extends BaseEntity {
  // Primitive Fields

  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  storySessionId: number

  @Column()
  sceneId: number

  @Column()
  senderId: number

  @Column()
  recipientId: number

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date
  
  @Field()
  @Column()
  text: string

  // Relations
  @ManyToOne(() => StorySession, storySession => storySession.messages, { cascade: true })
  @JoinColumn({ name: 'storySessionId' })
  storySession: StorySession

  @ManyToOne(() => Scene, { cascade: true })
  @JoinColumn({ name: 'sceneId' })
  scene: Scene

  @ManyToOne(() => Persona, { cascade: true })
  @JoinColumn({ name: 'senderId' })
  sender: Persona

  @ManyToOne(() => Persona, { cascade: true })
  @JoinColumn({ name: 'recipientId' })
  recipient: Persona

  @ManyToMany(() => Action, { cascade: true })
  actions: Action[]
}