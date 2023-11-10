import { Resolver, Query, Mutation, Arg, InputType, Field, Int, FieldResolver, Root } from "type-graphql";
import { Scene } from "../entity/edit/Scene";
import { Story } from "../entity/edit/Story";
import { Role } from "../entity/edit/Role";
import { AppDataSource } from "../data-source";

@InputType()
class SceneInput {
  @Field(() => Int)
  storyId: number

  @Field()
  title: string

  @Field()
  description: string
}

@InputType()
class SceneUpdateInput {
  @Field(() => Int, { nullable: true })
  storyId?: number

  @Field({ nullable: true })
  title?: string

  @Field({ nullable: true })
  description?: string
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