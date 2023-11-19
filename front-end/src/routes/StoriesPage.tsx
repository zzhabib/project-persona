import { Typography } from "@mui/material"
import RequireAuth from "../components/RequireAuth"


const StoriesPage: React.FC = () => {

  return <RequireAuth>
    <Typography>
      Stories
    </Typography>
  </RequireAuth>
}

export default StoriesPage