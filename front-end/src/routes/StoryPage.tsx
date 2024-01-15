import { gql, useMutation, useQuery } from "@apollo/client"
import { Box, Button, Container, Divider, Grid, SxProps, TextField, Typography } from "@mui/material"
import { useParams } from "react-router"
import { GetStoryDetailsQuery, GetStoryDetailsQueryVariables, GetUserStorySessionsQuery, GetUserStorySessionsQueryVariables, StorySessionInput, StoryUpdateInput, UpdateStoryMutation, UpdateStoryMutationVariables } from "../gql/graphql"
import { Theme, useTheme } from "@emotion/react"
import IdentityCard from "../components/IdentityCard"
import CreateCard from "../components/CreateCard"
import TypographyInput from "../components/TypographyInput"
import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom';
import { store } from "../store"

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

const GET_USER_STORY_SESSIONS = gql`
  query GetUserStorySessions($storyId: Int!, $userId: Int!) {
    getUserStorySessions(storyId: $storyId, userId: $userId) {
      id
      story {
        title
      }
      user {
        email
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

const CREATE_STORY_SESSION = gql`
  mutation CreateStorySession($input: StorySessionInput!) {
    createStorySession(input: $input) {
      id
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

const DELETE_PERSONA = gql`
  mutation DeletePersona($deletePersonaId: Int!) {
    deletePersona(id: $deletePersonaId)
  }
`

const DELETE_SCENE = gql`
  mutation DeleteScene($deleteSceneId: Int!) {
    deleteScene(id: $deleteSceneId)
  }
`

const DELETE_STORY_SESSION = gql`
  mutation DeleteStorySession($storySessionId: Int!) {
    deleteStorySession(id: $storySessionId)
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




  const { loading: storyLoading, error: storyError, data: storyData, refetch } = useQuery<GetStoryDetailsQuery, GetStoryDetailsQueryVariables>(
    GET_STORY_DETAILS, {
    variables: { id: storyIdNumber }
  }
  );

  const storySessions = useQuery<GetUserStorySessionsQuery, GetUserStorySessionsQueryVariables>(
    GET_USER_STORY_SESSIONS, {
    variables: { storyId: storyIdNumber, userId: store.getState().auth.user!.id }
  }
  );

  useEffect(() => {
    const fetchStoryDetails = async () => {
      // Refetch the data when the component mounts
      await refetch();
    };

    fetchStoryDetails();
  }, [refetch, storyIdNumber]);


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

  const [createStorySession] = useMutation(CREATE_STORY_SESSION, {
    refetchQueries: [
      { query: GET_USER_STORY_SESSIONS, variables: { storyId: storyIdNumber, userId: store.getState().auth.user!.id } }
    ]
  })

  const [deletePersona] = useMutation(DELETE_PERSONA, {
    refetchQueries: [
      { query: GET_STORY_DETAILS, variables: { id: storyIdNumber } },
    ],
  });

  const [deleteScene] = useMutation(DELETE_SCENE, {
    refetchQueries: [
      { query: GET_STORY_DETAILS, variables: { id: storyIdNumber } },
    ],
  });

  const [deleteStorySession] = useMutation(DELETE_STORY_SESSION, {
    refetchQueries: [
      { query: GET_USER_STORY_SESSIONS, variables: { storyId: storyIdNumber, userId: store.getState().auth.user!.id } }
    ]
  })

  if (storyLoading) return <Typography>
    Loading...
  </Typography>

  const isDirty = Object.keys(updateInput).length > 0
  const titleValue = updateInput.title != null ? updateInput.title : storyData?.getStory.title
  const descriptionValue = updateInput.description != null ? updateInput.description : storyData?.getStory.description

  const handlePersonaCreate = async (name: string) => {
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

  const handlePersonaDelete = (Id: number) => {
    const response = deletePersona({
      variables: { deletePersonaId: Id },
    });
    console.log('Persona deleted successfully', response);
  };

  const handleSceneDelete = (Id: number) => {
    const response = deleteScene({
      variables: { deleteSceneId: Id },
    });
    console.log('Scene deleted successfully', response);
  };

  const handleSceneCreate = async (title: string) => {
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

  const handleStorySessionCreate = async () => {
    const input: StorySessionInput = {
      storyId: storyIdNumber,
      userId: store.getState().auth.user!.id
    }
    console.log(input)
    await createStorySession({ variables: { input }})
  }

  const handleStorySessionDelete = async (storySessionId: number) => {
    await deleteStorySession({ variables: { storySessionId } })
  }

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

      <Grid container spacing={4}>
        <Grid item xs={4}>
          <Box
            sx={sectionPadding}
          >
            <Typography variant="h6">Personas</Typography>
            {storyData?.getStory.personas.map(p => (
              <IdentityCard
                key={p.id}
                name={p.name}
                sx={cardStyle}
                onClick={() => {
                  navigate(`/persona/${p.id}`)
                }}
                onDoSomethingClick={() => handlePersonaDelete(p.id)}
              />
            ))}
            <CreateCard
              text="Create Persona"
              placeholder="Persona Name"
              sx={cardStyle}
              onSubmit={handlePersonaCreate}
            />
          </Box>
          </Grid>
          <Grid item xs={4}>
          <Box
            sx={sectionPadding}
          >
            <Typography variant="h6">Scenes</Typography>

            {storyData?.getStory.scenes.map(s => {
              return <IdentityCard
                key={s.id}
                name={s.title}
                sx={cardStyle}
                onClick={() => {
                  navigate(`/scene/${s.id}`)
                }} //todo: Navigate to the Scene's page
                onDoSomethingClick={() => handleSceneDelete(s.id)}
              />
            })}
            <CreateCard
              text="Create Scene"
              placeholder="Scene Title"
              sx={cardStyle}
              onSubmit={handleSceneCreate}
            />
          </Box>
          </Grid>
          <Grid item xs={4}>
          <Box>
            <Typography variant="h6">Testing Sessions</Typography>
            {storySessions.data?.getUserStorySessions.map(s => (
              <IdentityCard
                key={s.id}
                name={`Session ${s.id}`}
                sx={cardStyle}
                onClick={() => {
                  navigate(`/storysession/${s.id}`)
                }}
                onDoSomethingClick={() => {handleStorySessionDelete(s.id)}}
              />
            ))}
            <CreateCard
              text="Create Session"
              placeholder=""
              sx={cardStyle}
              onSubmit={handleStorySessionCreate}
            />
          </Box>
          </Grid>

        <Grid item xs={4}>
         
        </Grid>
      </Grid>      
    </Container>
  </>
}

export default StoryPage