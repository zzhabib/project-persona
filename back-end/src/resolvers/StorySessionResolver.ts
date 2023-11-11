import { Arg, Field, InputType, Int, Mutation, Query, Resolver } from "type-graphql";
import { StorySession } from "../entity/play/StorySession";
import { AppDataSource } from "../data-source";

@InputType()
class StorySessionInput {
  @Field(() => Int)
  storyId: number

  @Field(() => Int)
  userId: number
}

@Resolver(StorySession)
export class StorySessionResolver {
  @Mutation(() => StorySession)
  async createStorySession(@Arg('input', () => StorySessionInput) input: StorySessionInput): Promise<StorySession> {
    const storySessionRepository = AppDataSource.getRepository(StorySession)
    const storySession = storySessionRepository.create(input)

    await storySessionRepository.insert(storySession)
    return storySession
  }

  @Mutation(() => Boolean)
  async deleteStorySession(@Arg('id', () => Int) id: number): Promise<Boolean> {
    await StorySession.delete({ id })
    return true
  }

  @Query(() => StorySession)
  async getStorySession(@Arg('id', () => Int) id: number): Promise<StorySession> {
    return StorySession.findOne({ where: { id } })
  }
}