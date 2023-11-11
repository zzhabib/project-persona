import { Resolver, Query, Mutation, Arg, InputType, Field, Int, FieldResolver, Root } from "type-graphql";
import { Story } from "../entity/edit/Story";
import { AppDataSource } from "../data-source";
import { Persona } from "../entity/edit/Persona";
import { Scene } from "../entity/edit/Scene";
import { User } from "../entity/edit/User";
import { In } from "typeorm";
import { Action } from "../entity/edit/Action";

@InputType()
class StoryInput {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field(() => [Int], { nullable: true })
  editorIds?: number[];
}

@InputType()
class StoryUpdateInput {
  @Field(() => String, { nullable: true })
  title?: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => [Int], { nullable: true })
  addEditorIds?: number[];

  @Field(() => [Int], { nullable: true })
  removeEditorIds?: number[];
}

@Resolver(Story)
export class StoryResolver {
  @FieldResolver(() => [Action])
  actions(@Root() story: Story): Promise<Action[]> {
    return AppDataSource
      .getRepository(Action)
      .createQueryBuilder('action')
      .where('action.storyId = :storyId', { storyId: story.id })
      .getMany();
  }

  @FieldResolver(() => [Persona])
  personas(@Root() story: Story): Promise<Persona[]> {
    return AppDataSource.getRepository(Persona)
      .createQueryBuilder('persona')
      .where('persona.storyId = :storyId', { storyId: story.id })
      .getMany();
  }

  @FieldResolver(() => [Scene])
  scenes(@Root() story: Story): Promise<Scene[]> {
    return AppDataSource.getRepository(Scene)
      .createQueryBuilder('scene')
      .innerJoinAndSelect('scene.story', 'story')
      .where('story.id = :storyId', { storyId: story.id })
      .getMany();
  }

  @FieldResolver(() => [User])
  editors(@Root() story: Story): Promise<User[]> {
    return AppDataSource.getRepository(User)
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.stories', 'story')
      .where('story.id = :storyId', { storyId: story.id })
      .getMany();
  }

  @Mutation(() => Story)
  async createStory(@Arg('input', () => StoryInput) input: StoryInput) {
    const story = Story.create({
      title: input.title,
      description: input.description
    });

    if (input.editorIds) {
      story.editors = await User.findBy({ id: In(input.editorIds) })
    }

    await story.save();
    return story;
  }

  @Mutation(() => Boolean)
  async updateStory(
    @Arg('id', () => Int) id: number,
    @Arg('input', () => StoryUpdateInput) input: StoryUpdateInput
  ) {
    const story = await Story.findOne({
      where: { id: id },
      relations: {
        personas: true,
        scenes: true,
        editors: true,
      }
    })
    if (!story) throw new Error('Story not found');

    if (input.title) story.title = input.title;
    if (input.description) story.description = input.description;

    // Add/remove editors
    if (input.addEditorIds) {
      const addEditors = await User.findBy({ id: In(input.addEditorIds) });
      story.editors.push(...addEditors)
    }
    if (input.removeEditorIds) {
      story.editors = story.editors.filter(e => !input.removeEditorIds.includes(e.id))
    }

    await story.save();
    return true;
  }

  @Mutation(() => Boolean)
  async deleteStory(@Arg('id', () => Int) id: number) {
    await Story.delete({ id })
    return true
  }

  @Query(() => Story)
  async getStory(@Arg('id', () => Int) id: number) {
    return await Story.findOne({
      where: { id: id },
    })
  }

  @Query(() => [Story])
  async allStories() {
    return await Story.find()
  }
}