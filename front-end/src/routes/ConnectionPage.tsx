import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { GET_CONNECTION } from '../queries/ConnectionPageQueries';
import { useQuery } from '@apollo/client';
import BackButton from '../components/BackButton';


type ConnectionPageParams = {
    personaId: string,
    connectionId: string
  }
  



const ConnectionPage: React.FC = () => {
    const { personaId, connectionId } = useParams<ConnectionPageParams>();
    

    const personaIdNumber = personaId ? parseInt(personaId, 10) : 0;
    const connectionIdNumber = connectionId ? parseInt(connectionId, 10) : 0;




    const { loading, error, data } = useQuery(
        GET_CONNECTION, {
          variables: { 
            targetPersonaId: personaIdNumber,
            getPersonaId: connectionIdNumber
          }
    })
    

    const { loading2, error2, data2 } = useQuery(
        GET_CONNECTION, {
          variables: { 
            targetPersonaId: connectionIdNumber,
            getPersonaId: personaIdNumber
          }
        })
  
    


  return (
    <Box>
      <BackButton/>
          <Typography variant="h4">Connections Page Content</Typography>
          
          <Box display="flex">
      {/* First Column */}
      <Box flex="1" border="1px solid gray" padding="16px">
        <Typography variant="h6">Source</Typography>
        <Box>{data?.getPersona.initiatedConnections[0].targetPersona.name}</Box>
        <Box>{data?.getPersona.initiatedConnections[0].description}</Box>
      </Box>

      {/* Second Column */}
      <Box flex="1" border="1px solid gray" padding="16px">
        <Typography variant="h6">Target</Typography>
        <Box>{data2?.getPersona.initiatedConnections[0].targetPersona.name}</Box>
        <Box>{data2?.getPersona.initiatedConnections[0].description}</Box>
      </Box>
    </Box>
    </Box>
  );
};

export default ConnectionPage;