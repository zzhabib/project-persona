import React from "react";
import { useQuery , gql } from "@apollo/client";
import { useState } from "react";
import { useEffect } from "react";
import { useMutation } from "@apollo/client";
import './pages.css';



const GET_SCENES = gql`
query AllScenes {
  allScenes {
    title
    description
    id
  }
}
`;


const CREATE_SCENE  = gql`
mutation CreateScene($input: SceneInput!) {
  createScene(input: $input) {
    title
    id
    description
  }
}
`;


const EDIT_SCENE  = gql`
mutation UpdateScene($input: SceneUpdateInput!, $updateSceneId: Int!) {
  updateScene(input: $input, id: $updateSceneId)
}
`;

/*
const DELETE_SCENE  = gql`
mutation DeletePersona($deletePersonaId: Int!) {
  deletePersona(id: $deletePersonaId)
}
`;

*/






export default function ScenePage(sceneId) {
 
    const [formData, setFormData] = useState({
      title: "",
      description: "",

    });
  
    const id = sceneId;
    const { loading, error, data } = useQuery(GET_SCENES, {
      variables: { id }
    });
  

  const [createScene] = useMutation(CREATE_SCENE);
  const [editScene] = useMutation(EDIT_SCENE);
  //const [deleteScene] = useMutation(DELETE_SCENE);
  
  
  useEffect(() => {
    if (!loading && !error && data && data.allScenes) {
      // If data is available, set the form values based on it
      const sceneData = data.allScenes;
      setFormData({
        name: sceneData.name,
        description: sceneData.description,
      });
    }
  }, [loading, error, data, sceneId]);
  
  
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    alert(`Title: ${formData.title}, Description: ${formData.description}`);

    if (!loading && !error && data && data.allScenes) {
      await editScene({
        variables: {
          input: {
            name: formData.title,
            description: formData.description
          },
          updatePersonaId:  data.getPersonaByName.id 
        },
      });
    }
    else {
      await createScene({
        variables: {
          input: {
            title: formData.title,
            description: formData.description,
            id: formData.id
          },
        },
      });
    }

    window.location.reload();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Title:</label>
      <input type="text" id="title" name="title" value={formData.title} onChange={handleChange}/>

      <label htmlFor="description">Description:</label>
      <input type="text" id="description" name="description" value={formData.description} onChange={handleChange}/>

      <label htmlFor="id">Story Id:</label>
      <input type="text" id="id" name="id" value={formData.id} onChange={handleChange}/>



      <button type="submit">Submit</button>
    </form>
  );
}


//to select personnas we would have to do a lot more on the backend
//at this point, best functionality we can hope for is

//Make stories and personas with or without connections to
//existing scenes and personas

//scenes will have to be made without inherent connections
// and will be the defacto block