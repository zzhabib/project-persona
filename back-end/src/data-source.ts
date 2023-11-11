import "reflect-metadata"
import * as dotenv from "dotenv"
import { DataSource } from "typeorm"
import { User } from "./entity/edit/User"
import { Story } from "./entity/edit/Story"
import { Scene } from "./entity/edit/Scene"
import { Connection } from "./entity/edit/Connection"
import { Persona } from "./entity/edit/Persona"
import { Role } from "./entity/edit/Role"
import { Action } from "./entity/edit/Action"
import { StorySession } from "./entity/play/StorySession"
import { Conversation } from "./entity/play/Conversation"
import { Message } from "./entity/play/Message"

dotenv.config()
const connectionString = process.env.DATABASE_URL;

export const AppDataSource = new DataSource({
    type: "postgres",
    url: connectionString,
    synchronize: true,
    logging: true,
    entities: [User, Story, Scene, Connection, Persona, Role, Action, StorySession, Conversation, Message],
    migrations: [],
    subscribers: [],
})
