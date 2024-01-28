import { gql } from "@apollo/client"



export const GET_ROLE_DATA = gql`
query Roles($getSceneId: Int!) {
    getScene(id: $getSceneId) {
      roles {
        actions {
          name
          id
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