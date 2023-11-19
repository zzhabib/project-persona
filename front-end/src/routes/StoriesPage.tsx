import { Box, Typography } from "@mui/material"
import RequireAuth from "../components/RequireAuth"
import { useSelector } from "react-redux"
import { RootState } from "../store"
import { gql, useQuery } from "@apollo/client"
import { GetUserStoriesQuery, GetUserStoriesQueryVariables } from "../gql/graphql"
import StoryCard from "../components/StoryCard"

const GET_USER_STORIES = gql`
  query GetUserStories($id: Int!) {
    getUser(id: $id) {
      stories {
        id
        title
        description
      }
    }
  }
`

const StoriesPage: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user)

  const { loading, error, data } = useQuery<GetUserStoriesQuery, GetUserStoriesQueryVariables>(GET_USER_STORIES, {
    variables: { id: user!.id }
  })

  return <>
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography
        variant="h4"
        sx={{
          padding: '10px'
        }}>
        Stories
      </Typography>

      {data?.getUser.stories.map(story => (<StoryCard key={story.id} story={story}/>))}
    </Box>
  </>
}

export default StoriesPage