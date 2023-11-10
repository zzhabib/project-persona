import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Conversation } from "./Conversation";

@Entity()
export class Player extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @OneToMany(() => Conversation, conv => conv.player)
  conversations: Conversation[]
}