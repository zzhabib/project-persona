import { gql, useMutation, useQuery } from "@apollo/client"
import { Box, Button, Container, Divider, SxProps, TextField, Typography } from "@mui/material"
import { useParams } from "react-router"
import { GetStoryDetailsQuery, GetStoryDetailsQueryVariables, StoryUpdateInput, UpdateStoryMutation, UpdateStoryMutationVariables } from "../gql/graphql"
import { Theme, useTheme } from "@emotion/react"
import IdentityCard from "../components/IdentityCard"
import CreateCard from "../components/CreateCard"
import TypographyInput from "../components/TypographyInput"
import { useState } from "react"
import { useNavigate } from 'react-router-dom';

type StoryPageParams = {
  storyId: string
}

const GET_STORY_DETAILS = gql`
  query GetStoryDetails($id: Int!) {
    getStory(id: $id) {
      id
      title
      description

      personas {
        id
        name
        description
      }

      scenes {
        id
        title
        description
      }
    }
  }
`

const UPDATE_STORY = gql`
  mutation UpdateStory($input: StoryUpdateInput!, $updateStoryId: Int!) {
    updateStory(input: $input, id: $updateStoryId)
  }
`


const CREATE_PERSONA = gql`
  mutation CreatePersona($input: PersonaInput!) {
    createPersona(input: $input) {
      name
    }
  }
`

const CREATE_SCENE = gql`
  mutation CreateScene($input: SceneInput!) {
    createScene(input: $input) {
      title
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

const StoryPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); 
  };


  const theme = useTheme()
  const { storyId } = useParams<StoryPageParams>()
  const storyIdNumber = storyId ? parseInt(storyId, 10) : 0;

  const [updateInput, setUpdateInput] = useState<StoryUpdateInput>({})

  const { loading, error, data } = useQuery<GetStoryDetailsQuery, GetStoryDetailsQueryVariables>(GET_STORY_DETAILS, {
    variables: { id: storyIdNumber }
  });

  const [updateStory] = useMutation<UpdateStoryMutation, UpdateStoryMutationVariables>(UPDATE_STORY, {
    refetchQueries: [GET_STORY_DETAILS]
  })

  const handleFieldChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    event.preventDefault()

    setUpdateInput({
      ...updateInput,
      [event.target.name]: event.target.value
    })
  }

  const handleSave: React.MouseEventHandler<HTMLButtonElement> = async (event) => {
    event.preventDefault()

    const result = await updateStory({
      variables: {
        updateStoryId: storyIdNumber,
        input: updateInput
      }
    })

    if (result.data?.updateStory) {
      setUpdateInput({})
    }
  }

  if (loading) return <Typography>
    Loading...
  </Typography>

  const isDirty = Object.keys(updateInput).length > 0
  const titleValue = updateInput.title != null ? updateInput.title : data?.getStory.title
  const descriptionValue = updateInput.description != null ? updateInput.description : data?.getStory.description



  const [createPersona] = useMutation(CREATE_PERSONA, {
    refetchQueries: [
      { query: GET_STORY_DETAILS, variables: { id: storyIdNumber } },
    ],
  });


  const [createScene] = useMutation(CREATE_SCENE, {
    refetchQueries: [
      { query: GET_STORY_DETAILS, variables: { id: storyIdNumber } },
    ],
  });



  const handlePersonaCreate = async (name: String) => {

  const description = "";
  const storyId = storyIdNumber;

    const input = {
      name,
      storyId,
      description
      // Add other fields as needed
    };
    
    await createPersona({ variables: { input } });
  }


  const handleSceneCreate = async (title: String) => {
    
    const description = "";
    const storyId = storyIdNumber;


    const input = {
      title,
      storyId,
      description
      // Add other fields as needed
    };
    
    await createScene({ variables: { input } })
  }




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
  <Container>
    <Box sx={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center'
    }}>
      <TypographyInput
        name="title"
        variant="h4"
        placeholder="Story Title"
        value={titleValue}
        onChange={handleFieldChange}
      />

      <Button
        sx={{
          height: '3em'
        }}
        variant="contained"
        disabled={!isDirty}
        onClick={handleSave}
      >
        SAVE
      </Button>
    </Box>

    <TextField
      label="Description"
      name="description"
      variant="outlined"
      multiline
      minRows={5}
      maxRows={10}
      fullWidth
      sx={sectionPadding}
      value={descriptionValue}
      onChange={handleFieldChange}
    />

    <Box
      sx={sectionPadding}
    >
      <Typography variant="h6">Personas</Typography>
      {data?.getStory.personas.map(p => (
        <IdentityCard
          key={p.id}
          name={p.name}
          sx={cardStyle}
          onClick={() => {
            navigate(`/persona/${p.id}`)
           }} // todo: Navigate to the Persona's page 
        />
      ))}
      <CreateCard
        text="Create Persona"
        placeholder="Persona Name"
        sx={cardStyle}
        onSubmit={handlePersonaCreate}
      />
    </Box>

    <Box
      sx={sectionPadding}
    >
      <Typography variant="h6">Scenes</Typography>

      {data?.getStory.scenes.map(s => {
        return <IdentityCard
          key={s.id}
          name={s.title}
          sx={cardStyle}
          onClick={() => { 
            navigate(`/scene/${s.id}`)
          }} //todo: Navigate to the Scene's page
        />
})}
      <CreateCard
        text="Create Scene"
        placeholder="Scene Title"
        sx={cardStyle}
        onSubmit={handleSceneCreate}
      />
    </Box>
  </Container>
  </>
}

export default StoryPage