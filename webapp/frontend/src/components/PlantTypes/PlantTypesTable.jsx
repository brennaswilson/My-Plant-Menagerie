// Code in this function adapted from the CS340 starter code.
// Date Accessed: 4 August 2024
// URL: https://github.com/osu-cs340-ecampus/react-starter-app

import { useState, useEffect } from "react";
import TableRow from "./PlantTypesTableRow";
import axios from "axios";

// bootstrap components
import Table from 'react-bootstrap/Table';


const PlantTypesTable = () => {
  const [PlantTypes, setPlantTypes] = useState([]);

  const fetchPlantTypes = async () => {
    try {
      const URL = import.meta.env.VITE_API_URL + "PlantTypes";
      const response = await axios.get(URL);
      setPlantTypes(response.data);
    } catch (error) {
      alert("Error fetching PlantTypes from the server.");
      console.error("Error fetching PlantTypes:", error);
    }
  };

  useEffect(() => {
    fetchPlantTypes();
  }, []);

  return (
    <div>

      {/* if PlantTypes table is empty, throw an error */}
      {PlantTypes.length === 0 ? (
        <div>
          <p>There are currently no logged fertilizing events. Are any of your plants hungry?</p>
        </div>
        
      ) : (   
        // otherwise if PlantTypes table has rows, display them nicely with bootstrap
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Plant Type ID</th>
              <th>Common Name</th>
              <th>Latin Name</th>
              <th>Toxic to Cats</th>
              <th>Toxic to Dogs</th>
              <th>Preferred Light</th>
              <th colSpan={2}>Modify</th>
            </tr>
          </thead>

          <tbody>
            {/* use the map function to generate each row within the table */}
            {PlantTypes.map((PlantType) => (
              <TableRow key={PlantType.plantTypeID} PlantType={PlantType} fetchPlantTypes={fetchPlantTypes} />
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default PlantTypesTable;
