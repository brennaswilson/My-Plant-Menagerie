// Code in this function adapted from the CS340 starter code.
// Date Accessed: 4 August 2024
// URL: https://github.com/osu-cs340-ecampus/react-starter-app

import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

import { PlantTypeSelectorOption, PlantTypeSelectorDefaultOption } from "./DropdownSelectorPlants";

// bootstrap components
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const UpdatePlant = () => {

    // pull in the information we need to dynamically populate the dropdown menus.
    // pull directly from the Plants table, not on the WateringEvents table's 
    // plantTypeIDs because some plants might be absent from WateringEvents
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
      }, []
    );
  

  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const prevPlant = location.state.Plant;

  const [formData, setFormData] = useState({
    displayName:                prevPlant.displayName || '' ,
    isInside:                   prevPlant.isInside || '',
    currentLight:               prevPlant.currentLight || '',
    plantTypeID:                prevPlant.plantTypeID || '',
    waterInterval:              prevPlant.waterInterval || '',
    fertilizerInterval:         prevPlant.fertilizerInterval || '',
    plantedDate:                prevPlant.plantedDate.slice(0,10) || '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
      
    }));
  };

  function isUpdate(){
    // Check if formData is equal to prevPlant
    if (JSON.stringify(formData) === JSON.stringify({
        displayName:                prevPlant.displayName || '' ,
        isInside:                   prevPlant.isInside || '',
        currentLight:               prevPlant.currentLight || '',
        plantTypeID:                prevPlant.plantTypeID || '',
        waterInterval:              prevPlant.waterInterval || '',
        fertilizerInterval:         prevPlant.fertilizerInterval || '',
        plantedDate:                prevPlant.plantedDate || '',
    })) {
      alert("No changes made.");
      return false;
    }
    return true
  }

  const handleSubmit = async (event) => {
    // Stop default form behavior which is to reload the page
    event.preventDefault();
    // Check if formData is equal to prevPlant
    if (isUpdate()){
      try {
        const URL = import.meta.env.VITE_API_URL + "Plants/" + id;
        const response = await axios.put(URL, formData);
        if (response.status !== 200) {
          alert("Error updating plant!");
        } else {
          alert(response.data.message);
          // Redirect to Plants page
          navigate("/Plants");
        // Citation for this line of code
        // Forces the page to reload to display the new data
        // URL: https://stackoverflow.com/questions/56649094/how-to-reload-a-component-part-of-page-in-reactjs
        // Date Accessed: 5 August 2024
        // window.location.reload();
        }
      } catch (err) {
        console.log("Error updating plant:", err);
      }
    }
  };

      // CITATION FOR FOLLOWING FUNCTION
    // adapted based on some code from the following stackoverflow. this allows the dropdown to always 
    // default to match the entry of whatever corresponding edit button was clicked  
    // DATE ACCESSED: 10 AUG 2024
    // URL: https://stackoverflow.com/questions/9206914/how-to-filter-multidimensional-javascript-array

    function nonDefaults(PlantTypes, IDToMatch){
      let dontSelectMe = [];
      let SelectDefault = [];
  
      for (var i = 0; i < PlantTypes.length ; i++){
        let temp = PlantTypes[i];

        // test that the entire Plant object is present
        // console.log('temp: ' + JSON.stringify(temp));

        
        // CITATION URL
        // this post helped figure out how to pull the primary key out from the double array
        // DATE ACCESSED: 10 AUG 2024
        // URL: https://stackoverflow.com/questions/56844536/how-to-get-javascript-objects-value-with-key
        let plantTypeKey = temp["plantTypeID"];



        // current item matches that which edit was clicked on, so it should be made the default option on the form
        if (plantTypeKey === IDToMatch){
          SelectDefault.push(temp);
        } else {
          dontSelectMe.push(temp);
        }
          
      }
      // console.log('match is: ' + JSON.stringify(SelectDefault));
      // console.log('non-matches are: ' + JSON.stringify(dontSelectMe));
      return [SelectDefault, dontSelectMe];
    }

    const processDropdowns = nonDefaults(PlantTypes, prevPlant.plantTypeID);
    const selectorDefault = processDropdowns[0];
    const selectorNonDefaults = processDropdowns[1];


  return (

    <div>
      <h2>Update Plant</h2>
      <br />

      <Form id="updatePlants" onSubmit={handleSubmit}>
      <Container fluid>
        <Row>
          <Col xl={1}></Col>
        </Row>
          <Row>
              <Col>
                  <Form.Label htmlFor="displayName">Display Name</Form.Label>
                  <Form.Control
                      required
                      type="text"
                      name="displayName"
                      onChange={handleInputChange}
                      defaultValue={prevPlant.displayName}
                      autoFocus
                  />
              </Col>
          </Row>

          <br/>

          <Row>
              <Col>
                  <Form.Label htmlFor="isInside" >Inside/Outside</Form.Label>
                  <Form.Select
                      required
                      name="isInside"
                      onChange={handleInputChange}
                      defaultValue={prevPlant.isInside}
                      
                  >
                      <option value="1">Inside</option>
                      <option value="0">Outside</option>
                  </Form.Select>
              </Col>

          <br /> 
              
              <Col >
                  <Form.Label htmlFor="plantTypeID">Plant Type</Form.Label>

                  <Form.Select
                      name="plantTypeID"
                      onChange={handleInputChange}
                      
                      >
                      {/* use the map function to generate all of the options */}
                      {/* displays the plant's name but sets the value equal to the plant's primary key */}

                      {/* default to displaying the plant that is involved in the edit */}
                      {selectorDefault.map((PlantType) => (
                          <PlantTypeSelectorDefaultOption key={PlantType.plantTypeID} PlantType={PlantType} fetchPlantTypes={fetchPlantTypes} />
                      ))}


                      {/* CITATION FOR CONDITIONAL RENDERING IN RETURN
                      Used the following post to aid in figuring out how to use a conditional within the return.
                      DATE ACCESSED: 11 AUG 2024
                      URL: https://stackoverflow.com/questions/40477245/is-it-possible-to-use-if-else-statement-in-react-render-function
                      */}
                      
                      {/* If PlantType is empty to begin with, upon edit, defaults to show a blank selector */}
                      {selectorDefault.length === 0 &&
                        <option selected value=''> </option>
                      }
                      
                      {/* display all other options */}
                      {selectorNonDefaults.map((PlantType) => (
                          <PlantTypeSelectorOption key={PlantType.plantTypeID} PlantType={PlantType} fetchPlantTypes={fetchPlantTypes} />
                      ))}

                      {/* if Plant had an existing PlantType displays an option to null it */}
                      {selectorDefault.length > 0 &&
                        <option value=''></option>
                      }


                      
                      {/* {Plants.map((Plant) => (
                          <PlantSelectorOption key={Plant.plantTypeID} Plant={Plant} fetchPlants={fetchPlants} />
                      ))} */}


                  </Form.Select>
              </Col>
          </Row>

          <br />
          <Row>
              
          {/* </Row>
          <br /> 

          <Row> */}
              <Col>
                  <Form.Label htmlFor="currentLight" >Current Light</Form.Label>
                  <Form.Select
                      name="currentLight"
                      onChange={handleInputChange}
                      defaultValue={prevPlant.currentLight}
                      
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </Form.Select>
              </Col>
          </Row>

          <br /> 
          <Row>
              <Col>
                  <Form.Label htmlFor="waterInterval">Water Interval (Days)</Form.Label>
                  <Form.Control
                      type="number"
                      name="waterInterval"
                      onChange={handleInputChange}
                      defaultValue={prevPlant.waterInterval}
                      
                  />
              </Col>

              <Col>
                  <Form.Label htmlFor="fertilizerInterval">Fertilizer Interval (Days)</Form.Label>
                  <Form.Control
                      type="number"
                      name="fertilizerInterval"
                      onChange={handleInputChange}
                      defaultValue={prevPlant.fertilizerInterval}
                      
                  />
              </Col>

            
          </Row>

          <br /> 
          <Row>
          <Col xs={5}>
                  <Form.Label>Date Planted</Form.Label>
                  <Form.Control
                      type="date"
                      name="plantedDate"
                      defaultValue={formData.plantedDate}
                      onChange={handleInputChange}
                      
                  />
              </Col>
          </Row>

          <br />

          <Row>
            <Col> 
              <Button variant="secondary" type="button" onClick={() => navigate("/Plants")} >Cancel</Button>{' '}
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

export default UpdatePlant;

