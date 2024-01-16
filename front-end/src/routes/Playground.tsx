import React from 'react';
import { useParams } from "react-router";
import { Box, List, ListItem, Divider, Typography, ListItemButton, MenuItem, Select } from '@mui/material';
import PersonaContactList from '../components/PersonaContactList';
import { useQuery } from '@apollo/client';
import { GET_STORY_SESSION } from '../queries/PlaygroundQueries';
import { GetStorySessionQuery, GetStorySessionQueryVariables, QueryGetStorySessionArgs } from '../gql/graphql';

const Playground = () => {
  const storySessionId = parseInt(useParams().storySessionId ?? '');
  const [selectedFromPersonaId, setSelectedFromPersonaId] = React.useState(-1);
  const [selectedTargetPersonaId, setSelectedTargetPersonaId] = React.useState(-1);
  
  const { data, loading, error } = useQuery<GetStorySessionQuery, GetStorySessionQueryVariables>(GET_STORY_SESSION, { variables: { storySessionId: storySessionId } })
  const personas = data?.getStorySession?.story?.personas ?? [];

  const handlePersonaChange = (changeType: 'from' | 'target', newId: number) => {
    if (changeType === 'from') {
      setSelectedFromPersonaId(newId);
    } else {
      setSelectedTargetPersonaId(newId);
    }
  }

  return (
    <Box display="flex" height="100vh">
      <PersonaContactList
        selectedFromPersonaId={selectedFromPersonaId}
        selectedTargetPersonaId={selectedTargetPersonaId}
        onChange={handlePersonaChange}
        personas={personas}
      />
      <Box width="80%" bgcolor="grey.100" p={2}>
        <Typography variant="h5" align="center">Conversation</Typography>
        {/* Replace with your conversation component */}
      </Box>
    </Box>
  );
}

export default Playground;