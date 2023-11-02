import { Field, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./Role";

@ObjectType()
@Entity()
export class Action extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number
  
  @Field()
  @Column()
  name: string

  @ManyToMany(() => Role, role => role.actions)
  @JoinTable()
  roles: Role[]
}