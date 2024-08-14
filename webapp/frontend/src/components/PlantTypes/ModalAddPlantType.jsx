
//import { AddPlantType } from "../components/PlantTypes/ModalAddPlantType";
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

function AddPlantType(){
    const [showInsertPopup, InsertPopup] = useState(false);

    const CloseButton = () => InsertPopup(false);
    const SaveButton = () => handleSubmit();
    
    const navigate = useNavigate();
      
    const [formData, setFormData] = useState({
        commonName: "",
        latinName: "",
        toxicCat: "",
        toxicDog: "",
        preferredLight: "",
    });
        
    const handleSubmit = async (e) => {

        // check for required field(s) otherwise not caught by modal (things that don't have a default in database but are required)
        if (!formData.commonName){
            alert("Common Name is required when creating Plant.");
        }
        
        // attempt to add to database if all required fields present
        else{
        // close the popup window
        InsertPopup(false);

        // Create a new PlantType object from the formData
        const newPlantType = {
            commonName: formData.commonName,
            latinName: formData.latinName,
            toxicCat: formData.toxicCat,
            toxicDog: formData.toxicDog,
            preferredLight: formData.preferredLight,
        };

        try {
        const URL = import.meta.env.VITE_API_URL + "PlantTypes";
        const response = await axios.post(URL, newPlantType);
        if (response.status === 201) {

            navigate("/plantTypes");

        } else {
            alert("Error creating PlantType");
        }
        } catch (error) {
        alert("Error creating PlantTypes");
        console.error("Error creating PlantTypes:", error);
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
            commonName: "",
            latinName: "",
            toxicCat: "",
            toxicDog: "",
            preferredLight: "",
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
        <Button variant="success" onClick={() => InsertPopup(true)}>New Plant Type</Button>

        <Modal
        size="lg"
        // aria-labelledby="contained-modal-title-vcenter"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showInsertPopup} onHide={CloseButton}>
        
          <Modal.Header closeButton>
            <Modal.Title>Add New Plant Type</Modal.Title>
          </Modal.Header>
  
        <Modal.Body>
            <Form id="addPlant" onSubmit={handleSubmit}>

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
                        />
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col>
                        <Form.Label htmlFor="toxicCat">Toxic to Cats?</Form.Label>
                        <Form.Select
                            name="toxicCat"
                            onChange={handleInputChange}
                        >                 
                            <option value="0">No</option>
                            <option value="1">Yes</option>
                       </Form.Select>
                    </Col>
                    <Col>
                        <Form.Label htmlFor="toxicCat">Toxic to Dogs?</Form.Label>
                        <Form.Select
                            name="toxicDog"
                            onChange={handleInputChange}
                        >
                            <option value="0">No</option>
                            <option value="1">Yes</option>
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
                        >
                            {/* <option value="">Select Light Level</option> */}
                            <option value=''> </option>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </Form.Select>
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

export default AddPlantType;
