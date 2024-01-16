import { gql } from "@apollo/client"

export const GET_STORY_DETAILS = gql`
  query GetStoryDetails($id: Int!) {
    getStory(id: $id) {
      id
      title
      description

      personas {
        id
        name
        description
      }

      scenes {
        id
        title
        description
      }
    }
  }
`

export const GET_USER_STORY_SESSIONS = gql`
  query GetUserStorySessions($storyId: Int!, $userId: Int!) {
    getUserStorySessions(storyId: $storyId, userId: $userId) {
      id
      story {
        title
      }
      user {
        email
      }
      name
    }
  }
`

export const UPDATE_STORY = gql`
  mutation UpdateStory($input: StoryUpdateInput!, $updateStoryId: Int!) {
    updateStory(input: $input, id: $updateStoryId)
  }
`


export const CREATE_PERSONA = gql`
  mutation CreatePersona($input: PersonaInput!) {
    createPersona(input: $input) {
      name
    }
  }
`

export const CREATE_STORY_SESSION = gql`
  mutation CreateStorySession($input: StorySessionInput!) {
    createStorySession(input: $input) {
      id
    }
  }
`

export const CREATE_SCENE = gql`
  mutation CreateScene($input: SceneInput!) {
    createScene(input: $input) {
      title
    }
  }
`

export const DELETE_PERSONA = gql`
  mutation DeletePersona($deletePersonaId: Int!) {
    deletePersona(id: $deletePersonaId)
  }
`

export const DELETE_SCENE = gql`
  mutation DeleteScene($deleteSceneId: Int!) {
    deleteScene(id: $deleteSceneId)
  }
`

export const DELETE_STORY_SESSION = gql`
  mutation DeleteStorySession($storySessionId: Int!) {
    deleteStorySession(id: $storySessionId)
  }
`
