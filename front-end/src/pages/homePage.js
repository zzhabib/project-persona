import React from "react";
import RunPrompt from "./openaiPrompt";
import { useState } from "react";



const HomePage = () => {
    const [formData, setFormData] = useState({
        prompt: "",
        result: ""
      });
      
      const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
      };//this is just constantly updating the data to handle it, so I think this stays the same
    
    
    const handleSubmit = async (event) => {
        event.preventDefault();
      
        const result = await RunPrompt();



        window.location.reload();
      };




    return (
        <div>
            <h1>
                This is the Home Page
            </h1>


        <form onSubmit={handleSubmit}>
          <label htmlFor="prompt">Prompt:</label>
          <textarea type="text" id="prompt" name="prompt" value={formData.prompt} onChange={handleChange} />

        <button type="submit">Submit</button>

                
        <textarea type="text" id="result" name="result" value={formData.result} onChange={handleChange} />
        </form>
        </div>
    );
};
 
export default HomePage;