import { Box, Typography } from "@mui/material"
import { useSelector } from "react-redux"
import { RootState } from "../store"
import { useMutation, useQuery } from "@apollo/client"
import StoryCard from "../components/StoryCard"
import CreateCard from "../components/CreateCard"
import { useNavigate } from "react-router"
import { GET_USER_STORIES, CREATE_STORY, DELETE_STORY } from "../queries/HomePageQueries"




const HomePage: React.FC = () => {
  const navigate = useNavigate()
  const user = useSelector((state: RootState) => state.auth.user)


  const [createStory] = useMutation(CREATE_STORY, {
    refetchQueries: [GET_USER_STORIES]
  })


  const [deleteStory] = useMutation(DELETE_STORY, {
    refetchQueries: [
      { query: GET_USER_STORIES},
    ],
  });


  const { loading, error, data } = useQuery(GET_USER_STORIES, {
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


  const handleStoryDelete = (Id: number) => {
    console.log(`Delete attempted ` + {Id});
    console.log(Id);

    const response = deleteStory({
      variables: { deleteStoryId: Id },
    });

    // Handle the response as needed
    console.log('Story deleted successfully', response);

  };


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
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', // Adjust column width as needed
        gap: 2, // Adjust the gap between items
        justifyContent: 'center',
        alignItems: 'center',
        overflowY: 'auto', // Enable vertical scrolling
        maxHeight: '500px', // Adjust the maximum height of the container
      }}
    >
      {data?.getUser.stories.map(story => (
        <StoryCard
          key={story.id}
          story={story}
          onClick={() => {
            navigate(`/story/${story.id}`)
          }}
          onDoSomethingClick={(query) => handleStoryDelete(story.id)}
        />
      ))}
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

export default HomePage