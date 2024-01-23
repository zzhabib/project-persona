import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { GET_INITIATED_CONNECTION, GET_RECEIVED_CONNECTION, ADD_CONNECTION } from '../queries/ConnectionPageQueries';
import { useQuery, useMutation } from '@apollo/client';
import BackButton from '../components/BackButton';
import Button from '@mui/material/Button';

type ConnectionPageParams = {
    personaId: string,
    connectionId: string
  }
  



const ConnectionPage: React.FC = () => {


  const { personaId, connectionId } = useParams<ConnectionPageParams>();
    

  const personaIdNumber = personaId ? parseInt(personaId, 10) : 0;
  const connectionIdNumber = connectionId ? parseInt(connectionId, 10) : 0;





    const { loading: initiatedLoad, data: initiatedData, refetch: initiatedRefetch } = useQuery(
        GET_INITIATED_CONNECTION, {
          variables: { 
            targetPersonaId: connectionIdNumber,
            getPersonaId: personaIdNumber
          }
    })


    const { loading: receivedLoad, data: receivedData, refetch: receivedRefetch } = useQuery(
      GET_RECEIVED_CONNECTION, {
        variables: { 
          getPersonaId : personaIdNumber,
           sourcePersonaId : connectionIdNumber
        }
    })
    
  const refetchBoth = () => {
    initiatedRefetch();
    receivedRefetch();
  };
  

    const [addConnection] = useMutation(ADD_CONNECTION, {
        refetchQueries: [
          { query: GET_INITIATED_CONNECTION},
          { query: GET_RECEIVED_CONNECTION},
        ],
      });
  
      
      const handleConnectionCreate = (source: number, target:number) => {
        addConnection({
            variables: {
              "input": {
                  "addInitiatedConnectionInputs": [
                    {
                      "description": "",
                      "targetPersonaId": target
                    }
                  ]
                },
                "updatePersonaId": source
            }
        })

        refetchBoth();
    }
    
    
    

    
    
    
    const initiatedPersonaName = initiatedData?.getPersona.initiatedConnections[0]?.targetPersona?.name ?? null;
    const initiatedPersonaDesc = initiatedData?.getPersona.initiatedConnections[0]?.description ?? null;


    const targetPersonaName = receivedData?.getPersona.receivedConnections[0]?.sourcePersona?.name ?? null;
    const targetPersonaDesc = receivedData?.getPersona.receivedConnections[0]?.description ?? null;

  
    if (receivedLoad || initiatedLoad) return <Typography>
    Loading...
  </Typography>

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
                  


        {!initiatedPersonaName && !initiatedPersonaDesc &&
            <Button onClick={() => handleConnectionCreate(personaIdNumber, connectionIdNumber)}>
              Create Initiated Connection
            </Button>
          }

                  
      </Box>

      {/* Second Column */}

      <Box flex="1" border="1px solid gray" padding="16px">
        <Typography variant="h6">Target</Typography>
        <Box>{targetPersonaName}</Box>
                  <Box>{targetPersonaDesc}</Box>
                  


        {!targetPersonaName && !targetPersonaDesc &&
            <Button onClick={() => handleConnectionCreate(connectionIdNumber, personaIdNumber)}>
              Create Recieved Connection
            </Button>
          }

                  
      </Box>




    </Box>
    </Box>
  );
};

export default ConnectionPage;