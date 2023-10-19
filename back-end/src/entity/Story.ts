import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Persona } from "./Persona";
import { Scene } from "./Scene";
import { User } from "./User";

@Index("Story_pkey", ["id"], { unique: true })
@Entity("Story", { schema: "public" })
export class Story {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("text", { name: "title" })
  title: string;

  @OneToMany(() => Persona, (persona) => persona.story)
  personas: Persona[];

  @OneToMany(() => Scene, (scene) => scene.story)
  scenes: Scene[];

  @ManyToOne(() => User, (user) => user.stories, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "ownerId", referencedColumnName: "id" }])
  owner: User;
}
