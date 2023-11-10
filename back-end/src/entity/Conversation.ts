import { BaseEntity, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Scene } from "./Scene";
import { Persona } from "./Persona";
import { Player } from "./Player";
import { Message } from "./Message";

@Entity()
export class Conversation extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Scene, { cascade: true })
  scene: Scene

  @ManyToOne(() => Persona, { cascade: true })
  persona: Persona

  @ManyToOne(() => Player, player => player.conversations,{ cascade: true })
  player: Player

  @OneToMany(() => Message, message => message.conversation)
  messages: Message[]
}