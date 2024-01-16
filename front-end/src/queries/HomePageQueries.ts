import { gql } from "@apollo/client";



export const GET_USER_STORIES = gql`
  query GetUserStories($id: Int!) {
    getUser(id: $id) {
      stories {
        id
        title
        description
      }
    }
  }
`

export const CREATE_STORY = gql`
  mutation CreateStory($input: StoryInput!) {
    createStory(input: $input) {
      id
    }
  }
`

export const DELETE_STORY = gql`
  mutation Mutation($deleteStoryId: Int!) {
    deleteStory(id: $deleteStoryId)

  }
`