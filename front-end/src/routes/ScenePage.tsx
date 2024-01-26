import { useMutation, useQuery } from "@apollo/client"
import { Box, Button, Container, TextField, Typography } from "@mui/material"
import { useParams } from "react-router"
import { useState } from "react"
import { SceneUpdateInput} from "../gql/graphql"
import { GET_SCENE_DATA, UPDATE_SCENE } from "../queries/ScenePageQueries"
import { sectionPadding } from "../styles/styles"
import BackButton from "../components/BackButton";
import SceneRoles from "../components/roles/SceneRoles"



type ScenePageParams = {
  sceneId: string
}




const ScenePage: React.FC = () => {

  const { sceneId } = useParams<ScenePageParams>()
  const sceneIdNumber = sceneId ? parseInt(sceneId, 10) : 0;

  const [updateInput, setUpdateInput] = useState<SceneUpdateInput>({})
 



  const { loading, data, refetch } = useQuery(
    GET_SCENE_DATA, {
      variables: { 
        getSceneId: sceneIdNumber
      }
    })


    const refetchData = () => {
      refetch();
    };


    const [updateScene] = useMutation(UPDATE_SCENE, {
      refetchQueries: [GET_SCENE_DATA]
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
  
      const result = await updateScene({
        variables: {
          updateSceneId: sceneIdNumber,
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



const nameValue = updateInput.title != null ? updateInput.title : data?.getScene.title
const descValue = updateInput.description != null ? updateInput.description : data?.getScene.description



const isDirty = (nameValue != data?.getScene.title || descValue != data?.getScene.description) ? true : false

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
        <BackButton
        sx={{
          height: '3em',
          width: '8em',
          marginTop: '1em',
          marginLeft: '1em',

        }}/>

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
      This is a Scene Page
    </Typography>



    <Container>
      <TextField
        label="Title"
        name="title"
        variant="outlined"
        multiline
        minRows={1}
        maxRows={1}
        sx={sectionPadding}
        value={nameValue}
        onChange={handleFieldChange} // handleFieldChange for name
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
              onChange={handleFieldChange} // handleFieldChange for description
            />
      </Box>
    </Container>
    <Box>
          {/* need like a new kind of create card here that gets all other personas in story for search list*/ }
          <Typography
      variant="h4"
      sx={{
        padding: '10px',
        textAlign: 'center'
      }}>
      Roles
    </Typography>
      <SceneRoles
        rolePersonas={data?.getScene.roles}
        sceneId={data?.getScene.id}
        storyId={data?.getScene.story.id}
        refetchData={refetchData}
      />
</Box>
  </>
}

export default ScenePage