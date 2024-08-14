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


const UpdatePlantType = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const prevPlantType = location.state.PlantType;

  const [formData, setFormData] = useState({
    commonName:       prevPlantType.commonName || '' ,
    latinName:        prevPlantType.latinName || '',
    toxicCat:         prevPlantType.toxicCat || '',
    toxicDog:         prevPlantType.toxicDog || '',
    preferredLight:   prevPlantType.preferredLight || '',

  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  function isUpdate(){
    // Check if formData is equal to prevPlantType
    if (JSON.stringify(formData) === JSON.stringify({
      commonName:       prevPlantType.commonName || '' ,
      latinName:        prevPlantType.latinName || '',
      toxicCat:         prevPlantType.toxicCat || '',
      toxicDog:         prevPlantType.toxicDog || '',
      preferredLight:   prevPlantType.preferredLight || '',
    })) {
      alert("No changes made.");
      navigate("/plantTypes"); 
      return false;
    }
    return true
  }

  const handleSubmit = async (event) => {
    // Stop default form behavior which is to reload the page
    event.preventDefault();
    // Check if formData is equal to prevPlantType
    if (isUpdate()){
      try {
        const URL = import.meta.env.VITE_API_URL + "PlantTypes/" + id;
        const response = await axios.put(URL, formData);
        if (response.status !== 200) {
          alert("Error updating plant type!");
        } else {
          alert(response.data.message);
          // Redirect to PlantTypes page
          navigate("/PlantTypes");
        // Citation for this line of code
        // Forces the page to reload to display the new data
        // URL: https://stackoverflow.com/questions/56649094/how-to-reload-a-component-part-of-page-in-reactjs
        // Date Accessed: 5 August 2024
        // window.location.reload();
        }
      } catch (err) {
        console.log("Error updating plant type:", err);
      }
    }
  };

    // Citation for className="justify-content-md-center"
    // aligns row in center
    // URL: https://react-bootstrap.netlify.app/docs/layout/grid/
    // Date Accessed: 11 August 2024


  return (
    <div>
      <h2>Update Plant Type</h2>
      <br />


      <Form id="updatePlant" onSubmit={handleSubmit}>
        <Container >
            <Row>
                <Col>
                    <Form.Label htmlFor="commonName" >Common Name</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        name="commonName"
                        onChange={handleInputChange}
                        autoFocus
                        defaultValue={prevPlantType.commonName}
                    />
                </Col>
            </Row>

            <br /> 
            <Row>
                <Col>
                    <Form.Label htmlFor="latinName" >Latin Name (Optional)</Form.Label>
                    <Form.Control
                        type="text"
                        name="latinName"
                        onChange={handleInputChange}
                        defaultValue={prevPlantType.latinName}
                    />
                </Col>
            </Row>
            <br />
            <Row className="justify-content-md-center">
                <Col >
                    <Form.Label htmlFor="toxicCat">Toxic to Cats?</Form.Label>
                    <Form.Select
                        name="toxicCat"
                        onChange={handleInputChange}
                        defaultValue={prevPlantType.toxicCat}
                        >
                        <option value="1">Yes</option>
                        <option value="0">No</option>
                  </Form.Select>
                  </Col>
                <Col >
                    <Form.Label htmlFor="toxicCat">Toxic to Dogs?</Form.Label>
                    <Form.Select
                        name="toxicDog"
                        onChange={handleInputChange}
                        defaultValue={prevPlantType.toxicDog}
                        >
                        <option value="1">Yes</option>
                        <option value="0">No</option>
                  </Form.Select>
                  </Col>
            </Row>

            <br />
            <Row>

                <Col>
                    <Form.Label htmlFor="preferredLight">Preferred Light (Optional)</Form.Label>
                    <Form.Select
                        name="preferredLight"
                        onChange={handleInputChange}
                        defaultValue={prevPlantType.preferredLight}
                        >
                        <option value=""> </option>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </Form.Select>
                </Col>
            </Row>
            <br />
            <Row>
             
            <Col> 
              <Button variant="secondary" type="button" onClick={() => navigate("/plantTypes")} >Cancel</Button>{' '}
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

export default UpdatePlantType;

