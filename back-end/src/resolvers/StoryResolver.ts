import { Resolver, Query, Mutation, Arg, InputType, Field, Int } from "type-graphql";
import { Story } from "../entity/Story";
import { AppDataSource } from "../data-source";

@InputType()
class StoryInput {
  @Field()
  title?: string;

  @Field()
  description?: string;
}

@Resolver()
export class StoryResolver {
  @Mutation(() => Story)
  async createStory(@Arg('input', () => StoryInput) input: StoryInput) {
    // TODO: currently this requires all values to be filled
    
    const result = await AppDataSource
      .createQueryBuilder()
      .insert()
      .into(Story)
      .values([input])
      .execute()
    
    const insertedId = result.identifiers[0].id;
    const story = await AppDataSource.getRepository(Story).findOne(insertedId);

    return story
  }

  @Mutation(() => Boolean)
  async updateStory(
    @Arg('id', () => Int) id: number,
    @Arg('input', () => StoryInput) input: StoryInput
  ) {
    await Story.update({ id }, input)
    return true
  }

  @Mutation(() => Boolean)
  async deleteStory(@Arg('id', () => Int) id: number) {
    await Story.delete({ id })
    return true
  }

  @Query(() => [Story])
  async stories() {
    return await Story.find();
  }
}