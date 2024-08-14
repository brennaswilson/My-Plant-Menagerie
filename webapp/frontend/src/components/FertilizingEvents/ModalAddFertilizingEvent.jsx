// Code in this function heavily modified based on the CS340 starter code.
// Date Accessed: 4 August 2024
// URL: https://github.com/osu-cs340-ecampus/react-starter-app

// Code for the modal also modifies the example code on the react-bootstrap documentation.
// Date Accessed: 4 August 2024
// URL: https://react-bootstrap.netlify.app/docs/components/modal


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

// import PlantSelectorOption from "./DropdownSelectorFertilizingEvents";
import { PlantSelectorOption } from "./DropdownSelectorFertilizingEvents";
import { PlantSelectorDefaultOption } from "./DropdownSelectorFertilizingEvents";

function AddFertilizingEvent(){


    // pull in the information we need to dynamically populate the dropdown menus
    // pull directly from the Plants table, not on the FertilizingEvents table's 
    // plantIDs because some plants might be absent from FertilizingEvents
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




    // stuff to hide/show the add modal popup
    const [showInsertPopup, InsertPopup] = useState(false);

    const CloseButton = () => InsertPopup(false);
    const SaveButton = () => handleSubmit();
    
    const navigate = useNavigate();
      

    
    // CITATION FOR DATE STUFF
    // DATE ACCESSED: 10 AUG 2024
    // used the following site to get some ideas on how to set the date correctly to today's date
    // URL: https://stackoverflow.com/questions/63987168/input-type-date-set-a-default-value-to-date-today
    const todayDate = new Date().toISOString().slice(0,10);
    
    const [formData, setFormData] = useState({
        fertilizingDate: todayDate,
        plantID: "",
    });
        

    // code to handle what happens when you click "save" on the popup window
    const handleSubmit = async (e) => {

        InsertPopup(false);

        // Create a new SoilType object from the formData
        const newFertilizingEvent = {
        fertilizingDate: formData.fertilizingDate,
        plantID: formData.plantID,
        };

        try {
        const URL = import.meta.env.VITE_API_URL + "FertilizingEvents";
        const response = await axios.post(URL, newFertilizingEvent);
        if (response.status === 201) {
            navigate("/FertilizingEvents");

        } else {
            alert("Error creating FertilizingEvent");
        }
        } catch (error) {
        alert("Error creating FertilizingEvent");
        console.error("Error creating FertilizingEvent:", error);
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
        fertilizingDate: "",
        plantID: "",
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
    // const todayDate = new Date().toLocaleDateString("en-US");
    // todayDate = 8-8-2024

    // alert("todayDate:" +todayDate + "plantID:" + formData.plantID + " date:" + formData.fertilizingDate);


    return (

        <>
        <Button variant="success" onClick={() => InsertPopup(true)}>New Fertilizing Event</Button>

        <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showInsertPopup} onHide={CloseButton}>
        
          <Modal.Header closeButton>
            <Modal.Title>Add New Fertilizing Event</Modal.Title>
          </Modal.Header>
  
        <Modal.Body>
            <Form id="addPlant" onSubmit={handleSubmit}>

            <Container >
                <Row>
                    <Col xs={3}>
                        <Form.Label htmlFor="fertilizingDate" >Fertilizing Date</Form.Label>
                        <Form.Control
                            required
                            type="date"
                            name="fertilizingDate"
                            onChange={handleInputChange}
                            defaultValue={formData.fertilizingDate}
                        />
                    </Col>

                    <Col>

                    <Form.Label htmlFor="plantID">Fertilized Plant</Form.Label>
                    <Form.Select
                        name="plantID"
                        defaultValue={formData.plantID}
                        onChange={handleInputChange}
                        required
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

export default AddFertilizingEvent;
