// Code in this function heavily modified based on the CS340 starter code.
// Date Accessed: 4 August 2024
// URL: https://github.com/osu-cs340-ecampus/react-starter-app


import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// bootstrap components
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import {PlantSelectorOption, PlantSelectorDefaultOption} from "./PlantsDropdownSelectorPlantSoils";

import {SoilSelectorOption, SoilSelectorDefaultOption} from "./SoilDropdownSelectorPlantSoils"


function AddPlantSoil(){


    // pull in the information we need to dynamically populate the dropdown menus
    // pull directly from the Plants table, not on the WateringEvents table's 
    // plantIDs because some plants might be absent from WateringEvents
    const [Plants, setPlants] = useState([]);
    
    const fetchPlants = async () => {
        try {
          const URL = import.meta.env.VITE_API_URL + "Plants";
          const response = await axios.get(URL);
          setPlants(response.data);
        } catch (error) {
          alert("Error fetching Plants from the server.");
          console.error("Error fetching Plants:", error);
        }
      };
    
    useEffect(() => {
        fetchPlants();
    }, []);

    // pull in the information we need to dynamically populate the dropdown menus
    const [SoilTypes, setSoilTypes] = useState([]);

    const fetchSoilTypes = async () => {
        try {
            const URL = import.meta.env.VITE_API_URL + "SoilTypes";
            const response = await axios.get(URL);
            setSoilTypes(response.data);
        } catch (error) {
            alert("Error fetching Soil Types from the server.");
            console.error("Error fetching Soil Types:", error);
        }
        };
    
    useEffect(() => {
        fetchSoilTypes();
    }, []);
    
    
    // stuff to hide/show the add modal popup
    const [showInsertPopup, InsertPopup] = useState(false);

    const CloseButton = () => InsertPopup(false);
    const SaveButton = () => handleSubmit();
    
    const navigate = useNavigate();
      
    const [formData, setFormData] = useState({
        plantID: "",
        soilID: "",
    });
        

    // code to handle what happens when you click "save" on the popup window
    const handleSubmit = async (e) => {

        InsertPopup(false);

        // Create a new SoilType object from the formData
        const newPlantSoil = {
        plantID: formData.plantID,
        soilID: formData.soilID,
        };

        try {
        const URL = import.meta.env.VITE_API_URL + "PlantSoils";
        const response = await axios.post(URL, newPlantSoil);
        if (response.status === 201) {
            navigate("/PlantSoils");

        } else {
            alert("Error creating PlantSoil");
        }
        } catch (error) {
        alert("Error creating PlantSoil");
        console.error("Error creating PlantSoil:", error);
        }

        // after saving the data, reset the form fields for the next time its used
        resetFormFields();
        

        // Citation for this line of code
        // Forces the page to reload to display the new data
        // URL: https://stackoverflow.com/questions/56649094/how-to-reload-a-component-part-of-page-in-reactjs
        // Date Accessed: 5 August 2024
        window.location.reload();
        

    };
      
    const resetFormFields = () => {
        setFormData({
        plantID: "",
        soilID: "",
        });
    };
      
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
        ...prevData,
        [name]: value,

        }));
        console.log(name);
        console.log(value);
    };
      

    return (

        <>
        <Button variant="success" onClick={() => InsertPopup(true)}>New Plant Soil Relationship</Button>

        <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showInsertPopup} onHide={CloseButton}>
        
          <Modal.Header closeButton>
            <Modal.Title>Add Plant Soil Relationship</Modal.Title>
          </Modal.Header>
  
        <Modal.Body>
            <Form id="plantID" onSubmit={handleSubmit}>

            <Container >
                <Row>
                    <Col>

                    <Form.Label htmlFor="plantID">Plant</Form.Label>
                    <Form.Select
                        name="plantID"
                        onChange={handleInputChange}
                        required
                        autoFocus
                        >
                        {/* set a blank option since we need something to be selected to handleInputChange */}
                        <option value="">Select a plant</option>
                        {/* use the map function to generate all of the options */}
                        {/* displays the plant's name but sets the value equal to the plant's primary key */}
                        {Plants.map((Plant) => (
                            <PlantSelectorOption key={Plant.plantID} Plant={Plant} fetchPlants={fetchPlants} />
                        ))}


                    </Form.Select>


                    </Col>


                <br /> 
                    <Col>

                    <Form.Label htmlFor="soilID">Soil</Form.Label>
                    <Form.Select
                        name="soilID"
                        onChange={handleInputChange}
                        required
                        autoFocus
                        >
                        {/* set a blank optioxa since we need something to be selected to handleInputChange */}
                        <option value =""> Select a soil </option>
                        {/* use the map function to generate all of the options */}
                        {/* displays the plant's name but sets the value equal to the plant's primary key */}
                        {SoilTypes.map((SoilType) => (
                            <SoilSelectorOption key={SoilType.soilID} SoilType={SoilType} fetchSoilTypes={fetchSoilTypes} />
                        ))}


                    </Form.Select>


                    </Col>
                </Row>

          </Container>

            </Form>
        </Modal.Body>
  
          <Modal.Footer>
            {/* <Button variant="secondary" onClick={CloseButton}>Close</Button> */}
            <Button variant="primary" onClick={SaveButton}>Submit</Button>
          </Modal.Footer>

        </Modal>

        </>
    );
}

export default AddPlantSoil;
