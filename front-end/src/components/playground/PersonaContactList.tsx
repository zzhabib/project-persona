import React, { MouseEventHandler, useState } from 'react';
import { Box, Typography, Select, MenuItem, List, ListItem, ListItemText, SelectChangeEvent, ListItemButton } from '@mui/material';
import { Theme, makeStyles } from '@mui/material/styles';
import { useQuery } from '@apollo/client';

type PersonaContactListProps = {
  selectedFromPersonaId: number,
  selectedTargetPersonaId: number,
  onChange: (changeType: 'from' | 'target', newId: number) => void
  personas: {
    id: number;
    name: string;
  }[];
}

const PersonaContactList: React.FC<PersonaContactListProps> = ({
  selectedFromPersonaId,
  selectedTargetPersonaId,
  onChange,
  personas
}) => {
  const fromPersonaId = selectedFromPersonaId.toString();
  const targetPersonaId = selectedTargetPersonaId.toString();

  const handleFromPersonaChange = (event: SelectChangeEvent) => {
    const newFromPersonaId = parseInt(event.target.value as string);
    if (event.target.value == targetPersonaId) {
      onChange('target', -1)
    }
    onChange('from', newFromPersonaId);
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
              onChange('target', persona.id);
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
