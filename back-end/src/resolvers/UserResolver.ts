import { Resolver,Query, Mutation, Arg } from "type-graphql";
import { User } from "../entity/User";
import { AppDataSource } from "../data-source";

@Resolver()
export class UserResolver {
  @Mutation(() => Boolean)
  createUser(
    @Arg('email', () => String) email: string
  ) {
    console.log(email)
    return true;
  }

  @Query(() => String)
  hello() {
    return "Hello World"
  }
}