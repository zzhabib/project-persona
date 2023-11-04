import React from "react";
 
import { useState } from "react";

export default function StoryPage() {
 
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        personas: "",
        scenes: "",
    });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Title: ${formData.title}, Description: ${formData.description}, Personas: ${formData.personas}, Scenes: ${formData.scenes}`
    );
};

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Title:</label>
      <input type="text" id="title" name="title" value={formData.title} onChange={handleChange}/>

      <label htmlFor="description">Description:</label>
      <input type="text" id="description" name="description" value={formData.description} onChange={handleChange}/>

      <label htmlFor="personas">Personas:</label>
      <textarea type="text" id="personas" name="personas" value={formData.personas} onChange={handleChange}/>

      <label htmlFor="scenes">Stories:</label>
      <textarea type="text" id="scenes" name="scenes" value={formData.scenes} onChange={handleChange}/>

      <button type="submit">Submit</button>
    </form>
  );
}


//At this point description and text should be textboxes

//once again, ideally the page will run query and get all the 
//options for personas and scenes from the backend. 