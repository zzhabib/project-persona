import React from "react";
 
const TestPage = () => {
    return (
        <div>
            <h1>
                This is the test Page
            </h1>
        </div>
    );
};
 
export default TestPage;


/*
import React, { useState } from "react";

let worldView = '';
let personalityTraits = '';
let actions = '';
let userTraits = '';



export default function GetData() {
    const [worldView, setWorldView] = useState("");
    const [personalityTraits, setPersonalityTraits] = useState("");
    const [actions, setActions] = useState("");
    const [userTraits, setUserTraits] = useState("");

    
return (
    <div>
      <button onClick={submitForm}>
        Submit
      </button>
      <label>Write Character Workd View</label>
        <textarea
            name="worldView"
            value={worldView}
            onChange={(e) => setWorldView(e.target.value)} />
        
        <label>Write Character Personality Traits</label>

        <textarea
            name="personalityTraits"
            value={personalityTraits}
            onChange={(e) => setPersonalityTraits(e.target.value)}/>
        
        <label>Write Possible Actions</label>

        <textarea
            name="actions"
            value={actions}
            onChange={(e) => setActions(e.target.value)}/>
        
        <label>Write Traits of Speaker</label>

        <textarea
            name="userTraits"
            value={userTraits}
            onChange={(e) => setUserTraits(e.target.value)}/>
        
    </div>
  )
}



*/