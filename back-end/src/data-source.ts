import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/edit/User"
import { Story } from "./entity/edit/Story"
import { Scene } from "./entity/edit/Scene"
import { Connection } from "./entity/edit/Connection"
import { Persona } from "./entity/edit/Persona"

import * as dotenv from "dotenv"
import { Role } from "./entity/edit/Role"
import { Action } from "./entity/edit/Action"
dotenv.config()
const connectionString = process.env.DATABASE_URL;

export const AppDataSource = new DataSource({
    type: "postgres",
    url: connectionString,
    synchronize: true,
    logging: true,
    entities: [User, Story, Scene, Connection, Persona, Role, Action],
    migrations: [],
    subscribers: [],
})
