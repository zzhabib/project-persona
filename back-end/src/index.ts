import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSchema } from "type-graphql"
import { AppDataSource } from "./data-source";
import * as dotenv from 'dotenv';
import { UserResolver } from "./resolvers/UserResolver";
import { StoryResolver } from "./resolvers/StoryResolver";

dotenv.config();

(async () => {
  await AppDataSource.initialize()

  const schema = await buildSchema({
    resolvers: [UserResolver, StoryResolver],
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