import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Persona } from "./Persona";

@Index("Relations_pkey", ["sourcePersonaId", "targetPersonaId"], {
  unique: true,
})
@Index("fki_F", ["sourcePersonaId"], {})
@Index("fki_targetPersonaId_FK", ["targetPersonaId"], {})
@Entity("Relation", { schema: "public" })
export class Relation {
  @Column("integer", { primary: true, name: "sourcePersonaId" })
  sourcePersonaId: number;

  @Column("integer", { primary: true, name: "targetPersonaId" })
  targetPersonaId: number;

  @Column("char", { name: "description", array: true })
  description: string[];

  @ManyToOne(() => Persona, (persona) => persona.relations, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "sourcePersonaId", referencedColumnName: "id" }])
  sourcePersona: Persona;

  @ManyToOne(() => Persona, (persona) => persona.relations2, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "targetPersonaId", referencedColumnName: "id" }])
  targetPersona: Persona;
}
