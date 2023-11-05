import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Story } from "./Story";
import { Field, Int, ObjectType } from "type-graphql";
import { Role } from "./Role";

@ObjectType()
@Entity()
export class Scene extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  storyId: number;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  description: string;

  @ManyToOne(() => Story, (story) => story.scenes, {
    cascade: true
  })
  @JoinColumn({name: 'storyId'})
  story: Story;

  @OneToMany(() => Role, (role) => role.scene, {
    cascade: true
  })
  roles: Role[]
}
