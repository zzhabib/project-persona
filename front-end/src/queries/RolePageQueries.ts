import { gql } from "@apollo/client"



export const GET_ROLE_DATA = gql`
query Roles($getSceneId: Int!) {
    getScene(id: $getSceneId) {
      story {
        id
      }
      roles {
        actions {
          name
          id
        }
        persona {
          id
          name
        }
        description
      }
    }
  }
`


export const UPDATE_ROLE = gql`
mutation UpdateRole($input: RoleUpdateInput!, $sceneId: Int!, $personaId: Int!) {
    updateRole(input: $input, sceneId: $sceneId, personaId: $personaId)
  }
  
`


export const CREATE_ACTION = gql`
mutation CreateAction($input: ActionInput!) {
  createAction(input: $input) {
    id
    name
  }
}
`


export const DELETE_ACTION = gql`
mutation DeleteAction($deleteActionId: Int!) {
  deleteAction(id: $deleteActionId)
}
`
