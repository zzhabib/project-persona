import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Story } from "./Story";
import { Relation } from "./Relation";

@Index("Persona_pkey", ["id"], { unique: true })
@Index("fki_Story", ["storyId"], {})
@Entity("Persona", { schema: "public" })
export class Persona {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("text", { name: "name" })
  name: string;

  @Column("text", { name: "description" })
  description: string;

  @PrimaryGeneratedColumn({ type: "integer", name: "storyId" })
  storyId: number;

  @ManyToOne(() => Story, (story) => story.personas, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "storyId", referencedColumnName: "id" }])
  story: Story;

  @OneToMany(() => Relation, (relation) => relation.sourcePersona)
  relations: Relation[];

  @OneToMany(() => Relation, (relation) => relation.targetPersona)
  relations2: Relation[];
}
