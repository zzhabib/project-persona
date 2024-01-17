import React from 'react';
import { useParams } from "react-router";
import { Box, List, ListItem, Divider, Typography, ListItemButton, MenuItem, Select } from '@mui/material';
import PersonaContactList from '../components/playground/PersonaContactList';
import { useQuery } from '@apollo/client';
import { GET_STORY_SESSION } from '../queries/PlaygroundQueries';
import { GetStorySessionQuery, GetStorySessionQueryVariables, QueryGetStorySessionArgs } from '../gql/graphql';
import PersonaConversation from '../components/playground/PersonaConversation';

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
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        maxHeight: '100%',
        width: '100%',
        border: '1px solid #ccc',
      }}
    >
      <Box
        sx={{
          maxWidth: '200px'
        }}
      >
        <PersonaContactList
          selectedFromPersonaId={selectedFromPersonaId}
          selectedTargetPersonaId={selectedTargetPersonaId}
          onChange={handlePersonaChange}
          personas={personas}
        />
      </Box>
      <PersonaConversation
        storySessionId={storySessionId}
        fromPersonaId={selectedFromPersonaId}
        targetPersonaId={selectedTargetPersonaId}
      />
    </Box>
  );
}

export default Playground;