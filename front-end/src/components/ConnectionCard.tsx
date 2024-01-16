import React from 'react';
import IdentityCard from './IdentityCard'; // Import your IdentityCard component
import { Theme } from "@emotion/react"
import { SxProps } from "@mui/material"



interface Connection {
  targetPersona: {
    id: string;
    name: string;
  };
  type: string;
}

interface YourComponentProps {
  data: {
    getPersona: {
      initiatedConnections: Connection[];
      receivedConnections: Connection[];
    };
  };
  personaId: string;
}


const cardStyle: SxProps<Theme> = {
    width: '20em'
  }
  
  



const ConnectionCard: React.FC<YourComponentProps> = ({ data }) => {
  // Assuming data contains initiatedConnections and receivedConnections arrays

  // Combine initiated and received connections into a single array
  const allConnections: Connection[] = [
    ...data?.getPersona.initiatedConnections.map(connection => ({ ...connection, type: 'initiated' })),
    ...data?.getPersona.receivedConnections.map(connection => ({ ...connection, type: 'received' })),
  ];

  // Create a set to keep track of unique persona IDs
  const uniquePersonas = new Set<string>();

  return (
    <div>
      {allConnections.map(connection => {
        // Check if the persona ID is already in the set, skip if duplicate
        if (uniquePersonas.has(connection.targetPersona.id)) {
          return null;
        }

        // Add persona ID to the set to avoid duplicates
        uniquePersonas.add(connection.targetPersona.id);

        return (
          <IdentityCard
            key={?props}
            name={connection.targetPersona.name}
            sx={cardStyle}
          >
            {/* Red square for initiated connections */}
            {connection.type === 'initiated' && (
              <div style={{ backgroundColor: 'red', width: '10px', height: '10px' }} />
            )}

            {/* Blue square for received connections */}
            {connection.type === 'received' && (
              <div style={{ backgroundColor: 'blue', width: '10px', height: '10px' }} />
            )}
          </IdentityCard>
        );
      })}
    </div>
  );
};

export default ConnectionCard;