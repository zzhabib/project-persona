import PersonaPage from "./personaPage";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { gql, useQuery } from '@apollo/client';
import React from 'react';

const GET_PERSONAS = gql`
  query AllPersonas {
    allPersonas {
      name
    }
  }
`;

const PersonasPage = () => {
  const { loading, error, data } = useQuery(GET_PERSONAS);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }


  return (
    <div>
      <h1>This is the Personas Page</h1>
      <Popup trigger={<button> New Persona</button>} position="right center">
        <PersonaPage />
      </Popup>
      <h2>Your Personas</h2>
      
          
          
      {data.allPersonas.map((persona, index) => (
        <div>
          <Popup key={index} trigger={<button>{persona.name}</button>} position="right center">
            <PersonaPage personaName={persona.name} />
          </Popup>
        </div>
      ))
      }
      


      


    </div>
  );
};

export default PersonasPage;