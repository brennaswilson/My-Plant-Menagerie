// Code in this function adapted from the CS340 starter code.
// Date Accessed: 4 August 2024
// URL: https://github.com/osu-cs340-ecampus/react-starter-app

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Button from 'react-bootstrap/Button';

function CreateSoilType() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    soilType: "",
    soilDescription: "",
  });
  
  const handleSubmit = async (e) => {
    // Prevent page reload
    e.preventDefault();
    // Create a new SoilType object from the formData
    const newSoilType = {
      soilType: formData.soilType,
      soilDescription: formData.soilDescription,
    };

    try {
      const URL = import.meta.env.VITE_API_URL + "soilTypes";
      const response = await axios.post(URL, newSoilType);
      if (response.status === 201) {
        navigate("/soilTypes");
      } else {
        alert("Error creating SoilType");
      }
    } catch (error) {
      alert("Error creating SoilType");
      console.error("Error creating SoilType:", error);
    }
    // Reset the form fields
    resetFormFields();
  };

  const resetFormFields = () => {
    setFormData({
      soilType: "",
      soilDescription: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      <h2>Create Soil Type</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="soilType">Soil Name</label>
        <input
          type="text"
          name="soilType"
          defaultValue={formData.soilType}
          onChange={handleInputChange}
        />
        <label htmlFor="soilDescription">Soil Description</label>
        <input
          type="text" 
          name="soilDescription"
          defaultValue={formData.soilDescription}
          onChange={handleInputChange}
        />
        <br /><br />
        <Button type="submit">Submit</Button>
      </form>
    </>
  );
}

export default CreateSoilType;
