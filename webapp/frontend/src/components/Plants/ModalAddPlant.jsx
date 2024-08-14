``
//import { AddPlant } from "../components/Plants/ModalAddPlant";
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

import {PlantTypeSelectorOption} from "./DropdownSelectorPlants";

function AddPlant(){

    // pull in the information we need to dynamically populate the dropdown menus
    // pull directly from the Plants table, not on the WateringEvents table's 
    // plantIDs because some plants might be absent from WateringEvents
    const [PlantTypes, setPlantTypes] = useState([]);

    const fetchPlantTypes = async () => {
        try {
            const URL = import.meta.env.VITE_API_URL + "PlantTypes";
            const response = await axios.get(URL);
            setPlantTypes(response.data);
        } catch (error) {
            alert("Error fetching Plant Types from the server.");
            console.error("Error fetching Plant Types:", error);
        }
        };
    
    useEffect(() => {
        fetchPlantTypes();
    }, []);
    

    const [showInsertPopup, InsertPopup] = useState(false);

    const CloseButton = () => InsertPopup(false);
    const SaveButton = () => handleSubmit();
        // InsertPopup(false);
    
    const navigate = useNavigate();
    

    // CITATION FOR DATE STUFF
    // DATE ACCESSED: 10 AUG 2024
    // used the following site to get some ideas on how to set the date correctly to today's date
    // URL: https://stackoverflow.com/questions/63987168/input-type-date-set-a-default-value-to-date-today
    const todayDate = new Date().toISOString().slice(0,10);

    const [formData, setFormData] = useState({
        displayName: "",
        isInside:"",
        currentLight:"",
        plantTypeID:"",
        waterInterval:"7",
        fertilizerInterval:"14",
        plantedDate:todayDate,
    });

        
    const handleSubmit = async (e) => {

        // check for required field(s) otherwise not caught by modal (things that don't have a default in database but are required)
        if (!formData.displayName){
            alert("Display Name is required when creating Plant.");
        }

        // attempt to add to database if all required fields present
        else{

        // close the popup window
        InsertPopup(false);

        // Create a new Plant object from the formData
        const newPlant = {
        displayName: formData.displayName,
        isInside: formData.isInside,
        currentLight: formData.currentLight,
        plantTypeID: formData.plantTypeID ,
        waterInterval: formData.waterInterval,
        fertilizerInterval: formData.fertilizerInterval,
        plantedDate: formData.plantedDate,
        };


        try {
        const URL = import.meta.env.VITE_API_URL + "Plants";
        const response = await axios.post(URL, newPlant);
        if (response.status === 201) {
            navigate("/Plants");

        } else {
            alert("Error creating Plant");
        }
        } catch (error) {
        alert("Error creating Plants");
        console.error("Error creating Plants:", error);
        }
        // Reset the form fields
        resetFormFields();        

        // Citation for this line of code
        // Forces the page to reload to display the new data
        // URL: https://stackoverflow.com/questions/56649094/how-to-reload-a-component-part-of-page-in-reactjs
        // Date Accessed: 5 August 2024
        window.location.reload();
        
    }
    };
      
    const resetFormFields = () => {
        setFormData({
        displayName: "",
        isInside:"",
        currentLight:"",
        plantTypeID:"",
        waterInterval:"",
        fertilizerInterval:"",
        plantedDate:"",
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

    // CITATION FOR TODAY'S DATE STUFF
    // URL: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString
    // DATE ACCESSED: 8 AUG 2024


      
    return (

        <>
        <Button variant="success" onClick={() => InsertPopup(true)}>New Plant</Button>

        <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showInsertPopup} onHide={CloseButton}>
    
        <Modal.Header closeButton>
            <Modal.Title>Add New Plant</Modal.Title>
        </Modal.Header>
  
        <Modal.Body>
            <Form id="addPlant" onSubmit={handleSubmit}>

            <Container >
            <Row>
              <Col >
                  <Form.Label htmlFor="displayName" >Display Name</Form.Label>
                  <Form.Control
                      required
                      type="text"
                      name="displayName"
                      onChange={handleInputChange}
                      autoFocus
                  />
              </Col>
            </Row>
            <br />

            <Row >
            <Col >
                    <Form.Label >Inside/Outside</Form.Label>
                    <Form.Select
                        name="isInside"
                        onChange={handleInputChange}
                        
                    >
                        <option value="1" >Inside</option>
                        <option value="0" selected>Outside</option>
                    </Form.Select>
                </Col>
            
                <Col >
                    <Form.Label htmlFor="plantTypeID">Plant Type (Optional)</Form.Label>
                        <Form.Select
                            name="plantTypeID"
                            onChange={handleInputChange}
                            required
                            >
                            {/* set a blank option since we need something to be selected to handleInputChange */}
                            <option></option>
                            {/* use the map function to generate all of the options */}
                            {/* displays the plant's name but sets the value equal to the plant's primary key */}
                            {PlantTypes.map((PlantType) => (
                                <PlantTypeSelectorOption key={PlantType.plantTypeID} PlantType={PlantType} fetchPlantTypes={fetchPlantTypes} />
                            ))}
                    </Form.Select>
                </Col>
            </Row>

            <br /> 
            <Row>

                <Col >
                    <Form.Label >Current Light (Optional)</Form.Label>
                    <Form.Select
                        name="currentLight"
                        onChange={handleInputChange}
                        
                    >
                        <option value="NULL" selected></option>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </Form.Select>
                </Col>
            </Row>


            <br /> 
            <Row>
                <Col >
                    <Form.Label >Water Interval (Days) (Optional)</Form.Label>
                    <Form.Control
                        type="number"
                        name="waterInterval"
                        onChange={handleInputChange}
                        defaultValue={7}
                        
                    />
                </Col>

                <Col >
                    <Form.Label >Fertilizer Interval (Days) (Optional)</Form.Label>
                    <Form.Control
                        type="number"
                        name="fertilizerInterval"
                        onChange={handleInputChange}
                        defaultValue={14}
                        
                    />
                </Col>
                
            </Row>
            <br/>
            <Row>
            <Col xs={4}>
                    <Form.Label >Date Planted (Optional)</Form.Label>
                    <Form.Control
                        type="date"
                        name="plantedDate"
                        onChange={handleInputChange}
                        defaultValue={formData.plantedDate}
                        
                    />
                </Col>
            </Row>

          </Container>

            </Form>
        </Modal.Body>
  
        <Modal.Footer>
            <Button variant="primary" onClick={SaveButton}>Submit</Button>
        </Modal.Footer>

        </Modal>

        </>
    );
}

export default AddPlant;
