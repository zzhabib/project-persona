import { gql } from '@apollo/client';


export const GET_PERSONA_DATA = gql`
query GetPersona($getPersonaId: Int!) {
  getPersona(id: $getPersonaId) {
    name
    description
    story {
      id
    }
    initiatedConnections {
      targetPersona {
        name
        id
      }
    }
    receivedConnections {
      sourcePersona {
        name
        id
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


export const GET_ALL_PERSONAS = gql`
query GetStory($getStoryId: Int!) {
  getStory(id: $getStoryId) {
    personas {
      id
      name
    }
  }
}
`