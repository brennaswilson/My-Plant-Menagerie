// Code in this function adapted from the CS340 starter code.
// Date Accessed: 4 August 2024
// URL: https://github.com/osu-cs340-ecampus/react-starter-app

import { useState, useEffect } from "react";
import TableRow from "./PlantSoilsTableRow";
import axios from "axios";

// bootstrap components
import Table from 'react-bootstrap/Table';


const PlantSoilsTable = () => {
  const [PlantSoils, setPlantSoils] = useState([]);

  const fetchPlantSoils = async () => {
    try {
      const URL = import.meta.env.VITE_API_URL + "PlantSoils";
      const response = await axios.get(URL);
      setPlantSoils(response.data);
    } catch (error) {
      alert("Error fetching PlantSoils from the server.");
      console.error("Error fetching PlantSoils:", error);
    }
  };

  useEffect(() => {
    fetchPlantSoils();
  }, []);

  return (
    <div>

      {/* if PlantSoils table is empty, throw an error */}
      {PlantSoils.length === 0 ? (
        <div>
          <p>There are currently no logged plants w/ soils relationship. Any new plantings?</p>
        </div>
        
      ) : (   
        // otherwise if PlantSoils table has rows, display them nicely with bootstrap
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Plant Soil ID</th>
              <th>Plant</th>
              <th>Soil</th>
              <th colSpan={2}>Modify</th>
            </tr>
          </thead>

          <tbody>
            {/* use the map function to generate each row within the table */}
            {PlantSoils.map((PlantSoil) => (
              <TableRow key={PlantSoil.plantSoilID} PlantSoil={PlantSoil} fetchPlantSoils={fetchPlantSoils} />
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default PlantSoilsTable;
