import { useMutation, useQuery } from "@apollo/client"
import { Box, Button, Container, TextField, Typography } from "@mui/material"
import { useParams } from "react-router"
import IdentityCard from "../components/IdentityCard"
import { useState } from "react"

import { PersonaUpdateInput } from "../gql/graphql"
import { cardStyle, sectionPadding } from "../styles/styles"
import { GET_PERSONA_DATA, UPDATE_PERSONA } from "../queries/PersonaPageQueries"
import ConnectionCard from "../components/ConnectionCard"

import BackButton from "../components/BackButton"

type PersonaPageParams = {
  personaId: string
}


const combineConnectionsData = (
  initiatedConnections: Array<{ targetPersona: { id: number; name: string } }>,
  receivedConnections: Array<{ sourcePersona: { id: number; name: string } }>
) => {
  const combinedConnections: { [name: string]: { id: number; initiatedConnection: boolean; receivedConnection: boolean } } = {};

  // Map initiated connections
  initiatedConnections.forEach(connection => {
    const { id, name } = connection.targetPersona;
    if (!combinedConnections[name]) {
      combinedConnections[name] = { id, initiatedConnection: true, receivedConnection: false };
    } else {
      combinedConnections[name].initiatedConnection = true;
    }
  });

  // Map received connections
  receivedConnections.forEach(connection => {
    const { id, name } = connection.sourcePersona;
    if (!combinedConnections[name]) {
      combinedConnections[name] = { id, initiatedConnection: false, receivedConnection: true };
    } else {
      combinedConnections[name].receivedConnection = true;
    }
  });

  // Convert the combinedConnections object into an array
  const combinedConnectionsArray = Object.keys(combinedConnections).map(name => ({
    name,
    ...combinedConnections[name],
  }));

  return combinedConnectionsArray;
};







const PersonaPage: React.FC = () => {
  
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




      console.log(data);




      


      const combinedConnectionsData = combineConnectionsData(
        data?.getPersona.initiatedConnections || [],
        data?.getPersona.receivedConnections || []
      );

      


      









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
        <BackButton/>
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

        {combinedConnectionsData.map(connection => (
        <ConnectionCard
            key={connection.name}
            personaId={personaIdNumber}
            otherPersonaName={connection.name}
            otherPersonaId={connection.id}
            initiatedConnection={connection.initiatedConnection}
            recievedConnnection= {connection.receivedConnection}
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