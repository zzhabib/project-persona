import { useMutation, useQuery } from "@apollo/client"
import { Box, Button, Container, Grid, TextField, Typography } from "@mui/material"
import { useParams } from "react-router"
import { StorySessionInput, StoryUpdateInput } from "../gql/graphql"
import IdentityCard from "../components/IdentityCard"
import CreateCard from "../components/CreateCard"
import TypographyInput from "../components/TypographyInput"
import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom';
import { store } from "../store"
import { cardStyle, sectionPadding } from "../styles/styles"
import { GET_STORY_DETAILS, GET_USER_STORY_SESSIONS, UPDATE_STORY, CREATE_PERSONA, CREATE_STORY_SESSION, CREATE_SCENE, DELETE_PERSONA, DELETE_SCENE, DELETE_STORY_SESSION } from "../queries/StoryPageQueries"
import BackButton from "../components/BackButton"


type StoryPageParams = {
  storyId: string
}





const StoryPage: React.FC = () => {
  const navigate = useNavigate();
  
  const { storyId } = useParams<StoryPageParams>()
  const storyIdNumber = storyId ? parseInt(storyId, 10) : 0;

  const [updateInput, setUpdateInput] = useState<StoryUpdateInput>({})




  const { loading: storyLoading, data: storyData, refetch } = useQuery(
    GET_STORY_DETAILS, {
    variables: { id: storyIdNumber }
  }
  );

  const storySessions = useQuery(
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


  const [updateStory] = useMutation(UPDATE_STORY, {
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

  const handleStorySessionCreate = async (inName: string) => {
    const input: StorySessionInput = {
      storyId: storyIdNumber,
      userId: store.getState().auth.user!.id,
      name: inName
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
            <CreateCard
              text="Create Persona"
              placeholder="Persona Name"
              sx={cardStyle}
              onSubmit={handlePersonaCreate}
            />
            <Box sx={{marginTop : '1em'}}>
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
            </Box>
            
          </Box>
          </Grid>
          <Grid item xs={4}>
          <Box
            sx={sectionPadding}
          >
            <Typography variant="h6">Scenes</Typography>
            <CreateCard
              text="Create Scene"
              placeholder="Scene Title"
              sx={cardStyle}
              onSubmit={handleSceneCreate}
            />

          <Box sx={{marginTop : '1em'}}>
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
            
            </Box>

          </Box>
          </Grid>
          <Grid item xs={4}>
          <Box sx={sectionPadding}>
            <Typography variant="h6">Testing Sessions</Typography>
            <CreateCard
              text="Create Session"
              placeholder="Session Name"
              sx={cardStyle}
              onSubmit={(value) => handleStorySessionCreate(value)}
            />
            <Box sx={{marginTop : '1em'}}>
            {storySessions.data?.getUserStorySessions.map(s => (
              <IdentityCard
                key={s.id}
                name={s.name}
                sx={cardStyle}
                onClick={() => {
                  navigate(`/playground/${s.id}`)
                }}
                onDoSomethingClick={() => {handleStorySessionDelete(s.id)}}
              />
            ))}

            </Box>
            
          </Box>
          </Grid>

        <Grid item xs={4}>
         
        </Grid>
      </Grid>      
    </Container>
  </>
}

export default StoryPage