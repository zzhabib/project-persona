import { gql, useMutation, useQuery } from "@apollo/client"
import { Box, Button, Container, Divider, SxProps, TextField, Typography } from "@mui/material"
import { useParams } from "react-router"
import { Theme, useTheme } from "@emotion/react"
import IdentityCard from "../components/IdentityCard"
import CreateCard from "../components/CreateCard"
import TypographyInput from "../components/TypographyInput"
import { useState } from "react"
import { useNavigate } from 'react-router-dom';
import { QueryGetSceneArgs, MutationUpdateSceneArgs, SceneUpdateInput} from "../gql/graphql"

type ScenePageParams = {
  sceneId: string
}

//this will let us list the scene title and description, as well as give
//us the names of the character, might need a roleid to make easier
// so we will need to make actions list on a role page


const GET_SCENE_DATA = gql`
query GetScene($getSceneId: Int!) {
  getScene(id: $getSceneId) {
    description
    id
    title
    roles {
      persona {
        name
      }
    }
  }
}
`


const UPDATE_SCENE = gql`
mutation UpdateScene($input: SceneUpdateInput!, $updateSceneId: Int!) {
  updateScene(input: $input, id: $updateSceneId)
}
`



const sectionPadding: SxProps<Theme> = {
  paddingTop: '0.5em',
  paddingBottom: '0.5em'
}

const cardStyle: SxProps<Theme> = {
  width: '20em'
}



const ScenePage: React.FC = () => {
const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); 
  };

  const { sceneId } = useParams<ScenePageParams>()
  const sceneIdNumber = sceneId ? parseInt(sceneId, 10) : 0;

  const [updateInput, setUpdateInput] = useState<SceneUpdateInput>({

  })
 

  const { loading, error, data } = useQuery(
    GET_SCENE_DATA, {
      variables: { 
        getSceneId: sceneIdNumber
      }
    })

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


const isDirty = Object.keys(updateInput).length > 0
const nameValue = updateInput.title != null ? updateInput.title : data?.getScene.title
const descValue = updateInput.description != null ? updateInput.description : data?.getScene.description


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







  </>
}

export default ScenePage