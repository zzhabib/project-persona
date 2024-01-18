import React from 'react';
import { useParams } from "react-router";
import { Box, List, ListItem, Divider, Typography, ListItemButton, MenuItem, Select, Paper } from '@mui/material';
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
        height: 'calc(100vh - 64px)',
        width: '100vw',
        margin: 0,
        padding: 0,
        overflow: 'hidden',
        boxSizing: 'border-box',
      }}
    >
      <Paper
        elevation={4}
        sx={{
          minWidth: '200px',
          maxWidth: '200px',
          padding: '1rem',
          overflow: 'auto',
        }}
      >
        <PersonaContactList
          selectedFromPersonaId={selectedFromPersonaId}
          selectedTargetPersonaId={selectedTargetPersonaId}
          onChange={handlePersonaChange}
          personas={personas}
        />
      </Paper>

      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          maxWidth: '1000px',
          margin: '0 auto',
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
            {
              scenes.length === 0 ? 'Please create a scene in order to use the playground' : 'Select personas to chat'
            }
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