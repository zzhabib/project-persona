import React from "react";
import { useQuery , gql } from "@apollo/client";
import { useState } from "react";
import { useEffect } from "react";
import Popup from "reactjs-popup";






const GET_EXISTING_STORIES  = gql`
query GetPersona($name: String!) {
  getPersonaByName(name: $name) {
    description
    name
  }
}
`;

const CREATE_PERSONA  = gql`
mutation CreatePersona($input: PersonaInput!) {
  createPersona(input: $input) {
    description
    name
  }
}
`;

/*
const CHANGE_PERSONA  = gql`
  //need to develop query that grabs id from personaName input, then updates persona based on how the form has been
  //changed on submit
`;

*/



export default function PersonaPage({personaName}) {


    const [formData, setFormData] = useState({
        name: "",
        description: "",
        stories: [],
    });
  
  console.log(personaName);
  const name = personaName;
    const { loading, error, data } = useQuery(GET_EXISTING_STORIES, {
      variables: { name }
    });
  
  console.log(data);


  useEffect(() => {
    if (!loading && !error && data && data.getPersonaByName) {
      // If data is available, set the form values based on it
      const personaData = data.getPersonaByName;
      setFormData({
        name: personaData.name,
        description: personaData.description,
        stories: [],
      });
    }
  }, [loading, error, data, personaName]);


  
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };//this is jsut constantly updating the data to handle it, so I think this stays the same

  const handleSubmit = (event) => {
    event.preventDefault();
    
    alert("Updated Data, please click somewhere else to close");
    //alert(`Name: ${formData.name}, Description: ${formData.description}, Stories: ${formData.stories}`);//Instead of alerting we want to call a mutate query to the database here -- need to call different queries depending on if personaName entered


    if (!loading && !error && data && data.getPersonaByName) {
    

    }//if this is for an existing data point we want to mutate that data point based on Id
    else {



    }//in this case it is making a new persona
    

  };




  return (
    <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />

          <label htmlFor="description">Description:</label>
          <input type="text" id="description" name="description" value={formData.description} onChange={handleChange} />

          <label htmlFor="stories">Stories:</label>
          <textarea type="text" id="stories" name="stories" value={formData.stories} onChange={handleChange} />

          <button type="submit">Submit</button>
        </form>
    </div>

  );
}

//ideally here, on the formload, we want to load the users existing stories
//into a selection box for the stories then the user can just select
//for now since cant query, just gonna make it text option