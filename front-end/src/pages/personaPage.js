import React from "react";
import { useQuery , gql } from "@apollo/client";
import { useState } from "react";
import { useEffect } from "react";
import Popup from "reactjs-popup";


import { useMutation } from "@apollo/client";



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


function AddPersona(name, description) {
  const { data } = useQuery(CREATE_PERSONA,
    {
      variables: {
        description,
        name
      }
    }
  );

  return data;

}





export default function PersonaPage({ personaName }) {
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
  

  const [createPersona] = useMutation(CREATE_PERSONA);
   
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
  };//this is just constantly updating the data to handle it, so I think this stays the same

  const handleSubmit = async (event) => {
    event.preventDefault();
  

    if (!loading && !error && data && data.getPersonaByName) {
    
    }//if this is for an existing data point we want to mutate that data point based on Id
    else {
      await createPersona({
        variables: {
          input: {
            name: formData.name,
            description: formData.description,
          },
        },
      });
    }//in this case it is making a new persona

    window.location.reload();
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