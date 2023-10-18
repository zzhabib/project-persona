import { db } from "../database";

export async function getStoriesByUserId(userId: number) {
  return await db
    .selectFrom('Story')
    .where('Story.ownerId', '=', userId)
    .execute()
}

export async function createStory(userId: number, title: string) {
  return await db
    .insertInto('Story')
    .values({
      ownerId: userId,
      title: title,
    })
    .execute()
}