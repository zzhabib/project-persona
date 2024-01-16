import React from 'react';
import { useParams } from "react-router";
import { Box, List, ListItem, Divider, Typography, ListItemButton } from '@mui/material';

const Playground = () => {
  const storySessionId = useParams().storySessionId;

  return (
    <Box display="flex" height="100vh">
      <Box width="25%" bgcolor="grey.200">
        <Typography variant="h5" align="center">Personas</Typography>
        <List>
          {/* Replace with your contacts data */}
          <ListItemButton>
            <Typography>Persona 1</Typography>
          </ListItemButton>
          <Divider />
          <ListItemButton>
            <Typography>Persona 2</Typography>
          </ListItemButton>
          <Divider />
          {/* Add more ListItems for more contacts */}
        </List>
      </Box>
      <Box width="75%" bgcolor="grey.100" p={2}>
        <Typography variant="h5" align="center">Conversation</Typography>
        {/* Replace with your conversation component */}
      </Box>
    </Box>
  );
}

export default Playground;