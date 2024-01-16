import { gql } from '@apollo/client';


export const GET_PERSONA_DATA = gql`
query GetPersona($getPersonaId: Int!) {
    getPersona(id: $getPersonaId) {
      name
      description
      initiatedConnections {
        targetPersona {
          name
          id
        }
      }
      receivedConnections {
        sourcePersona {
          name
        }
      }
    }
  }
`

export const UPDATE_PERSONA = gql`
mutation UpdatePersona($input: PersonaUpdateInput!, $updatePersonaId: Int!) {
  updatePersona(input: $input, id: $updatePersonaId)
  
}
`
