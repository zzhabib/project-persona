import { Resolver, Query, Mutation, Arg, Field, Int, InputType, FieldResolver, Root } from "type-graphql";
import { AppDataSource } from "../data-source";
import { Persona } from "../entity/edit/Persona";
import { Connection } from "../entity/edit/Connection";
import { Story } from "../entity/edit/Story";

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

  @Field(() => Int)
  storyId: number

  @Field(() => [ConnectionInput], { nullable: true })
  initiatedConnectionInputs?: ConnectionInput[]
}

@InputType()
class PersonaUpdateInput {
  @Field({ nullable: true })
  name?: string

  @Field({ nullable: true })
  description?: string

  @Field(() => [ConnectionInput], { nullable: true })
  addInitiatedConnectionInputs?: ConnectionInput[]

  @Field(() => [ConnectionInput], { nullable: true })
  modifyInitiatedConnectionInputs?: ConnectionInput[]

  @Field(() => [Int], { nullable: true })
  removeInitiatedConnectionIds?: number[]
}

@Resolver(Persona)
export class PersonaResolver {
  @FieldResolver(() => Story)
  story(@Root() persona: Persona): Promise<Story> {
    return AppDataSource.getRepository(Story)
      .createQueryBuilder('story')
      .where('story.id = :storyId', { storyId: persona.storyId })
      .getOne()
  }

  @FieldResolver(() => [Connection])
initiatedConnections(
  @Root() persona: Persona,
  @Arg("targetPersonaId", () => Int, { nullable: true }) targetPersonaId?: number
): Promise<Connection[]> {
  const queryBuilder = AppDataSource.getRepository(Connection)
    .createQueryBuilder('connection')
    .innerJoinAndSelect('connection.sourcePersona', 'persona')
    .where('persona.id = :personaId', { personaId: persona.id });

  if (targetPersonaId !== undefined) {
    queryBuilder.andWhere('connection.targetPersonaId = :targetPersonaId', { targetPersonaId });
  }

  return queryBuilder.getMany();
}

@FieldResolver(() => [Connection])
receivedConnections(
  @Root() persona: Persona,
  @Arg("sourcePersonaId", () => Int, { nullable: true }) sourcePersonaId?: number
): Promise<Connection[]> {
  const queryBuilder = AppDataSource.getRepository(Connection)
    .createQueryBuilder('connection')
    .innerJoinAndSelect('connection.targetPersona', 'persona')
    .where('persona.id = :personaId', { personaId: persona.id });

  if (sourcePersonaId !== undefined) {
    queryBuilder.andWhere('connection.sourcePersonaId = :sourcePersonaId', { sourcePersonaId });
  }

  return queryBuilder.getMany();
}






  
  @Mutation(() => Persona)
  async createPersona(@Arg('input', () => PersonaInput) input: PersonaInput): Promise<Persona> {
    const persona = Persona.create(input);

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
    });
  
    if (!persona) throw new Error(`Persona with id '${id}' was not found.`);
  
    // Change name
    if (input.name) {
      persona.name = input.name;
      await Persona.update({ id: persona.id }, { name: input.name })
    }
  
    // Change description
    if (input.description) {
      persona.description = input.description;
      await Persona.update({ id: persona.id }, { description: input.description })


    }
  
    // Merge initiated connections
    if (input.addInitiatedConnectionInputs) {
      for (const ci of input.addInitiatedConnectionInputs) {
        const existingConnection = persona.initiatedConnections.find(c => c.targetPersonaId === ci.targetPersonaId);
  
        if (existingConnection) {
          // Update existing connection
          existingConnection.description = ci.description;
          await existingConnection.save(); // Save the existing connection
        } else {
          // Create a new connection if it doesn't exist
          const newConnection = Connection.create({
            sourcePersonaId: id,
            targetPersonaId: ci.targetPersonaId,
            description: ci.description,
          });
          await newConnection.save(); // Save the new connection
        }
      }
    }
  
    // Modify initiated connections
    if (input.modifyInitiatedConnectionInputs) {
      for (const ci of input.modifyInitiatedConnectionInputs) {
        const connection = persona.initiatedConnections.find(c => c.targetPersonaId == ci.targetPersonaId);
        if (connection) {
          // Update existing connection
          connection.description = ci.description;
          await connection.save(); // Save the modified connection
        } else {
          throw new Error(`Persona connection from ${persona.id} to ${ci.targetPersonaId} was not found.`);
        }
      }
    }
  
    // Remove connections (optional, depending on your use case)
    if (input.removeInitiatedConnectionIds) {
      await Promise.all(
        input.removeInitiatedConnectionIds.map(async (targetPersonaId) => {
          const connectionToRemove = persona.initiatedConnections.find(c => c.targetPersonaId == targetPersonaId);
          if (connectionToRemove) {
            await connectionToRemove.remove(); // Remove the connection
          }
        })
      );
    }
  
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
    })

    return persona
  }


  @Query(() => Persona)
  async getPersonaByName(@Arg('name', () => String) name: string) {
    const persona = await Persona.findOne({
      where: { name: name },
    })

    return persona
  }

  @Query(() => [Persona])
  async allPersonas() {
    return await Persona.find({})
  }
}