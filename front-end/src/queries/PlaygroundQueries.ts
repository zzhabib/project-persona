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
        scenes {
          id
          title
        }
      }
    }
  }
`

export const GET_CONVERSATION = gql`
  query GetConversation($secondPersonaId: Int!, $firstPersonaId: Int!, $storySessionId: Int!) {
    getConversation(secondPersonaId: $secondPersonaId, firstPersonaId: $firstPersonaId, storySessionId: $storySessionId) {
      id
      createdAt
      text
      scene {
        id
        title
      }
      sender {
        id
        name
      }
    }
  }
`

export const SEND_MESSAGE = gql`
  mutation CreateUserMessage($input: UserMessageInput!) {
    createUserMessage(input: $input) {
      userMessage {
        id
        createdAt
        text
        sender {
          id
          name
        }
        scene {
          id
          title
        }
      }
      replyMessage {
        id
        createdAt
        text
        sender {
          id
          name
        }
        scene {
          id
          title
        }
      }
    }
  }
`