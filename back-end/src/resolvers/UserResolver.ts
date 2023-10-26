import { Resolver,Query, Mutation, Arg } from "type-graphql";
import { User } from "../entity/User";
import { AppDataSource } from "../data-source";

@Resolver()
export class UserResolver {
  @Mutation(() => User)
  async createUser(
    @Arg('email', () => String) email: string
  ) {
    const user = await User.create({
      email
    }).save()

    return user;
  }

  @Query(() => [User])
  async users() {
    return User.find({
      relations: {
        stories: true
      }
    });
  }
}