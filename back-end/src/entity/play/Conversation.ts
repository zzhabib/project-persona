import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Scene } from "../edit/Scene";
import { Persona } from "../edit/Persona";
import { Message } from "./Message";
import { StorySession } from "./StorySession";
import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Conversation extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  sceneId: number

  @Column()
  personaId: number

  @Column()
  storySesssionId: number

  @ManyToOne(() => Scene, { cascade: true })
  @JoinColumn({ name: 'sceneId' })
  scene: Scene

  @ManyToOne(() => Persona, { cascade: true })
  @JoinColumn({ name: 'personaId' })
  persona: Persona

  @ManyToOne(() => StorySession, { cascade: true })
  @JoinColumn({ name: 'storySessionId' })
  storySession: StorySession

  @OneToMany(() => Message, message => message.conversation)
  messages: Message[]
}