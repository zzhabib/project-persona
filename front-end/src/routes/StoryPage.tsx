import { gql, useQuery } from "@apollo/client"
import { Box, Container, Divider, SxProps, Typography } from "@mui/material"
import { useParams } from "react-router"
import { GetStoryDetailsQuery, GetStoryDetailsQueryVariables } from "../gql/graphql"
import { Theme, useTheme } from "@emotion/react"
import IdentityCard from "../components/IdentityCard"
import CreateCard from "../components/CreateCard"

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

  const { loading, error, data } = useQuery<GetStoryDetailsQuery, GetStoryDetailsQueryVariables>(GET_STORY_DETAILS, {
    variables: {id: storyIdNumber}
  });

  if (loading) return <Typography>
    Loading...
  </Typography>

  return <Container>
    <Typography
      variant="h4"
      sx={sectionPadding}
    >
      {data?.getStory.title}
    </Typography>

    <Typography
      sx={sectionPadding}
    >
      {data?.getStory.description}
    </Typography>

    <Box
      sx={sectionPadding}
    >
      <Typography variant="h6">Personas</Typography>
      {data?.getStory.personas.map(p => (
        <IdentityCard
          key={p.id}
          name={p.name}
          sx={cardStyle}
          onClick={() => {}} // todo: Navigate to the Persona's page 
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