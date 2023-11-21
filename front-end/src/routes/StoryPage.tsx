import { Typography } from "@mui/material"
import { useParams } from "react-router"

type StoryPageParams = {
  storyId: string
}

const StoryPage: React.FC = () => {
  const { storyId } = useParams<StoryPageParams>()

  return <>
    <Typography>
      Story id {storyId}
    </Typography>
  </>
}

export default StoryPage