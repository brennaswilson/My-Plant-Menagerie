
//import { AddSoilType } from "../components/SoilTypes/ModalAddSoilType";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// bootstrap components
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function AddSoilType(){
    const [showInsertPopup, InsertPopup] = useState(false);

    const CloseButton = () => InsertPopup(false);
    const SaveButton = () => handleSubmit();
        // InsertPopup(false);
    
    const navigate = useNavigate();
      
    const [formData, setFormData] = useState({
        soilType: "",
        soilDescription: "",
    });
        
    const handleSubmit = async (e) => {

        // check for required field(s) otherwise not caught by modal (things that don't have a default in database but are required)
        if (!formData.soilType){
            alert("Soil Name is required when creating a Soil Type.");
        }

        // attempt to add to database if all required fields present
        else{

        // close the popup window
        InsertPopup(false);

        // Create a new SoilType object from the formData
        const newSoilType = {
        soilType: formData.soilType,
        soilDescription: formData.soilDescription,
        };

        // TESTING - use this to ensure data is saved by form
        // alert(newSoilType.soilType + ', ' + newSoilType.soilDescription); 

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
        

        // Citation for this line of code
        // Forces the page to reload to display the new data
        // URL: https://stackoverflow.com/questions/56649094/how-to-reload-a-component-part-of-page-in-reactjs
        // Date Accessed: 5 August 2024
        window.location.reload();
        
    }
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
        console.log(name);
        console.log(value);
    };
      

    return (

        <>
        <Button variant="success" onClick={() => InsertPopup(true)}>New Soil Type</Button>

        <Modal
        size="lg"
        // aria-labelledby="contained-modal-title-vcenter"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showInsertPopup} onHide={CloseButton}>
        
          <Modal.Header closeButton>
            <Modal.Title>Add New Soil Type</Modal.Title>
          </Modal.Header>
  
        <Modal.Body>
            <Form id="addPlant" onSubmit={handleSubmit}>

            <Container >
                <Row>
                    <Col>
                        <Form.Label htmlFor="soilType" >Name</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            name="soilType"
                            onChange={handleInputChange}
                            autoFocus
                        />
                    </Col>

                <br /> 
                    <Col>
                        <Form.Label htmlFor="soilDescription">Description (Optional)</Form.Label>
                        <Form.Control
                            type="text"
                            as="textarea" 
                            rows={1}
                            name="soilDescription"
                            onChange={handleInputChange}
                        />
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

export default AddSoilType;
