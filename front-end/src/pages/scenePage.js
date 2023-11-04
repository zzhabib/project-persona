import React from "react";
 
import { useState } from "react";

export default function ScenePage() {
 
    const [formData, setFormData] = useState({
        title: "",
        description: "",
    });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Title: ${formData.title}, Description: ${formData.description}`
    );
};

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Title:</label>
      <input type="text" id="title" name="title" value={formData.title} onChange={handleChange}/>

      <label htmlFor="description">Description:</label>
      <input type="text" id="description" name="description" value={formData.description} onChange={handleChange}/>

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