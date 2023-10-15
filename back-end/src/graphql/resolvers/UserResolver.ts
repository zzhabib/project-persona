import { getUsers, createUser } from "../../repositories/UserRepository.js"

export const userResolver = {
  Query: {
    allUsers: async () => {
      return getUsers()
    }
  },

  Mutation: {
    createUser: async (email: string) => {
      return createUser(email)
    }
  }
}