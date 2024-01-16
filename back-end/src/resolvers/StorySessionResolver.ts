import { Arg, Field, FieldResolver, InputType, Int, Mutation, Query, Resolver, Root } from "type-graphql";
import { StorySession } from "../entity/play/StorySession";
import { AppDataSource } from "../data-source";
import { Story } from "../entity/edit/Story";
import { User } from "../entity/edit/User";

@InputType()
class StorySessionInput {
  @Field(() => Int)
  storyId: number

  @Field(() => Int)
  userId: number

  @Field(() => String, { defaultValue: 'No Name' })
  name: string;
}

@Resolver(StorySession)
export class StorySessionResolver {
  @FieldResolver(() => Story)
  async story(@Root() storySession: StorySession): Promise<Story> {
    return Story.findOne({ where: { id: storySession.storyId } })
  }

  @FieldResolver(() => User)
  async user(@Root() storySession: StorySession): Promise<User> {
    return User.findOne({ where: { id: storySession.userId }})
  }

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

  @Query(() => [StorySession])
  async getUserStorySessions(
    @Arg('userId', () => Int) userId: number,
    @Arg('storyId', () => Int) storyId: number,
  ): Promise<StorySession[]> {
    return StorySession.find({ where: { userId, storyId } })
  }
}