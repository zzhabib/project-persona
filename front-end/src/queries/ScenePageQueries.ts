import { gql } from "@apollo/client"



export const GET_SCENE_DATA = gql`
query GetScene($getSceneId: Int!) {
  getScene(id: $getSceneId) {
    story {
      id
    }
    description
    id
    title
    roles {
      persona {
        name
        id
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



export const ADD_ROLE = gql`
mutation CreateRole($input: RoleInput!) {
  createRole(input: $input) {
    persona {
      id
    }
    scene {
      title
    }
  }
}
`



export const DELETE_ROLE = gql`
mutation DeleteRole($personaId: Int!, $sceneId: Int!) {
  deleteRole(personaId: $personaId, sceneId: $sceneId)
}
`