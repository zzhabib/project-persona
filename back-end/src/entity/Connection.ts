import { BaseEntity, Column, Entity, Index, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Persona } from "./Persona";
import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Connection extends BaseEntity {
  @PrimaryColumn()
  sourcePersonaId: number;

  @PrimaryColumn()
  targetPersonaId: number;

  @Field()
  @Column()
  description: string;

  @ManyToOne(() => Persona, (persona) => persona.initiatedConnections)
  @JoinColumn({ name: 'sourcePersonaId' })
  sourcePersona: Persona;
  
  @ManyToOne(() => Persona, (persona) => persona.receivedConnections)
  @JoinColumn({ name: 'targetPersonaId' })
  targetPersona: Persona;
}
