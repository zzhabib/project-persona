import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { readFileSync } from 'fs';
import { join } from 'path';
import { resolvers } from './resolvers';
import { db } from './database.js';
import 'dotenv/config' 
import dotenv from 'dotenv';

dotenv.config();

const typeDefs = [
    readFileSync(join(__dirname, 'types.graphql'), 'utf-8'),
    readFileSync(join(__dirname, 'queries.graphql'), 'utf-8'),
    readFileSync(join(__dirname, 'mutations.graphql'), 'utf-8')
];

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

var portVar = parseInt(<string>process.env.PORT, 10) || 3000

const { url } = await startStandaloneServer(server, {
    listen: { port: portVar },
});
console.log(`Server ready at: ${url}`);