import { DB } from 'kysely-codegen'
import pkg from 'pg'
const { Pool } = pkg
import { Kysely, PostgresDialect } from 'kysely'
import dotenv from 'dotenv';
dotenv.config();

const connectionString = process.env.DATABASE_URL;

const dialect = new PostgresDialect({
  pool: new Pool({
    connectionString: connectionString,
    max: 10,
  })
})

// Database interface is passed to Kysely's constructor, and from now on, Kysely 
// knows your database structure.
// Dialect is passed to Kysely's constructor, and from now on, Kysely knows how 
// to communicate with your database.
export const db = new Kysely<DB>({
  dialect,
})