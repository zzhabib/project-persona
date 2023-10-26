import { Resolver, Query, Mutation, Arg, InputType, Field, Int } from "type-graphql";
import { Story } from "../entity/Story";
import { AppDataSource } from "../data-source";

@InputType()
class StoryInput {
  @Field()
  title: string;

  @Field()
  description: string;
}

@InputType()
class StoryUpdateInput {
  @Field(() => String, { nullable: true })
  title?: string;

  @Field(() => String, { nullable: true })
  description?: string;
}

@Resolver()
export class StoryResolver {
  @Mutation(() => Story)
  async createStory(@Arg('input', () => StoryInput) input: StoryInput) {
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
    @Arg('input', () => StoryUpdateInput) input: StoryUpdateInput
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