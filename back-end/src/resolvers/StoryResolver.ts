import { Resolver, Query, Mutation, Arg, InputType, Field, Int } from "type-graphql";
import { Story } from "../entity/Story";
import { AppDataSource } from "../data-source";
import { Persona } from "../entity/Persona";
import { Scene } from "../entity/Scene";
import { User } from "../entity/User";
import { In } from "typeorm";

@InputType()
class StoryInput {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field(() => [Int], { nullable: true })
  personaIds?: number[];

  @Field(() => [Int], { nullable: true })
  sceneIds?: number[];

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
  addPersonaIds?: number[];

  @Field(() => [Int], { nullable: true })
  removePersonaIds?: number[];

  @Field(() => [Int], { nullable: true })
  addSceneIds?: number[];

  @Field(() => [Int], { nullable: true })
  removeSceneIds?: number[];

  @Field(() => [Int], { nullable: true })
  addEditorIds?: number[];

  @Field(() => [Int], { nullable: true })
  removeEditorIds?: number[];
}

@Resolver()
export class StoryResolver {
  @Mutation(() => Story)
  async createStory(@Arg('input', () => StoryInput) input: StoryInput) {
    const story = Story.create({
      title: input.title,
      description: input.description
    });

    if (input.personaIds) {
      story.personas = await Persona.findBy({id: In(input.personaIds)})
    }
    if (input.sceneIds) {
      story.scenes = await Scene.findBy({id: In(input.sceneIds)})
    }
    if (input.editorIds) {
      story.editors = await User.findBy({ id: In(input.editorIds) })
    }

    await story.save();
    return story;
  }

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

    // Add/remove personas
    if (input.addPersonaIds) {
      const addPersonas = await Persona.findBy({ id: In(input.addPersonaIds) });
      story.personas.push(...addPersonas);
    }
    if (input.removePersonaIds) {
      story.personas = story.personas.filter(p => !input.removePersonaIds.includes(p.id));
    }
    
    // Add/remove scenes
    if (input.addSceneIds) {
      const addScenes = await Scene.findBy({ id: In(input.addSceneIds) });
      story.scenes.push(...addScenes)
    }
    if (input.removeSceneIds) {
      story.scenes = story.scenes.filter(s => !input.removeSceneIds.includes(s.id))
    }

    // Add/remove editors
    if (input.addEditorIds) {
      const addEditors = await User.findBy({ id: In(input.addEditorIds) });
      story.editors.push(...addEditors)
    }
    if (input.removeSceneIds) {
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

  @Query(() => [Story])
  async stories() {
    return await Story.find({
      relations: {
        personas: true,
        scenes: true,
        editors: true
      }
    })
  }
}