// Code in this function adapted from the CS340 starter code.
// Date Accessed: 4 August 2024
// URL: https://github.com/osu-cs340-ecampus/react-starter-app

import { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

// bootstrap components
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const UpdateSoilType = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const prevSoilType = location.state.SoilType;

  const [formData, setFormData] = useState({
    soilType:           prevSoilType.soilType || '' ,
    soilDescription:    prevSoilType.soilDescription || '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  function isUpdate(){
    // Check if formData is equal to prevSoilType
    if (JSON.stringify(formData) === JSON.stringify({
      soilType:         prevSoilType.soilType || '',
      soilDescription:  prevSoilType.soilDescription || '',
    })) {
      alert("No changes made.");
      return false;
    }
    return true
  }

  const handleSubmit = async (event) => {
    // Stop default form behavior which is to reload the page
    event.preventDefault();
    // Check if formData is equal to prevSoilType
    if (isUpdate()){
      try {
        const URL = import.meta.env.VITE_API_URL + "soilTypes/" + id;
        const response = await axios.put(URL, formData);
        if (response.status !== 200) {
          alert("Error updating soil type!");
        } else {
          alert(response.data.message);
          // Redirect to SoilTypes page
          navigate("/soilTypes");
        // Citation for this line of code
        // Forces the page to reload to display the new data
        // URL: https://stackoverflow.com/questions/56649094/how-to-reload-a-component-part-of-page-in-reactjs
        // Date Accessed: 5 August 2024
        // window.location.reload();
        }
      } catch (err) {
        console.log("Error updating soil type:", err);
      }
    }
  };

  return (
    <div>
      <h2>Update Soil</h2>
      <br />



      <Form onSubmit={handleSubmit}>

      
          <Row>
              <Col>
                  <Form.Label >Soil Name</Form.Label>
                  <Form.Control
                      required
                      type="text"
                      name="soilType"
                      defaultValue={prevSoilType.soilType}
                      onChange={handleInputChange}
                      autoFocus
                  />
              </Col>
              <Col>
                  <Form.Label >Description (Optional)</Form.Label>
                  <Form.Control
                      type="text"
                      as="textarea" 
                      rows={1}
                      name="soilDescription"
                      defaultValue={prevSoilType.soilDescription}
                      onChange={handleInputChange}
                  />
              </Col>
          </Row>
          <br />
          <Container >
          <br />
          <Row>
            <Col> 
              <Button variant="secondary" type="button" onClick={() => navigate("/soilTypes")} >Cancel</Button>{' '}
            </Col>
            
            <Col> 
              <Button variant="success" type="submit">Update</Button>{' '}
            </Col>
          
          
          </Row>

      </Container>

      </Form>

    </div>
  );
};

export default UpdateSoilType;

