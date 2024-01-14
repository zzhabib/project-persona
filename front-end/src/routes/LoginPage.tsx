import { gql, useMutation, useQuery } from "@apollo/client"
import { CreateUserMutation, CreateUserMutationVariables, GetUsersQuery, GetUsersQueryVariables, User } from "../gql/graphql";
import { Box, Button, Card, CardActionArea, CardContent, Typography } from "@mui/material";
import IdentityCard from "../components/IdentityCard";
import CreateCard from "../components/CreateCard";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../reducers/authReducer";
import { AppDispatch, RootState } from "../store";
import { useNavigate } from "react-router";
import { useEffect } from "react";


//returns all users id and email
const GET_USERS = gql` 
  query GetUsers {
    allUsers {
      id
      email
    }
  }
`


//creates new user with given id and email
const CREATE_USER = gql`
  mutation CreateUser($email: String!) {
    createUser(email: $email) {
      id
      email
    }
  }
`
// loads the login page
function LoginPage() {
  const { loading, error, data } = useQuery<GetUsersQuery, GetUsersQueryVariables>(GET_USERS); // data variable (or error/loading) to get all users
  const navigate = useNavigate()      //
  const dispatch = useDispatch<AppDispatch>()
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn)

  const [createUser] = useMutation(CREATE_USER, {
    refetchQueries: [
      GET_USERS,
    ],
  });

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/')
    }
  }, [isLoggedIn, navigate])

  const handleUserLogin = (user: { id: number, email: string }) => {
    dispatch(login(user))
  }

  const handleUserCreate = async (email: string) => {
    await createUser({ variables: { email } })
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
        return <IdentityCard
          key={u.id}
          name={u.email}
          sx={{
            width: '20em'
          }}
          onClick={() => { handleUserLogin(u) }}
        />
      })}

      <CreateCard
        placeholder="Email"
        text="Create User"
        onSubmit={handleUserCreate}
      />
    </Box>
  </>
}//basically a list of existing users and a button to create new

export default LoginPage