
import { Box, Typography } from "@mui/material";
import BackButton from "../components/BackButton";


// loads the login page
function RolePage() {
  

  return <>
    <Box>
        <BackButton/>
      <Typography
        variant="h4"
        sx={{
          padding: '10px'
        }}>
        RolePage
      </Typography>


    </Box>
  </>
}//basically a list of existing users and a button to create new

export default RolePage