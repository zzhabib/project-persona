import { gql, useQuery } from "@apollo/client"
import { GetUsersQuery, GetUsersQueryVariables } from "../gql/graphql";

const GET_USERS = gql`
  query GetUsers {
    allUsers {
      id
      email
    }
  }
`

function LoginPage() {
  const { loading, error, data } = useQuery<GetUsersQuery, GetUsersQueryVariables>(GET_USERS);

  console.log(data?.allUsers.forEach(u => u.email))

  return <>
    <h1>Login page</h1>
  </>
}

export default LoginPage