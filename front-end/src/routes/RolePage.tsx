
import { Box, Button, Container, TextField, Typography } from "@mui/material"
import BackButton from "../components/BackButton";
import { useParams } from "react-router";
import { UPDATE_ROLE, GET_ROLE_DATA, CREATE_ACTION, DELETE_ACTION } from "../queries/RolePageQueries";
import { useQuery, useMutation } from "@apollo/client";
import { useState } from "react";
import { sectionPadding, cardStyle } from "../styles/styles";
import CreateCard from "../components/CreateCard";
import IdentityCard from "../components/IdentityCard";



type RolePageParams = {
  sceneId: string,
  personaId: string
}


const RolePage: React.FC = () => {

  const { sceneId, personaId } = useParams<RolePageParams>()

  const sceneIdNumber = sceneId ? parseInt(sceneId, 10) : 0;
  const personaIdNumber = personaId ? parseInt(personaId, 10) : 0;



  const [descInput, setDescInput] = useState<string>("");

  // get role data function call
  const { data, loading, refetch } = useQuery(
    GET_ROLE_DATA, {
      variables: { 
        getSceneId: sceneIdNumber
      }
    })

    const roles = data?.getScene.roles
   
    const filteredRoles = roles ? roles.filter((role) => role.persona.id === personaIdNumber) : [];

    const myRole = filteredRoles[0]

    



    const desc = myRole?.description || null;

    const descValue = descInput != "" ? descInput : desc
  
    const isDirty = (descValue != desc) ? true : false

    const storyId = data?.getScene.story.id

  // update role data function call
  const [updateRole] = useMutation(UPDATE_ROLE, {
    refetchQueries: [{ query: GET_ROLE_DATA, variables: { getSceneId: sceneIdNumber } }]
  })


const [createAction] = useMutation(CREATE_ACTION, {
  refetchQueries: [{ query: GET_ROLE_DATA, variables: { getSceneId: sceneIdNumber } }]
})

const [deleteAction] = useMutation(DELETE_ACTION, {
  refetchQueries: [{ query: GET_ROLE_DATA, variables: { getSceneId: sceneIdNumber } }]
})


    const handleFieldChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
      event.preventDefault()
  
      const { name, value } = event.target;
      const newValue = value === "" ? null : value;
      setDescInput( newValue )
    }


  // save role needs to be general because we are doing actions with creation card, and I dont care to have to do two update functions
  const handleSave: React.MouseEventHandler<HTMLButtonElement> = async (event) => {
    event.preventDefault()


    await updateRole({
      variables: {
        sceneId: sceneIdNumber,
        personaId: personaIdNumber,
        input: {
          description: descInput
        }
      }
    })
  }



  const handleActionCreate = async (name: string) => {

  
    const result = await createAction({ 
      variables: { 
        input : {
          name: name,
          storyId: storyId
        }
      } });


  
    
    const actId = result.data.createAction.id

    await updateRole({
      variables: {
        sceneId: sceneIdNumber,
        personaId: personaIdNumber,
        input: {
          addActionIds: [actId]
        }
      }
    })

      refetch();

  }


  const handleActionDelete = (Id: number) => {

    //might be able to just delete it and not add to the persona
    deleteAction({
      variables: { deleteActionId: Id },
    });
  };




  if (loading) return <Typography>
    Loading...
  </Typography>




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
        disabled={!isDirty}
        onClick={handleSave}
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



    
          <TextField
              label="Description"
              name="description"
              variant="outlined"
              multiline
              minRows={5}
              maxRows={10}
              fullWidth
              sx={sectionPadding}
              value={descValue}
              onChange={handleFieldChange} // handleFieldChange for description
              InputLabelProps={{
                shrink: descValue !== "",
              }}
            />



          <Box>
          <Typography
        variant="h4"
        sx={{
          padding: '10px'
        }}>
        Actions
      </Typography>
      <CreateCard
              text="Create Action"
              placeholder="Action Name"
              sx={cardStyle}
              onSubmit={handleActionCreate}
            />

<Box sx={{marginTop : '1em'}}>
          {
          
          myRole.actions.map(s => {
              return <IdentityCard
                key={s.id}
                name={s.name}
                sx={cardStyle}  
                onDoSomethingClick={() => handleActionDelete(s.id)}
              />
            })}

</Box>


          </Box>

    </Box>
  </>
}//basically a list of existing users and a button to create new

export default RolePage