import { db } from "../../database.js"
import { resolveFieldMap, hasFields } from "@jenyus-org/graphql-utils";

export const storyResolver = {
  Query: {
    allStories: async () => {
      return db
        .selectFrom('Story')
        .selectAll()
        .execute()
    },

    getStory: async (_, { storyId }, context, info) => {
      const personasRequested = hasFields(info, "Story.personas")

      let personas = {}

      const story = db
        .selectFrom('Story')
        .where('Story.id', '=', storyId)
        .selectAll()
        .executeTakeFirst()

      if (personasRequested) {
        personas = db
          .selectFrom('Persona')
          .where('Persona.storyId', '=', storyId)
          .selectAll()
          .executeTakeFirst()
      }

      return {...story, personas: personas}
    }
  },

  Mutation: {
    createStory: async (userId: number, title: string) => {
      // return createUser(email)
    }
  }
}