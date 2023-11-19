import { Box, Typography } from "@mui/material"
import { useSelector } from "react-redux"
import { RootState } from "../store"
import { gql, useMutation, useQuery } from "@apollo/client"
import { CreateStoryMutation, CreateStoryMutationVariables, GetUserStoriesQuery, GetUserStoriesQueryVariables, MutationCreateStoryArgs, StoryInput } from "../gql/graphql"
import StoryCard from "../components/StoryCard"
import CreateCard from "../components/CreateCard"

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

const CREATE_STORY = gql`
  mutation CreateStory($input: StoryInput!) {
    createStory(input: $input) {
      id
    }
  }
`

const StoriesPage: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user)
  const [createStory] = useMutation<CreateStoryMutation, CreateStoryMutationVariables>(CREATE_STORY, {
    refetchQueries: [GET_USER_STORIES]
  })

  const { loading, error, data } = useQuery<GetUserStoriesQuery, GetUserStoriesQueryVariables>(GET_USER_STORIES, {
    variables: { id: user!.id }
  })

  const handleStoryCreate = (storyTitle: string) => {
    createStory({
      variables: {
        input: {
          title: storyTitle,
          description: '',
          editorIds: [user!.id]
        }
      }
    })
  }

  return <>
    <Typography
      variant="h4"
      sx={{
        padding: '10px',
        textAlign: 'center'
      }}>
      Stories
    </Typography>
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {data?.getUser.stories.map(story => (<StoryCard key={story.id} story={story} />))}
    </Box>

    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <CreateCard
        onSubmit={handleStoryCreate}
        sx={{
          margin: '10px',
        }}
      />
    </Box>
  </>
}

export default StoriesPage