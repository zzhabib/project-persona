import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Story } from "./Story";
import { Connection } from "./Connection";

@Entity()
export class Persona {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToMany(() => Story, (story) => story.personas)
  stories: [Story];

  @OneToMany(() => Connection, connection => connection.sourcePersona, { cascade: true })
  initiatedConnections: [Connection];

  @OneToMany(() => Connection, connection => connection.targetPersona, { cascade: true })
  receivedConnections: [Connection];
}
