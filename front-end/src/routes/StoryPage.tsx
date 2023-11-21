import { gql, useMutation, useQuery } from "@apollo/client"
import { Box, Button, Container, Divider, SxProps, Typography } from "@mui/material"
import { useParams } from "react-router"
import { GetStoryDetailsQuery, GetStoryDetailsQueryVariables, StoryUpdateInput, UpdateStoryMutation, UpdateStoryMutationVariables } from "../gql/graphql"
import { Theme, useTheme } from "@emotion/react"
import IdentityCard from "../components/IdentityCard"
import CreateCard from "../components/CreateCard"
import TypographyInput from "../components/TypographyInput"
import { useState } from "react"

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

const sectionPadding: SxProps<Theme> = {
  paddingTop: '0.5em',
  paddingBottom: '0.5em'
}

const cardStyle: SxProps<Theme> = {
  width: '20em'
}

const StoryPage: React.FC = () => {
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

  return <Container>
    <Box display="flex">
      <TypographyInput
        name="title"
        variant="h4"
        value={titleValue}
        onChange={handleFieldChange}
      />

      <Button
        variant="contained"
        disabled={!isDirty}
        onClick={handleSave}
      >
        SAVE
      </Button>
    </Box>

    {/* <Typography
      sx={sectionPadding}
    >
      {data?.getStory.description}
    </Typography> */}

    <TypographyInput
      name="description"
      variant="body1"
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
          onClick={() => { }} // todo: Navigate to the Persona's page 
        />
      ))}
      <CreateCard
        text="Create Persona"
        placeholder="Persona Name"
        sx={cardStyle}
      />
    </Box>

    <Box
      sx={sectionPadding}
    >
      <Typography variant="h6">Scenes</Typography>
      {data?.getStory.scenes.map(s => (
        <IdentityCard
          key={s.id}
          name={s.title}
          sx={cardStyle}
          onClick={() => { }} //todo: Navigate to the Scene's page
        />
      ))}
      <CreateCard
        text="Create Scene"
        placeholder="Scene Title"
        sx={cardStyle}
      />
    </Box>
  </Container>
}

export default StoryPage