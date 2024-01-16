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