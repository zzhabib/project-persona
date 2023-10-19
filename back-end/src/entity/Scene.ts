import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Story } from "./Story";

@Index("Scene_pkey", ["id"], { unique: true })
@Entity("Scene", { schema: "public" })
export class Scene {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("text", { name: "title" })
  title: string;

  @Column("text", { name: "description" })
  description: string;

  @ManyToOne(() => Story, (story) => story.scenes, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "storyId", referencedColumnName: "id" }])
  story: Story;
}
