import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSchema } from "type-graphql"
import { AppDataSource } from "./data-source";
import * as dotenv from 'dotenv';
import { UserResolver } from "./resolvers/UserResolver";
import { StoryResolver } from "./resolvers/StoryResolver";
import { PersonaResolver } from "./resolvers/PersonaResolver";
import { SceneResolver } from "./resolvers/SceneResolver";

dotenv.config();

(async () => {
  await AppDataSource.initialize()

  const schema = await buildSchema({
    resolvers: [UserResolver, StoryResolver, PersonaResolver, SceneResolver],
  });

  const server = new ApolloServer({
    schema: schema,
    introspection: true,
    csrfPrevention: true
  })

  const port = parseInt(<string>process.env.PORT, 10) || 3000

  const { url } = await startStandaloneServer(server, {
    listen: { port: port },
  });
  console.log(`Server ready at: ${url}`);
})();