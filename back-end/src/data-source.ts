import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Story } from "./entity/Story"
import { Scene } from "./entity/Scene"
import { Connection } from "./entity/Connection"
import { Persona } from "./entity/Persona"

import * as dotenv from "dotenv"
import { Role } from "./entity/Role"
import { Action } from "./entity/Action"
dotenv.config()
const connectionString = process.env.DATABASE_URL;

export const AppDataSource = new DataSource({
    type: "postgres",
    url: connectionString,
    synchronize: true,
    logging: false,
    entities: [User, Story, Scene, Connection, Persona, Role, Action],
    migrations: [],
    subscribers: [],
})
