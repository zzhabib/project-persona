import { gql } from '@apollo/client';


export const GET_CONNECTION = gql`
query GetPersona($getPersonaId: Int!, $targetPersonaId: Int) {
    getPersona(id: $getPersonaId) {
      initiatedConnections(targetPersonaId: $targetPersonaId) {
        description
        targetPersona {
          name
        }
      }
    }
  }
`