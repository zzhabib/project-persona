import React from 'react';
import { Box, Typography, Select, MenuItem, ListItemButton, ListItemText } from '@mui/material';

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
};

const ConnectionContactList: React.FC<ConnectionContactList> = ({
  myPersonaId,
  allPersonas,
  connectedPersonas = []
}) => {
  const fromPersonaId = myPersonaId.toString();
  const otherPersonas = allPersonas.filter((persona) => persona.id !== parseInt(fromPersonaId));
  const filterIds = connectedPersonas.map((persona) => persona.id);
  const displayPersonas = otherPersonas.filter((persona) => !filterIds.includes(persona.id));

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