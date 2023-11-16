import { gql, useQuery } from "@apollo/client"
import { GetUsersQuery, GetUsersQueryVariables, User } from "../gql/graphql";
import { Box, Card, CardActionArea, CardContent, Typography } from "@mui/material";
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

function LoginPage() {
  const { loading, error, data } = useQuery<GetUsersQuery, GetUsersQueryVariables>(GET_USERS);

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

      <CreateCard/>
    </Box>
  </>
}

export default LoginPage