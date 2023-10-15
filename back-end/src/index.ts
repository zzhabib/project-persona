import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { readFileSync } from 'fs';
import { userResolver } from './graphql/resolvers/UserResolver.js';
import { createRequire } from 'module';
import dotenv from 'dotenv';

const require = createRequire(import.meta.url);
dotenv.config();

const typeDefs = [
    readFileSync(require.resolve('./graphql/schemas/types.graphql')).toString('utf-8'),
    readFileSync(require.resolve('./graphql/schemas/queries.graphql')).toString('utf-8'),
    readFileSync(require.resolve('./graphql/schemas/mutations.graphql')).toString('utf-8'),
];

const server = new ApolloServer({
    typeDefs,
    resolvers: {...userResolver}
});

var portVar = parseInt(<string>process.env.PORT, 10) || 3000

const { url } = await startStandaloneServer(server, {
    listen: { port: portVar },
});
console.log(`Server ready at: ${url}`);