import React from "react";
import StoryPage from "./storyPage";

import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

import { gql, useQuery } from '@apollo/client';


const GET_EXISTING_STORIES = gql`
query AllStories {
    allStories {
      title
    }
  }
`;



const StoriesPage = () => {

    const { loading, error, data } = useQuery(GET_EXISTING_STORIES);

    if (loading) {
      return <p>Loading...</p>;
    }
  
    if (error) {
      return <p>Error: {error.message}</p>;
    }
  




    return (
        <div>
            <h1>
                This is the Stories Page
            </h1>


            <Popup trigger={<button> New Story</button>} position="right center">
                <StoryPage />
            </Popup>
            
            <h2>Your Stories</h2>
  
            {data.allStories.map((story, index) => (
                <div>
                <Popup key={index} trigger={<button>{story.title}</button>} position="right center">
                    <StoryPage storyName={story.title} />
                </Popup>
            </div>
            ))}
        </div>
    );
};
 
export default StoriesPage;