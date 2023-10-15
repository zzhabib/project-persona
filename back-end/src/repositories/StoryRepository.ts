import { db } from "../database";

export async function getStoriesByUserId(userId: number) {
  return await db
    .selectFrom('Story')
    .where('Story.ownerId', '=', userId)
    .execute()
}