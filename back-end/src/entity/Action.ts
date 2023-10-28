import { Field, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class Action extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number
  
  @Field()
  @Column()
  name: string
}