import React, { useEffect, useState } from 'react';
import { Box, Typography, TextField } from '@mui/material';
import { useParams } from 'react-router-dom';
import { GET_INITIATED_CONNECTION, GET_RECEIVED_CONNECTION, ADD_CONNECTION, UPDATE_CONNECTION } from '../queries/ConnectionPageQueries';
import { useQuery, useMutation } from '@apollo/client';
import BackButton from '../components/BackButton';
import Button from '@mui/material/Button';
import { sectionPadding } from '../styles/styles';
import { PersonaUpdateInput } from '../gql/graphql';

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


      const [updateConnection] = useMutation(UPDATE_CONNECTION, {
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
    
    const handleConnectionUpdate = (source: number, target:number, desc: string) => {
      updateConnection({
          variables: {
            "input": {
              "modifyInitiatedConnectionInputs": [
                {
                  "description": desc,
                  "targetPersonaId": target
                }
              ]
            },
            "updatePersonaId": source
          }
      })

      refetchBoth();
  }





    const [updateInitiatedInput, setUpdateInitiatedInput] = useState<string>('');
    const [updateReceivedInput, setUpdateReceivedInput] = useState<string>('');

    

    const handleInitiatedFieldChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    event.preventDefault();
    const { value } = event.target;

    setUpdateInitiatedInput(value);
  };

  const handleReceivedFieldChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    event.preventDefault();
    const { value } = event.target;

  
    setUpdateReceivedInput(value);
  };

    
    const myName = initiatedData?.getPersona.name ?? null;
    
    const initiatedPersonaName = initiatedData?.getPersona.initiatedConnections[0]?.targetPersona?.name ?? null;
    const initiatedPersonaDesc = initiatedData?.getPersona.initiatedConnections[0]?.description ?? null;


    const targetPersonaName = receivedData?.getPersona.receivedConnections[0]?.sourcePersona?.name ?? null;
    const targetPersonaDesc = receivedData?.getPersona.receivedConnections[0]?.description ?? null;





  const initiatedDescValue = updateInitiatedInput !== ''
    ? updateInitiatedInput
    : initiatedPersonaDesc;

  const receivedDescValue = updateReceivedInput !== ''
    ? updateReceivedInput
    : targetPersonaDesc;




  
    if (receivedLoad || initiatedLoad) return <Typography>
    Loading...
  </Typography>

  return (
    <Box>
      <BackButton/>
          <Typography variant="h4">{myName} connection with {targetPersonaName}</Typography>
          
          <Box display="flex">
      {/* First Column */}
      <Box flex="1" border="1px solid gray" padding="16px">
        <Typography variant="h6">Source</Typography>

        <TextField
              label="Description"
              name="initiatedDesc"
              variant="outlined"
              multiline
              minRows={5}
              maxRows={10}
              fullWidth
              sx={sectionPadding}
              value={initiatedDescValue}
              onChange={handleInitiatedFieldChange} 
            />
                  

        {!initiatedPersonaName && !initiatedPersonaDesc &&
            <Button onClick={() => handleConnectionCreate(personaIdNumber, connectionIdNumber)}>
              Create Initiated Connection
            </Button>
          }

                  
      </Box>

      {/* Second Column */}

      <Box flex="1" border="1px solid gray" padding="16px">
        <Typography variant="h6">Received</Typography>
          <TextField
              label="Description"
              name="recievedDesc"
              variant="outlined"
              multiline
              minRows={5}
              maxRows={10}
              fullWidth
              sx={sectionPadding}
              value={receivedDescValue}
              onChange={handleReceivedFieldChange} 
            />
                  


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