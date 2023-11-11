import { Resolver, Query, Mutation, Arg, FieldResolver, Root, Int } from "type-graphql";
import { User } from "../entity/edit/User";
import { AppDataSource } from "../data-source";
import { StorySession } from "../entity/play/StorySession";

@Resolver(User)
export class UserResolver {
  @FieldResolver(() => [StorySession])
  async storySessions(@Root() user: User): Promise<StorySession[]> {
    return StorySession.find({ where: { userId: user.id } })
  }
    
  @Mutation(() => User)
  async createUser(
    @Arg('email', () => String) email: string
  ) {
    const user = await User.create({
      email
    }).save()

    return user;
  }

  @Query(() => User)
  async getUser(@Arg('id', () => Int) id: number): Promise<User> {
    return User.findOne({ where: { id } })
  }

  @Query(() => [User])
  async allUsers() {
    return User.find();
  }
}