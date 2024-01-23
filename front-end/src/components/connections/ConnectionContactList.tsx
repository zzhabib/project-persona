import React from 'react';
import { Box, Typography, Select, MenuItem, ListItemButton, ListItemText } from '@mui/material';
import { ADD_CONNECTION } from '../../queries/ConnectionPageQueries';
import { useMutation } from '@apollo/client';
import { Navigate, useNavigate } from 'react-router';
import { PropaneSharp } from '@mui/icons-material';

type ConnectionContactList = {
  myPersonaId: number;
  allPersonas: {
    id: number;
    name: string;
  }[];
  connectedPersonas?: {
    id: number;
    name: string;
  }[];
  refetchData: () => void;
};

const ConnectionContactList: React.FC<ConnectionContactList> = ({
  myPersonaId,
  allPersonas,
  connectedPersonas = [],
  refetchData
}) => {
  const fromPersonaId = myPersonaId.toString();
  const otherPersonas = allPersonas.filter((persona) => persona.id !== parseInt(fromPersonaId));
  const filterIds = connectedPersonas.map((persona) => persona.id);
  const displayPersonas = otherPersonas.filter((persona) => !filterIds.includes(persona.id));


  const navigate = useNavigate()






  const [addInitiatedConnection] = useMutation(ADD_CONNECTION);

  const handleInitiatedConnectionCreate = (sourceId: number, targetId: number) => {
    addInitiatedConnection({
        variables: {
          "input": {
              "addInitiatedConnectionInputs": [
                {
                  "description": '',
                  "targetPersonaId": targetId
                }
              ]
            },
            "updatePersonaId": sourceId
        }
    })
  }





  return (
    <Box>
      {fromPersonaId === '-1' ? null : (
        <>
          <Typography variant="h6">Connect with:</Typography>
          <Select
            value=''
            label="Select Persona"
            onChange={(event) => {
              const selectedPersonaId = parseInt(event.target.value as string, 10);
              // Handle the navigation or connection logic with the selectedPersonaId
              console.log(`Connecting with Persona ID: ${selectedPersonaId}`);

                handleInitiatedConnectionCreate(myPersonaId, selectedPersonaId)

                refetchData

                navigate(`/persona/${myPersonaId}/connections/${selectedPersonaId}`)
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
      )}
    </Box>
  );
};

export default ConnectionContactList;