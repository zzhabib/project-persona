import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Conversation } from "./Conversation";
import { Persona } from "../edit/Persona";
import { Action } from "../edit/Action";
import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Message extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  conversationId: number

  @Column()
  fromPersonaId: number

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date
  
  @Field()
  @Column()
  dialogue: string
  
  @ManyToOne(() => Conversation, conversation => conversation.messages, { cascade: true })
  @JoinColumn({ name: 'conversationId' })
  conversation: Conversation

  @ManyToOne(() => Persona, { cascade: true })
  @JoinColumn({ name: 'fromPersonaId' })
  fromPersona: Persona

  @ManyToMany(() => Action, { cascade: true })
  actions: Action[]
}