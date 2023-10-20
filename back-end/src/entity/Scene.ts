import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Story } from "./Story";
import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Scene extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  description: string;

  @Field(() => Story)
  @ManyToOne(() => Story, (story) => story.scenes, {
    cascade: true
  })
  story: Story;
}
