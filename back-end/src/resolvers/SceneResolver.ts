import { Resolver, Query, Mutation, Arg, InputType, Field, Int } from "type-graphql";
import { Scene } from "../entity/Scene";
import { Story } from "../entity/Story";
import { Role } from "../entity/Role";
import { Action } from "../entity/Action";
import { In, ObjectId } from "typeorm";
import { AppDataSource } from "../data-source";

@InputType()
class SceneInput {
  @Field(() => Int)
  storyId: number

  @Field()
  title: string

  @Field()
  description: string

  @Field(() => [RoleInput])
  roleInputs?: RoleInput[]
}

@InputType()
class SceneUpdateInput {
  @Field(() => Int)
  storyId?: number

  @Field()
  title?: string

  @Field()
  description?: string

  @Field(() => [RoleInput])
  addRoleInputs?: RoleInput[]

  @Field(() => [RoleUpdateInput])
  roleUpdateInputs?: RoleUpdateInput[]

  @Field(() => [Int])
  removePersonaRoles?: number[]
}

@InputType()
class RoleInput {
  @Field(() => Int)
  personaId: number

  @Field()
  description: string

  @Field(() => [Int])
  actionIds: number[]
}

@InputType()
class RoleUpdateInput {
  @Field(() => Int)
  personaId: number

  @Field()
  description?: string

  @Field(() => [Int])
  addActionIds?: number[]

  @Field(() => [Int])
  removeActionIds?: number[]
}

function createRolesFromInputs(roleInputs: RoleInput[]): Role[] {
  return roleInputs.map(input => {
    const actions = input.actionIds.map(actionId => ({id: actionId}))

    return Role.create({
      personaId: input.personaId,
      description: input.description,
      actions: actions
    })
  })
}

@Resolver()
export class SceneResolver {
  @Mutation(() => Scene)
  async createScene(@Arg('input', () => SceneInput) input: SceneInput) {
    const sceneRepository = AppDataSource.getRepository(Scene)
    const scene = sceneRepository.create(input)

    if (input.roleInputs) {
      scene.roles = createRolesFromInputs(input.roleInputs)
    }

    await sceneRepository.insert(scene)
    return scene
  }

  @Mutation(() => Boolean)
  async updateScene(
    @Arg('id', () => Int) id: number,
    @Arg('input', () => SceneUpdateInput) input: SceneUpdateInput
  ) {
    const scene = await Scene.findOne({
      where: { id: id },
    })

    const editFields = ['storyId', 'title', 'description'];
    editFields.forEach(field => {
      if (input[field] !== undefined) {
        scene[field] = input[field];
      }
    });

    if (input.addRoleInputs) {
      scene.roles.push(...createRolesFromInputs(input.addRoleInputs))
    }

    if (input.roleUpdateInputs) {
      // n+1 update query (not ideal)
      input.roleUpdateInputs.forEach(update => {
        AppDataSource
          .getRepository(Role)
          .createQueryBuilder()
          .update()
          .set(update)
          .where("personaId = :id", { id: update.personaId })
          .execute()
      })
    }

    if (input.removePersonaRoles) {
      await AppDataSource
        .getRepository(Role)
        .delete({
          sceneId: id,
          personaId: In(input.removePersonaRoles)
        })
    }

    return true
  }

  @Mutation(() => Boolean)
  async deleteScene(@Arg('id', () => Int) id: number) {
    await Scene.delete({ id })
    return true
  }

  @Query(() => [Scene])
  async allScenes() {
    return await Scene.find({
      relations: {
        roles: {
          persona: true,
          actions: true
        }
      }
    })
  }

  @Query(() => Scene)
  async getScene(@Arg('id', () => Int) id: number) {
    return await Scene.findOne({
      where: { id },
      relations: {
        roles: {
          persona: true,
          actions: true
        }
      }
    })
  }
}