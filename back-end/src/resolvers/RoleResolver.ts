import { Arg, Field, FieldResolver, InputType, Int, Mutation, Resolver, Root } from "type-graphql";
import { Role } from "../entity/edit/Role";
import { Scene } from "../entity/edit/Scene";
import { AppDataSource } from "../data-source";
import { Persona } from "../entity/edit/Persona";
import { Action } from "../entity/edit/Action";

@InputType()
class RoleInput {
  @Field(() => Int)
  sceneId: number

  @Field(() => Int)
  personaId: number

  @Field()
  description: string

  @Field(() => [Int])
  actionIds: number[]
}

@InputType()
class RoleUpdateInput {
  @Field({ nullable: true })
  description?: string

  @Field(() => [Int], { nullable: true })
  addActionIds?: number[]

  @Field(() => [Int], { nullable: true })
  removeActionIds?: number[]
}

@Resolver(Role)
export class RoleResolver {
  @FieldResolver(() => Scene)
  scene(@Root() role: Role): Promise<Scene> {
    return AppDataSource.getRepository(Scene)
      .createQueryBuilder('scene')
      .where('scene.id = :sceneId', { sceneId: role.sceneId })
      .getOne();
  }

  @FieldResolver(() => Persona)
  persona(@Root() role: Role): Promise<Persona> {
    return AppDataSource.getRepository(Persona)
      .createQueryBuilder('persona')
      .where('persona.id = :personaId', { personaId: role.personaId })
      .getOne();
  }

  @FieldResolver(() => [Action])
  actions(@Root() role: Role): Promise<Action[]> {
    return AppDataSource.getRepository(Action)
      .createQueryBuilder('action')
      .innerJoinAndSelect('action.roles', 'role')
      .where('role.sceneId = :sceneId and role.personaId = :personaId',
        { sceneId: role.sceneId, personaId: role.personaId })
      .getMany();
  }

  @Mutation(() => Role)
  async createRole(@Arg('input', () => RoleInput) input: RoleInput): Promise<Role> {
    const role = await Role.create(input)

    // insert Action cross-references
    AppDataSource
      .createQueryBuilder()
      .insert()
      .into('action_roles_role')
      .values(input.actionIds.map(actionId => {
        actionId: actionId
        roleSceneId: input.sceneId
        rolePersonaId: input.personaId
      }))
      .execute();

    return role
  }

  @Mutation(() => Boolean)
  async updateRole(
    @Arg('sceneId', () => Int) sceneId: number,
    @Arg('personaId', () => Int) personaId: number,
    @Arg('input', () => RoleUpdateInput) input: RoleUpdateInput,
  ): Promise<Boolean> {

    const { addActionIds, removeActionIds, ...updateFields } = input;
    if (Object.entries(updateFields).length > 0) {
      // Modify Role
      await AppDataSource
        .getRepository(Role)
        .createQueryBuilder('role')
        .update(updateFields)
        .where('role."sceneId" = :sceneId and role."personaId" = :personaId', {
          sceneId,
          personaId
        })
        .execute();
    }

    // Remove rows from cross-reference
    if (input.removeActionIds) {
      await AppDataSource
        .createQueryBuilder()
        .delete()
        .from('action_roles_role')
        .where(`
        "roleSceneId" = :sceneId
        and "rolePersonaId" = :personaId
        and "actionId" in (:...removedIds)`, {
          sceneId: sceneId,
          personaId: personaId,
          removedIds: input.removeActionIds
        })
        .execute();
    }

    // insert Action cross-references
    if (input.addActionIds) {
      AppDataSource
        .createQueryBuilder()
        .insert()
        .into('action_roles_role')
        .values(input.addActionIds.map(actionId => ({
          actionId: actionId,
          roleSceneId: sceneId,
          rolePersonaId: personaId
        })))
        .execute();
    }

    return true;
  }

  @Mutation(() => Boolean)
  async deleteRole(
    @Arg('sceneId', () => Int) sceneId: number,
    @Arg('personaId', () => Int) personaId: number,
  ): Promise<Boolean> {
    await Role.delete({ sceneId, personaId })
    return true;
  }
}