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




    const { loading, error, data } = useQuery(
        GET_INITIATED_CONNECTION, {
          variables: { 
            targetPersonaId: connectionIdNumber,
            getPersonaId: personaIdNumber
          }
    })
    

    const data2 = useQuery(
        GET_RECEIVED_CONNECTION, {
          variables: { 
            getPersonaId : personaIdNumber,
             sourcePersonaId : connectionIdNumber
          }
    }).data

    const [addInitiatedConnection] = useMutation(ADD_CONNECTION, {
        refetchQueries: [
          { query: GET_INITIATED_CONNECTION},
        ],
      });
    
      const [addReceivedConnection] = useMutation(ADD_CONNECTION, {
        refetchQueries: [
          { query: GET_RECEIVED_CONNECTION},
        ],
      });
    
    
      console.log(connectionIdNumber)
      console.log(personaIdNumber)

      const handleInitiatedConnectionCreate = (description: string) => {
          addInitiatedConnection({
              variables: {
                "input": {
                    "addInitiatedConnectionInputs": [
                      {
                        "description": description,
                        "targetPersonaId": connectionIdNumber
                      }
                    ]
                  },
                  "updatePersonaId": personaIdNumber
              }
          })
      }
      
      const handleReceivedConnectionCreate = (description: string) => {
        addReceivedConnection({
            variables: {
              "input": {
                  "addInitiatedConnectionInputs": [
                    {
                      "description": description,
                      "targetPersonaId": personaIdNumber
                    }
                  ]
                },
                "updatePersonaId": connectionIdNumber
            }
        })
    }
    
    
    
    
    
    
    
    
    const initiatedPersonaName = data?.getPersona.initiatedConnections[0]?.targetPersona?.name ?? null;
    const initiatedPersonaDesc = data?.getPersona.initiatedConnections[0]?.description ?? null;


    const targetPersonaName = data2?.getPersona.receivedConnections[0]?.sourcePersona?.name ?? null;
    const targetPersonaDesc = data2?.getPersona.receivedConnections[0]?.description ?? null;

  


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
            <Button onClick={() => handleInitiatedConnectionCreate('New Description')}>
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
            <Button onClick={() => handleReceivedConnectionCreate('New Description')}>
              Create Recieved Connection
            </Button>
          }

                  
      </Box>




    </Box>
    </Box>
  );
};

export default ConnectionPage;