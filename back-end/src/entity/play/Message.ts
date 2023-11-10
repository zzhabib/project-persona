import { BaseEntity, Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn, Timestamp } from "typeorm";
import { Conversation } from "./Conversation";
import { Persona } from "../edit/Persona";
import { Action } from "../edit/Action";

@Entity()
export class Message extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Conversation, conversation => conversation.messages, { cascade: true })
  conversation: Conversation

  @Column({ generated: true })
  createdAt: Timestamp

  @ManyToOne(() => Persona, { cascade: true })
  fromPersona: Persona

  @ManyToMany(() => Action, { cascade: true })
  actions: Action[]

  @Column()
  dialogue: string
}