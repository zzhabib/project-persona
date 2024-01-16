import React, { MouseEventHandler, useState } from 'react';
import { Box, Typography, Select, MenuItem, List, ListItem, ListItemText, SelectChangeEvent, ListItemButton } from '@mui/material';
import { Theme, makeStyles } from '@mui/material/styles';
import { useQuery } from '@apollo/client';

type PersonaContactListProps = {
  personas: {
    id: number;
    name: string;
  }[];
}

const PersonaContactList: React.FC<PersonaContactListProps> = ({
  personas
}) => {
  const [fromPersonaId, setFromPersonaId] = useState<string>("");
  const [targetPersonaId, setTargetPersonaId] = useState<string>("");

  const handleFromPersonaChange = (event: SelectChangeEvent) => {
    if (event.target.value == targetPersonaId) {
      setTargetPersonaId("");
    }
    setFromPersonaId(event.target.value);
  };

  const otherPersonas = personas.filter((persona) => persona.id !== parseInt(fromPersonaId));

  return (
    <Box>
      <Typography variant="h6">Chat as:</Typography>
      <Select
        fullWidth
        value={fromPersonaId}
        onChange={handleFromPersonaChange}>
        {personas.map((persona) => (
          <MenuItem
            key={persona.id}
            value={persona.id}>
            {persona.name}
          </MenuItem>
        ))}
      </Select>
      <Typography variant="h6">Chat with:</Typography>
      <List>
        {otherPersonas.map((persona) => (
          <ListItemButton
            selected={targetPersonaId === persona.id.toString()}
            key={persona.id}
            onClick={() => {
              setTargetPersonaId(persona.id.toString());
            }}
          >
            <ListItemText primary={persona.name} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
};

export default PersonaContactList;
