import { User } from "kysely-codegen";
import { db } from "../database.js";

export async function createUser(email: string) {
  const newUser: Omit<User, 'id'> = {
    email: email
  }

  return await db
    .insertInto('User')
    .values(newUser)
    .execute()
}

export function getUsers() {
  return db
    .selectFrom('User')
    .selectAll()
    .execute()
}