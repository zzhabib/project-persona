import React from "react";
import ScenePage from "./scenePage";
 
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { gql, useQuery } from '@apollo/client';



const GET_SCENES = gql`
query AllScenes {
  allScenes {
    title
  }
}
`;



const ScenesPage = () => {
  const { loading, error, data } = useQuery(GET_SCENES);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }


    return (
      <div>
      <h1>This is the Scenes Page</h1>
      
      <Popup trigger={<button> New Scene</button>} position="right center">
        <ScenePage />
      </Popup>
      <h2>Your Scenes</h2>
  
      {data.allScenes.map((scene, index) => (
        <div>
          <Popup key={index} trigger={<button>{scene.name}</button>} position="right center">
            <ScenePage sceneName={scene.name} />
          </Popup>
        </div>
      ))}

    </div>

    );
};
 
export default ScenesPage;

//Need to run a query to grab users scenes then display

