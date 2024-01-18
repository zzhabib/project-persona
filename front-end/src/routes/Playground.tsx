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

  const { data, loading, error } = useQuery<GetStorySessionQuery, GetStorySessionQueryVariables>(GET_STORY_SESSION, {
    variables: {
      storySessionId: storySessionId
    }
  })
  const personas = data?.getStorySession?.story?.personas ?? [];
  const scenes = data?.getStorySession?.story?.scenes ?? [];

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
        maxHeight: '90%',
        width: '100vh',
        margin: 0,
        padding: 0,
        border: '1px solid #ccc',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          minWidth: '200px',
          maxWidth: '200px',
          padding: '1rem',
        }}
      >
        <PersonaContactList
          selectedFromPersonaId={selectedFromPersonaId}
          selectedTargetPersonaId={selectedTargetPersonaId}
          onChange={handlePersonaChange}
          personas={personas}
        />
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          padding: '1rem',
        }}
      >
        {selectedFromPersonaId === -1 || selectedTargetPersonaId === -1 ? (
          <Typography
            variant='h6'
            sx={{
              textAlign: 'center',
              opacity: 0.5,
            }}
          >
            Select personas to chat
          </Typography>
        ) : (
          <PersonaConversation
            storySessionId={storySessionId}
            fromPersonaId={selectedFromPersonaId}
            targetPersonaId={selectedTargetPersonaId}
            scenes={scenes}
          />
        )}
      </Box>
    </Box>
  );
}

export default Playground;