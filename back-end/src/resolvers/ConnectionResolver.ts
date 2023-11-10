import { FieldResolver, Resolver, Root } from "type-graphql";
import { Connection } from "../entity/edit/Connection";
import { Persona } from "../entity/edit/Persona";
import { AppDataSource } from "../data-source";

@Resolver(Connection)
export class ConnectionResolver {
  @FieldResolver(() => Persona)
  sourcePersona(@Root() connection: Connection): Promise<Persona> {
    return AppDataSource.getRepository(Persona)
      .createQueryBuilder('persona')
      .where('persona.id = :personaId', { personaId: connection.sourcePersonaId })
      .getOne();
  }

  @FieldResolver(() => Persona)
  targetPersona(@Root() connection: Connection): Promise<Persona> {
    return AppDataSource.getRepository(Persona)
      .createQueryBuilder('persona')
      .where('persona.id = :personaId', { personaId: connection.targetPersonaId })
      .getOne();
  }
}