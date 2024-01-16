import { gql } from "@apollo/client";

export const GET_STORY_SESSION = gql`
  query GetStorySession($storySessionId: Int!) {
    getStorySession(id: $storySessionId) {
      id
      name
      story {
        id
        title
        description
        personas {
          name
          id
          description
        }
      }
    }
  }
`

export const GET_CONVERSATION = gql`
  query GetConversation($secondPersonaId: Int!, $firstPersonaId: Int!, $storySessionId: Int!) {
    getConversation(secondPersonaId: $secondPersonaId, firstPersonaId: $firstPersonaId, storySessionId: $storySessionId) {
      id
      sender {
        id
      }
      createdAt
      text
    }
  }
`