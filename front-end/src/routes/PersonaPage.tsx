import { useMutation, useQuery } from "@apollo/client"
import { Box, Button, Container, TextField, Typography } from "@mui/material"
import { useParams } from "react-router"
import IdentityCard from "../components/IdentityCard"
import { useState } from "react"
import { useNavigate } from 'react-router-dom';
import { PersonaUpdateInput } from "../gql/graphql"
import { cardStyle, sectionPadding } from "../styles/styles"
import { GET_PERSONA_DATA, UPDATE_PERSONA } from "../queries/PersonaPageQueries"
import ConnectionCard from "../components/ConnectionCard"



type PersonaPageParams = {
  personaId: string
}




const PersonaPage: React.FC = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1); 
    };

    const { personaId } = useParams<PersonaPageParams>()
    const personaIdNumber = personaId ? parseInt(personaId, 10) : 0;

   
    const [updateInput, setUpdateInput] = useState<PersonaUpdateInput>({

    })


    const { loading, error, data } = useQuery(
      GET_PERSONA_DATA, {
        variables: { 
          getPersonaId: personaIdNumber
        }
      })

      const [updatePersona] = useMutation(UPDATE_PERSONA, {
        refetchQueries: [GET_PERSONA_DATA]
      })

    
      const handleFieldChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        event.preventDefault()
    
        const { name, value } = event.target;

        setUpdateInput({
          ...updateInput,
          [name]: value
        })
      }

      const handleSave: React.MouseEventHandler<HTMLButtonElement> = async (event) => {
        event.preventDefault()
    
        const result = await updatePersona({
          variables: {
            updatePersonaId: personaIdNumber,
            input: updateInput
          }
        })
    
        if (result.data?.updatePersona) {
          setUpdateInput({})
        }
      }







    if (loading) return <Typography>
    Loading...
  </Typography>

  const isDirty = Object.keys(updateInput).length > 0
  const nameValue = updateInput.name != null ? updateInput.name : data?.getPersona.name
  const descValue = updateInput.description != null ? updateInput.description : data?.getPersona.description


  
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
        disabled={!isDirty}
        onClick={handleSave}
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
        name="name"
        variant="outlined"
        multiline
        minRows={1}
        maxRows={1}
        sx={sectionPadding}
        value={nameValue}
        onChange={handleFieldChange} 
      />

      <Box>
          <TextField
              label="Description"
              name="description"
              variant="outlined"
              multiline
              minRows={5}
              maxRows={10}
              fullWidth
              sx={sectionPadding}
              value={descValue}
              onChange={handleFieldChange} 
            />
      </Box>

      <Box>
          {/* need like a new kind of create card here that gets all other personas in story for search list*/ }
          <Typography
      variant="h4"
      sx={{
        padding: '10px',
        textAlign: 'center'
      }}>
      Connections
    </Typography>

        {data?.getPersona.initiatedConnections.map(connection => (
        <ConnectionCard
            key={connection.targetPersona.id}
            personaId={personaIdNumber}
            otherPersonaName={connection.targetPersona.name}
            otherPersonaId={connection.targetPersona.Id}
            initiatedConnection={false}
            recievedConnnection= {true}
          sx={cardStyle}
          onClick={() => {
            //navigate(`/persona/${personaId}/connections/${connection.targetPersona.id}`)
          }}
          //onDoSomethingClick={}
        />
      ))}
      </Box>



    </Container>


    
  </>
}

export default PersonaPage