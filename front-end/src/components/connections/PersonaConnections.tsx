import React from 'react';
import { Box } from "@mui/material";
import ConnectionCard from './ConnectionCard';
import { cardStyle } from "../../styles/styles";
import { useNavigate } from 'react-router';
import CreateCard from '../CreateCard';

import ConnectionContactList from './ConnectionContactList';


type PersonaConnectionsProps = {
  initiatedConnections: Array<{ targetPersona: { id: number; name: string } }>;
  receivedConnections: Array<{ sourcePersona: { id: number; name: string } }>;
  personaId: number;
  allPersonas: {
    id: number;
    name: string;
  }[];
  refetchData: () => void;
};

const PersonaConnections: React.FC<PersonaConnectionsProps> = ({ initiatedConnections, receivedConnections, personaId, allPersonas, refetchData }) => {
    const navigate = useNavigate()
    const combineConnectionsData = () => {
    const combinedConnections: { [name: string]: { id: number; initiatedConnection: boolean; receivedConnection: boolean } } = {};

    // Map initiated connections
    initiatedConnections.forEach(connection => {
      const { id, name } = connection.targetPersona;
      if (!combinedConnections[name]) {
        combinedConnections[name] = { id, initiatedConnection: true, receivedConnection: false };
      } else {
        combinedConnections[name].initiatedConnection = true;
      }
    });

    // Map received connections
    receivedConnections.forEach(connection => {
      const { id, name } = connection.sourcePersona;
      if (!combinedConnections[name]) {
        combinedConnections[name] = { id, initiatedConnection: false, receivedConnection: true };
      } else {
        combinedConnections[name].receivedConnection = true;
      }
    });

    // Convert the combinedConnections object into an array
    const combinedConnectionsArray = Object.keys(combinedConnections).map(name => ({
      name,
      ...combinedConnections[name],
    }));

    return combinedConnectionsArray;
  };

  const connectionsData = combineConnectionsData();




  return (
    <Box>
      <ConnectionContactList
          myPersonaId={personaId}
          allPersonas={allPersonas}
          connectedPersonas={connectionsData}
          />

      {connectionsData.map(connection => (
        <ConnectionCard
          key={connection.name}
          personaId={personaId}
          otherPersonaName={connection.name}
          otherPersonaId={connection.id}
          initiatedConnection={connection.initiatedConnection}
          recievedConnnection={connection.receivedConnection}
          sx={cardStyle}
          onClick={() => {
             navigate(`/persona/${personaId}/connections/${connection.id}`)
          }}
          // onDoSomethingClick={}
        />
      ))}
    </Box>
  );
};

export default PersonaConnections;