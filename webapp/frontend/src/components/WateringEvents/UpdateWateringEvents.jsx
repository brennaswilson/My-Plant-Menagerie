// Code in this function adapted from the CS340 starter code.
// Date Accessed: 4 August 2024
// URL: https://github.com/osu-cs340-ecampus/react-starter-app

import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

import { PlantSelectorOption, PlantSelectorDefaultOption } from "./DropdownSelectorWateringEvents";

// bootstrap components
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const UpdateWateringEvent = () => {

    // pull in the information we need to dynamically populate the dropdown menus.
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
    }, []
  );


  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const prevWateringEvent = location.state.WateringEvent;

  // CITATION FOR DATE STUFF
  // used the following stackoverflow post to aid in figuring out how to format
  // the already existing watering date in a way that the web UI can display nicely by slicing
  // DATE ACCESSED: 10 AUG 2024
  // URL: https://stackoverflow.com/questions/63987168/input-type-date-set-a-default-value-to-date-today 
    const [formData, setFormData] = useState({
      wateringDate:           prevWateringEvent.wateringDate.slice(0,10) || '' ,
      plantID:                prevWateringEvent.plantID || '',
    });



  // alert("wateringDate:" + formData.wateringDate + " and plantID:" + formData.plantID);

  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  function isUpdate(){
    // Check if formData is equal to prevWateringEvent
    if (JSON.stringify(formData) === JSON.stringify({
      wateringDate:         prevWateringEvent.wateringDate.slice(0,10) || '',
      plantID:              prevWateringEvent.plantID || '',
    })) {
      alert("No changes made.");
      return false;
    }
    return true 
  }

  const handleSubmit = async (event) => {
    // Stop default form behavior which is to reload the page
    event.preventDefault();
    // Check if formData is equal to prevWateringEvent
    if (isUpdate()){
      try {
        const URL = import.meta.env.VITE_API_URL + "WateringEvents/" + id;
        const response = await axios.put(URL, formData);
        if (response.status !== 200) {
          alert("Error updating watering event!");
        } else {
          alert(response.data.message);
          // Redirect to WateringEvents page
          navigate("/WateringEvents");

        // Citation for this line of code
        // Forces the page to reload to display the new data
        // URL: https://stackoverflow.com/questions/56649094/how-to-reload-a-component-part-of-page-in-reactjs
        // Date Accessed: 5 August 2024
        // window.location.reload();
        }
      } catch (err) {
        console.log("Error updating watering event:", err);
      }
    }
  };



    // CITATION FOR FOLLOWING FUNCTION
    // adapted based on some code from the following stackoverflow. this allows the dropdown to always 
    // default to match the entry of whatever corresponding edit button was clicked  
    // DATE ACCESSED: 10 AUG 2024
    // URL: https://stackoverflow.com/questions/9206914/how-to-filter-multidimensional-javascript-array

    function nonDefaults(Plants, IDToMatch){
      let dontSelectMe = [];
      let SelectDefault = [];
  
      for (var i = 0; i < Plants.length ; i++){
        let temp = Plants[i];

        // test that the entire Plant object is present
        // console.log('temp: ' + JSON.stringify(temp));

        
        // CITATION URL
        // this post helped figure out how to pull the primary key out from the double array
        // DATE ACCESSED: 10 AUG 2024
        // URL: https://stackoverflow.com/questions/56844536/how-to-get-javascript-objects-value-with-key
        let plantKey = temp["plantID"];



        // current item matches that which edit was clicked on, so it should be made the default option on the form
        if (plantKey === IDToMatch){
          SelectDefault.push(temp);
        } else {
          dontSelectMe.push(temp);
        }
          
      }
      // console.log('match is: ' + JSON.stringify(SelectDefault));
      // console.log('non-matches are: ' + JSON.stringify(dontSelectMe));
      return [SelectDefault, dontSelectMe];
    }

    const processDropdowns = nonDefaults(Plants, prevWateringEvent.plantID);
    const selectorDefault = processDropdowns[0];
    const selectorNonDefaults = processDropdowns[1];

  return (
    
    <div>
      <h2>Update Watering Event</h2>
      <br />

      <Form onSubmit={handleSubmit}>

          <Row >
              <Col xs={5}>
                  <Form.Label  htmlfor="wateringDate"> Date </Form.Label>
                  <Form.Control
                      required
                      type="date"
                      name="wateringDate"
                      defaultValue={formData.wateringDate}
                      onChange={handleInputChange}
                  />
              </Col>

              <Col >
                  <Form.Label htmlFor="plantID">Watered Plant</Form.Label>

                  <Form.Select
                      name="plantID"
                      onChange={handleInputChange}
                      required
                      >
                      {/* use the map function to generate all of the options */}
                      {/* displays the plant's name but sets the value equal to the plant's primary key */}

                      {/* default to displaying the plant that is involved in the edit */}
                      {selectorDefault.map((Plant) => (
                          <PlantSelectorDefaultOption key={Plant.plantID} Plant={Plant} fetchPlants={fetchPlants} />
                      ))}
                      
                      {/* then display all other options */}
                      {selectorNonDefaults.map((Plant) => (
                          <PlantSelectorOption key={Plant.plantID} Plant={Plant} fetchPlants={fetchPlants} />
                      ))}

                      
                      {/* {Plants.map((Plant) => (
                          <PlantSelectorOption key={Plant.plantID} Plant={Plant} fetchPlants={fetchPlants} />
                      ))} */}


                  </Form.Select>
              </Col>
          </Row>
          <br />
          <Container >
          <Row>
            <Col> 
              <Button variant="secondary" type="button" onClick={() => navigate("/WateringEvents")} >Cancel</Button>{' '}
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

export default UpdateWateringEvent;

