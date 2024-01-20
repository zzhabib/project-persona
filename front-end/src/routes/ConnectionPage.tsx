import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { GET_INITIATED_CONNECTION, GET_RECEIVED_CONNECTION } from '../queries/ConnectionPageQueries';
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
        GET_INITIATED_CONNECTION, {
          variables: { 
            targetPersonaId: personaIdNumber,
            getPersonaId: connectionIdNumber
          }
    })
    

    const g2 = useQuery(
        GET_RECEIVED_CONNECTION, {
          variables: { 
            getPersonaId : connectionIdNumber,
             sourcePersonaId : personaIdNumber
          }
    })
    
    const data2 = g2.data
  
    const initiatedPersonaName = data?.getPersona.initiatedConnections[0]?.targetPersona?.name ?? null;
    const initiatedPersonaDesc = data?.getPersona.initiatedConnections[0]?.description ?? null;


    const targetPersonaName = data2?.getPersona.receivedConnections[0]?.sourcePersona?.name ?? null;
    const targetPersonaDesc = data2?.getPersona.receivedConnections[0]?.description ?? null;

    
    console.log(data2)



  return (
    <Box>
      <BackButton/>
          <Typography variant="h4">Connections Page Content</Typography>
          
          <Box display="flex">
      {/* First Column */}
      <Box flex="1" border="1px solid gray" padding="16px">
        <Typography variant="h6">Source</Typography>
        <Box>{initiatedPersonaName}</Box>
        <Box>{initiatedPersonaDesc}</Box>
      </Box>

      {/* Second Column */}
      <Box flex="1" border="1px solid gray" padding="16px">
        <Typography variant="h6">Target</Typography>
        <Box>{targetPersonaName}</Box>
        <Box>{targetPersonaDesc}</Box>
      </Box>
    </Box>
    </Box>
  );
};

export default ConnectionPage;