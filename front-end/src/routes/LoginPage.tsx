import { gql, useMutation, useQuery } from "@apollo/client"
import { CreateUserMutation, CreateUserMutationVariables, GetUsersQuery, GetUsersQueryVariables, User } from "../gql/graphql";
import { Box, Button, Card, CardActionArea, CardContent, Typography } from "@mui/material";
import UserCard from "../components/UserCard";
import CreateCard from "../components/CreateCard";

const GET_USERS = gql`
  query GetUsers {
    allUsers {
      id
      email
    }
  }
`

const CREATE_USER = gql`
  mutation CreateUser($email: String!) {
    createUser(email: $email) {
      id
      email
    }
  }

`

function LoginPage() {
  const { loading, error, data } = useQuery<GetUsersQuery, GetUsersQueryVariables>(GET_USERS);

  const [createUser] = useMutation(CREATE_USER, {
    refetchQueries: [
      GET_USERS,
    ],
  });

  const handleUserCreate = async (email: string) => {
    await createUser({variables: { email }})
  }

  return <>
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Typography
        variant="h4"
        sx={{
          padding: '10px'
        }}>
        Sign In
      </Typography>

      {data?.allUsers.map(u => {
        return <UserCard key={u.id} user={u}/>
      })}

      <CreateCard
        placeholder="Email"
        text="Create User"
        onSubmit={handleUserCreate}
      />
    </Box>
  </>
}

export default LoginPage