// Code in this function adapted from the CS340 starter code.
// Date Accessed: 4 August 2024
// URL: https://github.com/osu-cs340-ecampus/react-starter-app

import { useState, useEffect } from "react";
import TableRow from "./PlantsTableRow";
import axios from "axios";

// bootstrap components
import Table from 'react-bootstrap/Table';


const PlantsTable = () => {
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

  return (
    <div>

      {/* if Plants table is empty, throw an error */}
      {Plants.length === 0 ? (
        <div>
          <p>There are currently no logged plant. Want to plant some?</p>
        </div>
        
      ) : (   
        // otherwise if Plants table has rows, display them nicely with bootstrap
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Plant ID</th>
              <th>Display Name</th>
              <th>Inside/Outside</th>
              <th>Current Light</th>
              <th>Plant Type</th>
              <th>Water Interval (Days)</th>
              <th>Fertilizer Interval (Days)</th>
              <th>Planted Date</th>
              <th colSpan={2}>Modify</th>
            </tr>
          </thead>

          <tbody>
            {/* use the map function to generate each row within the table */}
            {Plants.map((Plant) => (
              <TableRow key={Plant.plantID} Plant={Plant} fetchPlants={fetchPlants} />
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default PlantsTable;
