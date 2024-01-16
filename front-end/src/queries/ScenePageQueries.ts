import { gql } from "@apollo/client"



export const GET_SCENE_DATA = gql`
query GetScene($getSceneId: Int!) {
  getScene(id: $getSceneId) {
    description
    id
    title
    roles {
      persona {
        name
      }
    }
  }
}
`


export const UPDATE_SCENE = gql`
mutation UpdateScene($input: SceneUpdateInput!, $updateSceneId: Int!) {
  updateScene(input: $input, id: $updateSceneId)
}
`