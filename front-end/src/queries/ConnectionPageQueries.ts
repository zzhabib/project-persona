import { gql } from '@apollo/client';


export const GET_INITIATED_CONNECTION = gql`
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

export const GET_RECEIVED_CONNECTION = gql`
query GetPersona($getPersonaId: Int!, $sourcePersonaId: Int) {
  getPersona(id: $getPersonaId) {
    receivedConnections(sourcePersonaId: $sourcePersonaId) {
      description
      sourcePersona {
        name
      }
    }
  
  }
}
`