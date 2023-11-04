import React from "react";
import StoryPage from "./storyPage";

import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';


const StoriesPage = () => {
    return (
        <div>
            <h1>
                This is the Stories Page
            </h1>


            <Popup trigger={<button> New Story</button>} position="right center">
                <StoryPage />
            </Popup>

            <h2>
                Your Stories
            </h2>
        </div>
    );
};
 
export default StoriesPage;