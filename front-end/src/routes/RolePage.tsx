
import { Box, Button, Container, TextField, Typography } from "@mui/material"
import BackButton from "../components/BackButton";
import { useParams } from "react-router";



type RolePageParams = {
  sceneId: string,
  personaId: string
}


const RolePage: React.FC = () => {

  const { sceneId, personaId } = useParams<RolePageParams>()

  const sceneIdNumber = sceneId ? parseInt(sceneId, 10) : 0;
  const personaIdNumber = personaId ? parseInt(personaId, 10) : 0;


  // get role data function call

  // update role data function call


  // save role needs to be general because we are doing actions with creation card, and I dont care to have to do two update functions

  // isdirty/ all the stuff that will go with description 

  // actions only have a name and an id, so we will not do action page, creation card should suffice
  
  // Plan of attack, 
  
  // 1. setup get role data function 
  
  // 2. get description data working with save button
  
  // 3. setup creation card for actions and map it to update role
  
  // 4. setup delete action button and also map it to update role  (maybe one update function and a null call)








  return <>
    <Box>
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

        <Button sx={{
          height: '3em',
          width: '8em',
          marginTop: '1em',
          marginRight: '1em',
          justifySelf: 'end'
        }}
        variant="contained"
        //disabled={!isDirty}
        //onClick={handleSave}
      >
        SAVE
      </Button>



      </Box>

      <Typography
        variant="h4"
        sx={{
          padding: '10px'
        }}>
        RolePage for Scene {sceneIdNumber} and Persona {personaIdNumber}
      </Typography>






    </Box>
  </>
}//basically a list of existing users and a button to create new

export default RolePage