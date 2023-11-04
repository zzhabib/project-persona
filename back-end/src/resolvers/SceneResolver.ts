import { Resolver, Query, Mutation, Arg, InputType, Field, Int, FieldResolver, Root } from "type-graphql";
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

  @Field(() => [RoleInput], { nullable: true })
  roleInputs?: RoleInput[]
}

@InputType()
class SceneUpdateInput {
  @Field(() => Int, { nullable: true })
  storyId?: number

  @Field({ nullable: true })
  title?: string

  @Field({ nullable: true })
  description?: string

  @Field(() => [RoleInput], { nullable: true })
  addRoleInputs?: RoleInput[]

  @Field(() => [RoleUpdateInput], { nullable: true })
  roleUpdateInputs?: RoleUpdateInput[]

  @Field(() => [Int], { nullable: true })
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

  @Field({ nullable: true })
  description?: string

  @Field(() => [Int], { nullable: true })
  addActionIds?: number[]

  @Field(() => [Int], { nullable: true })
  removeActionIds?: number[]
}

function createRolesFromInputs(roleInputs: RoleInput[], sceneId?: number): Role[] {
  return roleInputs.map(input => {
    const actions = input.actionIds.map(actionId => ({id: actionId}))

    return Role.create({
      sceneId: sceneId,
      personaId: input.personaId,
      description: input.description,
      actions: actions
    })
  })
}

@Resolver(Scene)
export class SceneResolver {
  @FieldResolver(() => Story)
  story(@Root() scene: Scene): Promise<Story> {
    return AppDataSource.getRepository(Story)
      .createQueryBuilder('story')
      .where('story.id = :storyId', { storyId: scene.storyId })
      .getOne();
  }

  @FieldResolver(() => [Role])
  roles(@Root() scene: Scene): Promise<Role[]> {
    return AppDataSource.getRepository(Role)
      .createQueryBuilder('role')
      .where('role.sceneId = :sceneId', { sceneId: scene.id })
      .getMany();
  }

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
      relations: {
        roles: true
      }
    })

    const editFields = ['storyId', 'title', 'description'];
    editFields.forEach(field => {
      if (input[field] !== undefined) {
        scene[field] = input[field];
      }
    });

    if (input.addRoleInputs) {
      scene.roles.push(...createRolesFromInputs(input.addRoleInputs, id))
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
      scene.roles = scene.roles.filter(r => !input.removePersonaRoles.includes(r.personaId))
      await AppDataSource
        .getRepository(Role)
        .delete({
          sceneId: id,
          personaId: In(input.removePersonaRoles)
        })
    }

    await scene.save()
    return true
  }

  @Mutation(() => Boolean)
  async deleteScene(@Arg('id', () => Int) id: number) {
    await Scene.delete({ id })
    return true
  }

  @Query(() => [Scene])
  async allScenes() {
    return await Scene.find()
  }

  @Query(() => Scene)
  async getScene(@Arg('id', () => Int) id: number) {
    return await Scene.findOne({
      where: { id },
    })
  }
}