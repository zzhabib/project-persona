import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Persona } from "./Persona";

@Entity()
export class Connection {
  @PrimaryColumn()
  sourcePersonaId: number;

  @PrimaryColumn()
  targetPersonaId: number;

  @ManyToOne(() => Persona, (persona) => persona.initiatedConnections)
  @JoinColumn({ name: 'sourcePersonaId' })
  sourcePersona: Persona;
  
  @ManyToOne(() => Persona, (persona) => persona.receivedConnections)
  @JoinColumn({ name: 'targetPersonaId' })
  targetPersona: Persona;

  @Column()
  description: string;
}
