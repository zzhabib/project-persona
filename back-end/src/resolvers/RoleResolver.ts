import { FieldResolver, Resolver, Root } from "type-graphql";
import { Role } from "../entity/Role";
import { Scene } from "../entity/Scene";
import { AppDataSource } from "../data-source";
import { Persona } from "../entity/Persona";
import { Action } from "../entity/Action";

@Resolver(Role)
export class RoleResolver {
  @FieldResolver(() => Scene)
  scene(@Root() role: Role): Promise<Scene> {
    return AppDataSource.getRepository(Scene)
      .createQueryBuilder('scene')
      .where('scene.id = :sceneId', { sceneId: role.sceneId })
      .getOne();
  }

  @FieldResolver(() => Persona)
  persona(@Root() role: Role): Promise<Persona> {
    return AppDataSource.getRepository(Persona)
      .createQueryBuilder('persona')
      .where('persona.id = :personaId', { personaId: role.personaId })
      .getOne();
  }

  @FieldResolver(() => [Action])
  actions(@Root() role: Role): Promise<Action[]> {
    return AppDataSource.getRepository(Action)
      .createQueryBuilder('action')
      .innerJoinAndSelect('action.roles', 'role')
      .where('role.sceneId = :sceneId and role.personaId = :personaId',
        { sceneId: role.sceneId, personaId: role.personaId })
      .getMany();
  }
}