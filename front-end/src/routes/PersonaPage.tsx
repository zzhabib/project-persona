import { gql, useMutation, useQuery } from "@apollo/client"
import { Box, Button, Container, Divider, SxProps, TextField, Typography } from "@mui/material"
import { useParams } from "react-router"
import IdentityCard from "../components/IdentityCard"
import { useState } from "react"
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux"


// we need a query for name, description, initiated /recieved connections
const GET_PERSONA_DATA = gql`
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


//going further down the rabbit hole with this, we
// will basically have a list of initiated/recieved connections
// they will be displayed by name ( dont need id for recieved since we cant do anything with it )
// just want to show it

// will need to make a query for creating initiated connections
// but atm cannot find the backend hardware to do so




const PersonaPage: React.FC = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1); 
    };

    const user = useSelector((state: RootState) => state.auth.user)


    const { loading, error, data } = useQuery<GetUserStoriesQuery, GetUserStoriesQueryVariables>(GET_PERSONA_DATA, {
        variables: { id: user!.id }
      })











  return <>
          <Button
        sx={{
          height: '3em',
          marginTop: '1em',
          marginLeft: '1em'
        }}
        variant="contained"
        onClick={handleGoBack}
      >
        GO BACK
      </Button>


     <Typography
      variant="h4"
      sx={{
        padding: '10px',
        textAlign: 'center'
      }}>
      This is a Persona Page
    </Typography>




    
  </>
}

export default PersonaPage