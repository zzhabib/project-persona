import { gql, useMutation, useQuery } from "@apollo/client"
import { Box, Button, Container, Divider, SxProps, TextField, Typography } from "@mui/material"
import { useParams } from "react-router"
import IdentityCard from "../components/IdentityCard"
import { useState } from "react"
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux"
import { GetPersonaQuery, PersonaUpdateInput, MutationUpdatePersonaArgs, Mutation } from "../gql/graphql"
import { Theme, useTheme } from "@emotion/react"


type PersonaPageParams = {
  personaId: string
}




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


const sectionPadding: SxProps<Theme> = {
  paddingTop: '0.5em',
  paddingBottom: '0.5em'
}

const cardStyle: SxProps<Theme> = {
  width: '20em'
}


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

    const { personaId } = useParams<PersonaPageParams>()
    const personaIdNumber = personaId ? parseInt(personaId, 10) : 0;

    console.log(personaId)
    //const [updateInput, setUpdateInput] = useState<PersonaUpdateInput>({})


    const { loading, error, data } = useQuery<GetPersonaQuery>(
      GET_PERSONA_DATA, {
        variables: { 
          getPersonaId: personaIdNumber
        }
      })



    

    if (loading) return <Typography>
    Loading...
  </Typography>


  const nameValue = data?.getPersona.name
  const descValue = data?.getPersona.description



  console.log(data)


  return <>

    <Box
      sx={{
        width: '100%', // Full width
        display: 'grid',
        gridTemplateColumns: 'auto 1fr auto', // Three columns: left button, main content, right button
        padding: '1em', // Adjust padding as needed
        boxSizing: 'border-box',
        alignItems: 'center', // Center items vertically
      }}
    >
        <Button
        sx={{
          height: '3em',
          width: '8em',
          marginTop: '1em',
          marginLeft: '1em',

        }}
        variant="contained"
        onClick={handleGoBack}
        >
          GO BACK
        </Button>

        <Button
        sx={{
          height: '3em',
          width: '8em',
          marginTop: '1em',
          marginRight: '1em',
          justifySelf: 'end'
        }}
        variant="contained"
        //disabled={!isDirty}
        //onClick={handleSave}
      >
        SAVE
      </Button>



      </Box>





     <Typography
      variant="h4"
      sx={{
        padding: '10px',
        textAlign: 'center'
      }}>
      This is a Persona Page
    </Typography>

    <Container>
      <TextField
        label="Name"
        name="Name"
        variant="outlined"
        multiline
        minRows={1}
        maxRows={1}
        sx={sectionPadding}
        value={nameValue}
        //onChange={} // handleFieldChange for name
      />

      <Box>
          <TextField
              label="Description"
              name="Description"
              variant="outlined"
              multiline
              minRows={5}
              maxRows={10}
              fullWidth
              sx={sectionPadding}
              value={descValue}
              //onChange={} // handleFieldChange for description
            />
      </Box>
    </Container>


    
  </>
}

export default PersonaPage