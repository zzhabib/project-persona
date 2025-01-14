import React from 'react';
import { Box, Typography, Select, MenuItem, ListItemButton, ListItemText } from '@mui/material';
import { ADD_ROLE } from '../../queries/ScenePageQueries';
import { useMutation } from '@apollo/client';


type RoleContactList = {
  sceneId: number;
  storyId: number;
  existingRolePersonas?: {persona : {
    id: number;
    name: string;
}}[];
  allPersonas?: {
    id: number;
    name: string;
  }[];
  refetchData: () => void;
};

const RoleContactList: React.FC<RoleContactList> = ({
    sceneId,
    storyId,
    allPersonas = [],
    existingRolePersonas = [],
    refetchData
}) => {
  const filterIds = existingRolePersonas.map((item) => item.persona.id);
  const displayPersonas = allPersonas.filter((persona) => !filterIds.includes(persona.id));




  const [addRole] = useMutation(ADD_ROLE);



  const handleRoleCreate = async (personaId: number, sceneId: number) => {
    await addRole({
      variables: {
        input: {
          personaId: personaId,
          sceneId: sceneId,
          description: "",
          actionIds: []
        }
      }
    })

    refetchData();

  }





  return (
    <Box>

        <>
          <Typography variant="h6">Add Roles:</Typography>
          <Select
            value=''
            label="Select Persona"
            onChange={(event) => {
              const selectedPersonaId = parseInt(event.target.value as string, 10);
              // Handle the navigation or connection logic with the selectedPersonaId
              console.log(`Adding role for Persona ID: ${selectedPersonaId} in SCENE ID: ${sceneId}`);

                handleRoleCreate(selectedPersonaId, sceneId)
              

            }}
          >
            {displayPersonas.map((persona) => (
              <MenuItem key={persona.id} value={persona.id}>
                <ListItemButton>
                  <ListItemText primary={persona.name} />
                </ListItemButton>
              </MenuItem>
            ))}
          </Select>
        </>

    </Box>
  );
};

export default RoleContactList;