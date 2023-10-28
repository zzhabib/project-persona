import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { Persona } from "./Persona";
import { Scene } from "./Scene";
import { Action } from "./Action";

@ObjectType()
@Entity()
export class Role extends BaseEntity {
  @PrimaryColumn()
  sceneId: number

  @PrimaryColumn()
  personaId: number

  @Field(() => Scene)
  @ManyToOne(() => Scene, (scene) => scene.roles)
  @JoinColumn({ name: 'sceneId' })
  scene: Scene

  @Field(() => Persona)
  @ManyToOne(() => Persona, { cascade: true })
  @JoinColumn({ name: 'personaId' })
  persona: Persona

  @Field(() => [Action])
  @ManyToMany(() => Action)
  actions: Action[]
}