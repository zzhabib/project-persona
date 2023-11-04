import { Resolver, Query, Mutation, Arg, Field, Int, InputType } from "type-graphql";
import { AppDataSource } from "../data-source";
import { Persona } from "../entity/Persona";
import { Connection } from "../entity/Connection";

@InputType()
class ConnectionInput {
  @Field(() => Int)
  targetPersonaId: number

  @Field()
  description: string
}

@InputType()
class PersonaInput {
  @Field()
  name: string

  @Field()
  description: string

  @Field(() => [Int], { nullable: true })
  storyIds?: number

  @Field(() => [ConnectionInput], { nullable: true })
  initiatedConnectionInputs?: ConnectionInput[]
}

@InputType()
class PersonaUpdateInput {
  @Field({ nullable: true })
  name?: string

  @Field({ nullable: true })
  description?: string

  @Field(() => [Int], { nullable: true })
  addStoryIds?: number

  @Field(() => [Int], { nullable: true })
  removeStoryIds?: number

  @Field(() => [ConnectionInput], { nullable: true })
  addInitiatedConnectionInputs?: ConnectionInput[]

  @Field(() => [ConnectionInput], { nullable: true })
  modifyInitiatedConnectionInputs?: ConnectionInput[]

  @Field(() => [Int], { nullable: true })
  removeInitiatedConnectionIds?: number[]
}

@Resolver()
export class PersonaResolver {
  @Mutation(() => Persona)
  async createPersona(@Arg('input', () => PersonaInput) input: PersonaInput) {
    const persona = Persona.create({
      name: input.name,
      description: input.description
    });

    // Add connections
    if (input.initiatedConnectionInputs) {
      persona.initiatedConnections = input.initiatedConnectionInputs.map(
        ci => {
          const connection = new Connection()
          connection.targetPersonaId = ci.targetPersonaId
          connection.description = ci.description
          return connection
        }
      )
    }

    await persona.save();
    return persona;
  }

  @Mutation(() => Boolean)
  async updatePersona(
    @Arg('id', () => Int) id: number,
    @Arg('input', () => PersonaUpdateInput) input: PersonaUpdateInput
  ) {
    const persona = await Persona.findOne({
      where: { id: id },
      relations: {
        initiatedConnections: true
      }
    })
    if (!persona) throw new Error(`Persona with id '${id}' was not found.`)

    // Add initiated connections
    if (input.addInitiatedConnectionInputs) {
      const newConnections = input.addInitiatedConnectionInputs.map(
        ci => {
          const connection = new Connection()
          connection.targetPersonaId = ci.targetPersonaId
          connection.description = ci.description
          return connection
        }
      )
      persona.initiatedConnections.push(...newConnections)
    }

    // Modify initiated connections
    if (input.modifyInitiatedConnectionInputs) {
      input.modifyInitiatedConnectionInputs.forEach(
        ci => {
          const connection = persona.initiatedConnections.find(c => c.targetPersonaId == ci.targetPersonaId)
          if (!connection) throw new Error(`Persona connection from ${persona.id} to ${connection.targetPersonaId} was not found.`)
          connection.description = ci.description
        }
      )
    }

    // Remove connections
    if (input.removeInitiatedConnectionIds) {
      persona.initiatedConnections = persona.initiatedConnections.filter(
        c => !input.removeInitiatedConnectionIds.includes(c.targetPersonaId)
      )
    }

    await persona.save();
    return true;
  }

  @Mutation(() => Boolean)
  async deletePersona(@Arg('id', () => Int) id: number) {
    await Persona.delete({ id })
    return true
  }

  @Query(() => Persona)
  async getPersona(@Arg('id', () => Int) id: number) {
    const persona = await Persona.findOne({
      where: { id: id },
      relations: {
        initiatedConnections: {
          targetPersona: true,
        },
        receivedConnections: {
          sourcePersona: true,
        }
      }
    })

    return persona
  }


  @Query(() => Persona)
  async getPersonaByName(@Arg('name', () => String) name: string) {
    const persona = await Persona.findOne({
      where: { name: name },
      relations: {
        initiatedConnections: {
          targetPersona: true,
        },
        receivedConnections: {
          sourcePersona: true,
        }
      }
    })

    return persona
  }

  @Query(() => [Persona])
  async allPersonas() {
    return await Persona.find({
      relations: {
        initiatedConnections: true,
        receivedConnections: true,
      }
    })
  }
}