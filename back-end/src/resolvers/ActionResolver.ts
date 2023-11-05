import { Arg, Field, InputType, Int, Mutation, Resolver } from "type-graphql";
import { Action } from "../entity/Action";
import { AppDataSource } from "../data-source";

@InputType()
class ActionInput {
  @Field(() => Int)
  storyId: number

  @Field()
  name: string
}

@InputType()
class ActionUpdateInput {
  @Field({ nullable: true })
  name?: string
}

@Resolver(Action)
export class ActionResolver {
  @Mutation(() => Action)
  async createAction(@Arg('input', () => ActionInput) input: ActionInput): Promise<Action> {
    const action = Action.create({
      storyId: input.storyId,
      name: input.name
    })

    await action.save()
    return action
  }

  @Mutation(() => Boolean)
  async updateAction(
    @Arg('id', () => Int) id: number,
    @Arg('input', () => ActionUpdateInput) input: ActionUpdateInput
  ): Promise<Boolean> {
    const result = await AppDataSource
      .getRepository(Action)
      .createQueryBuilder()
      .update(Action)
      .set(input)
      .where('id = :id', { id })
      .execute();
    
    return result.affected > 0
  }

  @Mutation(() => Boolean)
  async deleteAction(@Arg('id', () => Int) id: number): Promise<Boolean> {
    await Action.delete({ id: id })
    return true;
  }
}