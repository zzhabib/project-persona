import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Story } from "./entity/Story"
import { Scene } from "./entity/Scene"
import { Relation } from "./entity/Relation"
import { Persona } from "./entity/Persona"

import * as dotenv from "dotenv"
dotenv.config()
const connectionString = process.env.DATABASE_URL;

export const AppDataSource = new DataSource({
    type: "postgres",
    url: connectionString,
    synchronize: true,
    logging: false,
    entities: [User, Story, Scene, Relation, Persona],
    migrations: [],
    subscribers: [],
})
