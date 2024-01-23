import { gql } from '@apollo/client';


export const GET_INITIATED_CONNECTION = gql`
query GetInitatedConnection($getPersonaId: Int!, $targetPersonaId: Int) {
    getPersona(id: $getPersonaId) {
      name
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
query GetReceivedConnection($getPersonaId: Int!, $sourcePersonaId: Int) {
  getPersona(id: $getPersonaId) {
    name
    receivedConnections(sourcePersonaId: $sourcePersonaId) {
      description
      sourcePersona {
        name
      }
    }
  
  }
}
`

export const ADD_CONNECTION = gql`
mutation AddConnection($input: PersonaUpdateInput!, $updatePersonaId: Int!) {
    updatePersona(input: $input, id: $updatePersonaId)
  }
`


export const UPDATE_CONNECTION = gql`
mutation UpdatePersona($input: PersonaUpdateInput!, $updatePersonaId: Int!) {
  updatePersona(input: $input, id: $updatePersonaId)
}
`








// call normal for initaiated and flip the inputs for recieved....



//need a delete for the recieved and initiated connection, as well as an update for the descriptions

//also need a way to make a new one, this data is getting pretty wierd
