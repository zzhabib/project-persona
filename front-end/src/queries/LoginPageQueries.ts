import { gql } from "@apollo/client"

//returns all users id and email
export const GET_USERS = gql` 
  query GetUsers {
    allUsers {
      id
      email
    }
  }
`


//creates new user with given id and email
export const CREATE_USER = gql`
  mutation CreateUser($email: String!) {
    createUser(email: $email) {
      id
      email
    }
  }
`