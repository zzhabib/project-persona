import { Resolver, Query, Mutation, Arg, Field, Int } from "type-graphql";
import { AppDataSource } from "../data-source";

class PersonaInput {
  @Field()
  name: string

  @Field()
  description: string

  @Field(() => [Int], { nullable: true })
  storyIds?: number

  @Field(() => [Int], { nullable: true })
  initiatedConnectionIds?: number

  @Field(() => [Int], { nullable: true })
  receivedConnectionIds?: number
}

class PersonaUpdateInput {
  @Field({ nullable: true })
  name?: string

  @Field({ nullable: true })
  description?: string

  @Field(() => [Int], { nullable: true })
  addStoryIds?: number

  @Field(() => [Int], { nullable: true })
  removeStoryIds?: number

  @Field(() => [Int], { nullable: true })
  addInitiatedConnectionIds?: number

  @Field(() => [Int], { nullable: true })
  removeInitiatedConnectionIds?: number

  @Field(() => [Int], { nullable: true })
  addReceivedConnectionIds?: number

  @Field(() => [Int], { nullable: true })
  removeReceivedConnectionIds?: number
}


@Resolver()
export class PersonaResolver {
  // async createPersona()
}