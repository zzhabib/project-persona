import { Field, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./Role";
import { Story } from "./Story";

@ObjectType()
@Entity()
export class Action extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  storyId: number;
  
  @Field()
  @Column()
  name: string

  @ManyToOne(() => Story, (story) => story.actions, {
    cascade: true
  })
  @JoinColumn({ name: 'storyId' })
  story: Story;

  @ManyToMany(() => Role, role => role.actions)
  @JoinTable()
  roles: Role[]
}