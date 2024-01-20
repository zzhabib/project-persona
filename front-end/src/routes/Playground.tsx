import React from 'react';
import { useParams } from "react-router";
import { Box, List, ListItem, Divider, Typography, ListItemButton, MenuItem, Select, Paper } from '@mui/material';
import PersonaContactList from '../components/playground/PersonaContactList';
import { useQuery } from '@apollo/client';
import { GET_STORY_SESSION } from '../queries/PlaygroundQueries';
import { GetStorySessionQuery, GetStorySessionQueryVariables, QueryGetStorySessionArgs } from '../gql/graphql';
import PersonaConversation from '../components/playground/PersonaConversation';
import BackButton from '../components/BackButton';



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
        width: '90vw',
        margin: 0,
        padding: 0,
        overflow: 'hidden',
        maxHeight: '85vh',
        boxSizing: 'border-box',
      }}
    >
          
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
      >

      <BackButton
        sx={{
          height: '3em',
          width: '8em',
          marginTop: '1em',
          marginLeft: '1em'
        }} />
      <Paper
        elevation={4}
        sx={{
          marginTop: '1em',
          marginLeft: '1em',
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
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          maxWidth: '1000px',
          margin: '0 auto',
          overflow: 'auto',
        }}
      >
        {selectedFromPersonaId === -1 || selectedTargetPersonaId === -1 ? (
          <Typography
            variant='h6'
            sx={{
              textAlign: 'center',
              opacity: 0.5,
              overflow: 'hidden',
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