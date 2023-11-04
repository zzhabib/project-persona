import React from "react";
import ScenePage from "./scenePage";
 
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const ScenesPage = () => {
    return (
        <div>
            <h1>
                This is the Scenes Page
        </h1>
        
        <Popup trigger={<button> New Scene</button>} position="right center">
          <ScenePage />
        </Popup>

        <h2>
                Your Scenes
            </h2>


      </div>
      



    );
};
 
export default ScenesPage;

//Need to run a query to grab users scenes then display

